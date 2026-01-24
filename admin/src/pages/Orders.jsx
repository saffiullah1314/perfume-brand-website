import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import {
  IoCubeOutline,
  IoPersonOutline,
  IoLocationOutline,
  IoCallOutline,
  IoWalletOutline,
  IoCalendarOutline,
  IoTrashOutline,
  IoCopyOutline,
} from "react-icons/io5";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [orderCount, setOrderCount] = useState(0);
  const audioPlayer = useRef(null);

  // Sound Notification URL (Aap apni pasand ki short mp3 file yahan daal sakte hain)
  const notificationSound =
    "https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3";

  const fetchAllOrders = async (isFirstLoad = false) => {
    if (!token) return null;
    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } },
      );
      if (response.data.success) {
        const fetchedOrders = response.data.orders.reverse();

        // Agar naye orders aaye hain toh sound bajao (First load par nahi bajega)
        if (!isFirstLoad && fetchedOrders.length > orderCount) {
          audioPlayer.current
            .play()
            .catch((err) =>
              console.log("Audio play blocked by browser settings."),
            );
          toast.info("New Order Received! 🔔");
        }

        setOrders(fetchedOrders);
        setOrderCount(fetchedOrders.length);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteOrder = async (orderId) => {
    if (window.confirm("Confirm delete this order record?")) {
      try {
        const response = await axios.post(
          backendUrl + "/api/order/remove",
          { orderId },
          { headers: { token } },
        );
        if (response.data.success) {
          toast.success("Order Removed");
          fetchAllOrders(true);
        }
      } catch (error) {
        toast.error("Error deleting order");
      }
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: event.target.value },
        { headers: { token } },
      );
      if (response.data.success) {
        fetchAllOrders(true);
        toast.success("Status Updated");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders(true); // Pehli baar load karte waqt sound nahi bajega

    // Auto-refresh every 30 seconds to check for new orders
    const interval = setInterval(() => {
      fetchAllOrders(false);
    }, 30000);

    return () => clearInterval(interval);
  }, [token, orderCount]);

  return (
    <div className="animate-fade-in pb-20 px-4">
      {/* Hidden Audio Element */}
      <audio ref={audioPlayer} src={notificationSound} />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h2 className="text-3xl font-serif tracking-widest text-[#1A1A1A] uppercase font-bold">
            Dispatch Center
          </h2>
          <div className="h-[3px] w-20 bg-[#C5A059] mt-1"></div>
        </div>
        <div className="flex items-center gap-3">
          <span className="animate-pulse w-2 h-2 bg-green-500 rounded-full"></span>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
            Live Monitoring Active
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-10">
        {orders.map((order, index) => (
          <div
            key={index}
            className="bg-white border-2 border-gray-200 rounded-[1.5rem] overflow-hidden shadow-lg hover:border-[#C5A059] transition-all"
          >
            {/* Header */}
            <div className="bg-[#1A1A1A] text-white px-6 py-4 flex justify-between items-center flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="bg-[#C5A059] p-2 rounded-lg text-black">
                  <IoCubeOutline size={24} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest leading-none">
                    Tracking ID
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="font-mono text-sm font-bold text-white">
                      {order._id}
                    </p>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(order._id);
                        toast.info("Copied!");
                      }}
                      className="text-[#C5A059] hover:text-white"
                    >
                      <IoCopyOutline size={18} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="text-right flex items-center gap-4">
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-black">
                    Ordered On
                  </p>
                  <p className="text-sm font-bold">
                    {new Date(order.date).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => deleteOrder(order._id)}
                  className="p-3 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all"
                >
                  <IoTrashOutline size={20} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-gray-100 p-8 gap-8">
              {/* 1. Items */}
              <div className="space-y-6">
                <h3 className="text-xs font-black uppercase text-gray-400 tracking-widest">
                  Package Content
                </h3>
                <div className="space-y-4">
                  {order.items.map((item, i) => (
                    <div
                      key={i}
                      className="flex gap-4 items-center bg-gray-50 p-3 rounded-2xl border border-gray-100"
                    >
                      <div className="w-12 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0 border">
                        <img
                          src={item.image?.[0]}
                          className="w-full h-full object-cover"
                          alt=""
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-black text-black truncate uppercase">
                          {item.name}
                        </p>
                        <p className="text-[9px] text-[#C5A059] font-bold uppercase">
                          {item.size} x {item.quantity}
                        </p>
                        <p className="text-xs font-bold text-black mt-1">
                          Rs. {item.price * item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. Address */}
              <div className="space-y-6 lg:px-8">
                <h3 className="text-xs font-black uppercase text-gray-400 tracking-widest">
                  Consignee Details
                </h3>
                <div className="space-y-4">
                  <p className="text-lg font-black text-black uppercase leading-none">
                    {order.address.firstName} {order.address.lastName}
                  </p>
                  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-sm font-medium">
                    <p className="font-bold text-black">
                      {order.address.street}
                    </p>
                    <p>
                      {order.address.city}, {order.address.state} -{" "}
                      {order.address.zipCode}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 bg-[#1A1A1A] p-4 rounded-2xl text-[#C5A059] shadow-md font-mono font-black text-xl">
                    <IoCallOutline /> {order.address.phone}
                  </div>
                </div>
              </div>

              {/* 3. Billing Summary (ALIGNED) */}
              <div className="space-y-6 lg:pl-8">
                <h3 className="text-xs font-black uppercase text-gray-400 tracking-widest">
                  Billing Summary
                </h3>
                <div className="bg-gray-50 p-6 rounded-[1.5rem] border border-gray-200">
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500 font-bold uppercase tracking-widest">
                        Payment Method
                      </span>
                      <span className="text-black font-black uppercase">
                        {order.paymentMethod}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500 font-bold uppercase tracking-widest">
                        Payment Status
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[9px] font-black ${order.payment ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}
                      >
                        {order.payment ? "PAID" : "UNPAID"}
                      </span>
                    </div>
                    <div className="pt-3 border-t border-gray-200 flex justify-between items-baseline">
                      <span className="text-[10px] font-black text-gray-400 uppercase">
                        Grand Total
                      </span>
                      <span className="text-3xl font-black text-black tracking-tighter">
                        Rs. {order.amount}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                    Order Status
                  </p>
                  <select
                    onChange={(e) => statusHandler(e, order._id)}
                    value={order.status}
                    className="w-full bg-white border-2 border-gray-300 p-4 text-xs font-black tracking-[0.1em] rounded-2xl outline-none cursor-pointer focus:border-[#C5A059]"
                  >
                    <option value="Order Placed">ORDER PLACED</option>
                    <option value="Packed">READY TO SHIP</option>
                    <option value="Shipped">SHIPPED</option>
                    <option value="Delivered">DELIVERED</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
