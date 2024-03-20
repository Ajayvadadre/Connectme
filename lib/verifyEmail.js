import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

const verifyEmail = async(id) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      type: "login",
      user: "jaiswar2203@gmail.com",
      pass: "Jstar30don",
    },
    from: "jaiswar2203@gmail.com",
  });

  const url = `http://localhost:4000/user/verify/${verificaitonToekn}`;
  
  const mailOption ={
    from:{
      name:'ConnectMe',
      address:'jaiswar2203@gmail.com'
    },
    to: email,
    subject: "Verify Account",
    html: `Click <a href='${url}'>here</a> to confirm your email`,
  } 
  await transporter.sendMail(mailOption,(err,data)=>{
        if(err){console.log(err)}
        else{console.log("Email send succesfully");}
  });
};

export default verifyEmail;
