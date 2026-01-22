import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} }, // User ki cart history save karne ke liye
  },
  { minimize: false },
); // Empty object ko save karne ki ijazat deta hai

// Agar model pehle se bana hai to wo use karein, warna naya banayein
const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
