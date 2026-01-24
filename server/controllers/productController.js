import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// Function to add product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      inspiredBy,
      shortDescription,
      description,
      price,
      discount,
      rating,
      category,
      subCategory,
      size,
      bestSeller,
      notes,
    } = req.body;

    // Image upload logic (Same as yours)
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];
    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined,
    );

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      }),
    );

    const productData = {
      name,
      inspiredBy,
      shortDescription,
      description,
      price: Number(price),
      discount: Number(discount),
      rating: Number(rating),
      category,
      subCategory,
      size,
      bestSeller: bestSeller === "true" ? true : false,
      image: imagesUrl,
      // Frontend se notes JSON.stringify ho kar aayenge
      notes: JSON.parse(notes),
      date: Date.now(),
    };

    const product = new productModel(productData);
    await product.save();
    res.json({ success: true, message: "Masterpiece Added Successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Function to list products
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
const updateProduct = async (req, res) => {
  try {
    const {
      id,
      name,
      inspiredBy,
      shortDescription,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestSeller,
      discount,
      notes,
      rating,
      size,
    } = req.body;

    const updateData = {
      name,
      inspiredBy,
      shortDescription,
      description,
      category,
      subCategory,
      bestSeller: bestSeller === "true",
      price: Number(price),
      discount: Number(discount),
      rating: Number(rating),
      size,
      notes: JSON.parse(notes), // Notes object structure
      date: Date.now(),
    };

    // Images handling (Agar admin nayi images upload kare)
    const image1 = req.files?.image1 && req.files.image1[0];
    const image2 = req.files?.image2 && req.files.image2[0];
    const image3 = req.files?.image3 && req.files.image3[0];
    const image4 = req.files?.image4 && req.files.image4[0];
    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined,
    );

    if (images.length > 0) {
      let imagesUrl = await Promise.all(
        images.map(async (item) => {
          let result = await cloudinary.uploader.upload(item.path, {
            resource_type: "image",
          });
          return result.secure_url;
        }),
      );
      updateData.image = imagesUrl;
    }

    await productModel.findByIdAndUpdate(id, updateData);
    res.json({ success: true, message: "Masterpiece Updated Successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Export mein updateProduct add karein
export { addProduct, listProducts, removeProduct, updateProduct };
