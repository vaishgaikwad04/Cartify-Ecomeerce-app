//This creates a connection between app and MongoDB.
import mongoose from "mongoose";

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    console.log("connected to DB sucessfully");
  } catch (error) {
    console.log(error.message);
  }
};

export default connectToDb;
