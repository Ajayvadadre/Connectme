import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    
    if (client) {
      console.log("Connected to MongoDB database successfully!");
    } else {
      console.log("Failed to connect to MongoDB database.");
    }

    if (req.method === "POST") {
      const { email } = req.body;
      const db = client.db();
      const user = db.collection("userdatas");

      const existingUser = await user.findOne({ email });

      if (!existingUser) {
        return res.status(404).json({
          message: "No User Found in there",
        });
      } else {
        return res
          .status(201)
          .json({ message: "SignUp SuccessFull", existingUser });
      }
    }

    client.close();
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
