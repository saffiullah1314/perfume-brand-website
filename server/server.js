import express from "express";
import cors from "cors";
import "dotenv/config"; // Sab se pehle yeh hona chahiye
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import productRouter from "./routes/productRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

const app = express();
const port = process.env.PORT || 4000;

// Database aur Cloudinary ko connect karein
connectDB();
connectCloudinary(); // Yeh ab load ho jaye ga kyunke dotenv upar hai

app.use(express.json());
app.use(cors());

app.use("/api/product", productRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => console.log(`Server started on port ${port}`));
}
export default app;
