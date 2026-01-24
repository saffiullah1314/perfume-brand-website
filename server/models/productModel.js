import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  inspiredBy: { type: String, required: true }, // Added
  shortDescription: { type: String, required: true }, // Added
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  rating: { type: Number, default: 5 }, // Added
  category: { type: String, required: true }, // Amber Woody, Floral etc
  subCategory: { type: String, required: true }, // Men, Women etc (used as Gender in your UI)
  size: { type: String, required: true }, // Added (e.g., 50ml)
  image: { type: Array, required: true },
  // Olfactory Notes structure
  notes: {
    top: { type: Array, default: [] },
    heart: { type: Array, default: [] },
    base: { type: Array, default: [] },
  },
  bestSeller: { type: Boolean, default: false },
  date: { type: Number, required: true },
});

const productModel =
  mongoose.models.product || mongoose.model("product", productSchema);
export default productModel;
