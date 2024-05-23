import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const URL = process.env.DB_URI;

// mongoose.connect(URL);

const connect = async() => {
    try {
        await mongoose.connect(URL);
        console.log("connection");
    }
    catch(error) {
      console.log("failed");
      process.exit(0);
    }
}

export default connect;