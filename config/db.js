import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Db is Connected");
  } catch (error) {
    console.log(error);
  }
};

export default dbConnect;
