import express from "express";
import {
  placeOrder,
  allOrders,
  userOrders,
  updateStatus,
  orderStatus,
  removeOrder,
  placeCustomRequest,
  listCustomRequests,
  removeCustomRequest,
} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";

const orderRouter = express.Router();

// Admin Routes
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);
orderRouter.get("/custom-list", adminAuth, listCustomRequests);
orderRouter.post("/userorders", authUser, userOrders);
orderRouter.post("/remove", adminAuth, removeOrder);
orderRouter.post("/custom-remove", adminAuth, removeCustomRequest);

// User/Guest Routes
orderRouter.post("/place", placeOrder);
orderRouter.post("/custom-request", placeCustomRequest);

// Naya Track Route (Yeh Guest aur User dono ke liye hai)
orderRouter.post("/track", orderStatus);

export default orderRouter;
