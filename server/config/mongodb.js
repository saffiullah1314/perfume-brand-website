import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("Database Connected Successfully");
  });

  // Humne yahan dbName option add kiya hai
  await mongoose.connect(`${process.env.MONGODB_URI}`, {
    dbName: "roohra-perfumes",
  });
};

export default connectDB;
