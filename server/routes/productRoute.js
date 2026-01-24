import express from "express";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";
import {
  addProduct,
  listProducts,
  removeProduct,
  updateProduct,
} from "../controllers/productController.js";

const productRouter = express.Router();

// Route for adding product (with images)
productRouter.post(
  "/add",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct,
);

productRouter.get("/list", listProducts);
productRouter.post("/remove", adminAuth, removeProduct);
productRouter.post(
  "/update",
  adminAuth,
  upload.fields([
    { name: "image1" },
    { name: "image2" },
    { name: "image3" },
    { name: "image4" },
  ]),
  updateProduct,
);

export default productRouter;
