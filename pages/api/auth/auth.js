import { MongoClient } from "mongodb";

import jwt from 'jsonwebtoken';

const postmark=require("postmark")

const emailSend= new postmark.ServerClient("d1f350b1-dc6a-4842-b191-3b02dd68f054")

const dev_server="http://localhost:3000"
const prod_server="https://api.connectme.co.in"

export default async function handler(req, res) {
  
  if (req.method === "POST") {

    const { email, name, username } = req.body;
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();
    const user = db.collection("userdatas");

    const newUsername=username.toLowerCase()

    const existingUser = await user.findOne({ email });
    const existingUserName = await user.findOne({ username: newUsername });

    if (existingUser || existingUserName) {
      return res.status(404).json({
        message: `User Already Exist ${
          existingUser ? "with this gmail" : "with this username"
        } `,
      });
    }

    try {
      const User = await user.insertOne({ email, name, username: newUsername,isVerified:false });
      const {insertedId}=User
      const createUserData=await user.findOne({email})
      const verificaitonToekn = jwt.sign({ ID: insertedId }, "verify",{});

      const url = `${prod_server}/user/verify/${verificaitonToekn}`;

      

      // email sending through third party api
      
      emailSend.sendEmailWithTemplate({
        From:"info@connectme.co.in",
        To:email,
        TemplateModel:{
          "name": name,
          "invite_sender_name":"ConnectMe",
          "action_url": url
        },
        TemplateId:27491778
      }).then(()=>{
        res
          .status(201)
          .json({
            message: "SignUp SuccessFull",
            existingUser: { email, name, username: newUsername, _id: insertedId,createUserData },
          });
        }).catch((err)=>{
          
          res  
            .status(501)
            .json({
              message: "SignUp Failed",
              err
            });
      })

    } catch (error) {
      console.log({error})
      res.status(501).json({ message: "Try Again",error });
    }

    client.close();
  }
}
