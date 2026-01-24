import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import mongoose from "mongoose";

// 1. Placing Order (Same as yours, fixed GUEST userId)
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const orderData = {
      userId: userId || "GUEST", // Guest support barqarar hai
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    if (userId && userId !== "GUEST") {
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
    }
    res.json({
      success: true,
      message: "Order Placed Successfully",
      orderId: newOrder._id,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// --- NAYA FUNCTION: Specific Order Status for Tracking ---
const orderStatus = async (req, res) => {
  try {
    const { orderId } = req.body;

    // Check karein ke ID valid hai ya nahi pehle
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.json({
        success: false,
        message: "Invalid Order ID format. Please check your ID again.",
      });
    }

    const order = await orderModel.findById(orderId);

    if (!order) {
      return res.json({
        success: false,
        message: "Order not found in our database.",
      });
    }

    res.json({ success: true, order });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Internal Server Error" });
  }
};

// Baaki functions (allOrders, userOrders, updateStatus) wahi rahenge jo aapne bheje
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// orderController.js mein add karein
const removeOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    await orderModel.findByIdAndDelete(orderId);
    res.json({ success: true, message: "Order Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Export mein shamil karein
export {
  placeOrder,
  allOrders,
  userOrders,
  updateStatus,
  orderStatus,
  removeOrder,
};
