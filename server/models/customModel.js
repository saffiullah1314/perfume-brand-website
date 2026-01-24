import mongoose from "mongoose";

const customSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  targetBrand: { type: String },
  specialRequest: { type: String },
  bottleSize: { type: String },
  intensity: { type: String },
  date: { type: Number, required: true },
});

const customModel =
  mongoose.models.custom || mongoose.model("custom", customSchema);
export default customModel;
