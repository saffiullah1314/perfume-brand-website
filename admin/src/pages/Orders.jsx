import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import {
  IoCubeOutline,
  IoPersonOutline,
  IoLocationOutline,
  IoCallOutline,
  IoCalendarOutline,
  IoTrashOutline,
  IoCopyOutline,
  IoMailOutline,
} from "react-icons/io5";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [orderCount, setOrderCount] = useState(0);
  const audioPlayer = useRef(null);
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
        if (!isFirstLoad && fetchedOrders.length > orderCount) {
          audioPlayer.current?.play().catch(() => {});
          toast.info("New Order Received! 🔔");
        }
        setOrders(fetchedOrders);
        setOrderCount(fetchedOrders.length);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const openGmailWeb = (order) => {
    const itemsList = order.items
      .map(
        (item) => `- ${item.name} (${item.size || "50ml"}) x ${item.quantity}`,
      )
      .join("\n");
    const subject = encodeURIComponent(
      `Order Confirmation - ROOHRA - ID: ${order._id.slice(-6)}`,
    );
    const body = encodeURIComponent(
      `Dear ${order.address.firstName},\n\nYour order from ROOHRA has been received!\n\n--- ORDER SUMMARY ---\nTracking ID: ${order._id}\nItems:\n${itemsList}\nTotal Amount: Rs. ${order.amount}\n\n--- SHIPPING TO ---\n${order.address.street}, ${order.address.city}\nPhone: ${order.address.phone}\n\nStay Fragrant,\nTeam ROOHRA`,
    );
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${order.address.email}&su=${subject}&body=${body}`;
    window.open(gmailUrl, "_blank");
  };

  const deleteOrder = async (orderId) => {
    if (window.confirm("Delete order record?")) {
      try {
        const response = await axios.post(
          backendUrl + "/api/order/remove",
          { orderId },
          { headers: { token } },
        );
        if (response.data.success) {
          toast.success("Order Deleted");
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
    fetchAllOrders(true);
    const interval = setInterval(() => fetchAllOrders(false), 30000);
    return () => clearInterval(interval);
  }, [token, orderCount]);

  return (
    <div className="animate-fade-in pb-20 px-2 sm:px-4 text-left font-sans max-w-[1400px] mx-auto">
      <audio ref={audioPlayer} src={notificationSound} />

      <div className="mb-8 mt-4">
        <h2 className="text-2xl sm:text-3xl font-serif tracking-widest text-[#1A1A1A] uppercase font-bold">
          Dispatch Center
        </h2>
        <div className="h-[3px] w-16 bg-[#C5A059] mt-1"></div>
      </div>

      <div className="flex flex-col gap-6 sm:gap-10">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white border border-gray-200 rounded-2xl sm:rounded-[1.5rem] overflow-hidden shadow-md hover:shadow-xl transition-all"
          >
            {/* Header - Fully Responsive Stack on Mobile */}
            <div className="bg-[#1A1A1A] text-white px-4 py-4 sm:px-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="bg-[#C5A059] p-1.5 rounded text-black shrink-0">
                  <IoCubeOutline size={20} />
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] text-gray-400 uppercase font-black tracking-widest">
                    Tracking ID
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <p className="font-mono text-xs font-bold text-white truncate">
                      {order._id}
                    </p>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(order._id);
                        toast.info("ID Copied!");
                      }}
                      className="text-[#C5A059] shrink-0"
                    >
                      <IoCopyOutline size={16} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto border-t border-white/10 sm:border-none pt-3 sm:pt-0">
                <button
                  onClick={() => openGmailWeb(order)}
                  className="flex items-center gap-2 bg-[#C5A059] text-black px-3 py-2 rounded-full text-[9px] font-black uppercase tracking-widest hover:bg-white transition-all shadow-md shrink-0"
                >
                  <IoMailOutline size={14} /> Gmail
                </button>
                <button
                  onClick={() => deleteOrder(order._id)}
                  className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg border border-red-500/20 shrink-0"
                >
                  <IoTrashOutline size={18} />
                </button>
              </div>
            </div>

            {/* Content Body - 1 Column Mobile, 3 Columns Desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
              {/* Package Content */}
              <div className="p-4 sm:p-6 lg:p-8 space-y-4">
                <h3 className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">
                  Package Content
                </h3>
                <div className="space-y-3">
                  {order.items.map((item, i) => (
                    <div
                      key={i}
                      className="flex gap-3 items-center bg-gray-50 p-3 rounded-xl border border-gray-100"
                    >
                      <div className="w-12 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
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
                          {item.size || "50ml"} x {item.quantity}
                        </p>
                        <p className="text-xs font-bold text-black mt-1">
                          Rs. {(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Consignee Section */}
              <div className="p-4 sm:p-6 lg:p-8 space-y-4">
                <h3 className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">
                  Consignee Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-lg font-black text-black uppercase leading-tight">
                      {order.address.firstName} {order.address.lastName}
                    </p>
                    <p className="text-[11px] font-bold text-[#C5A059] mt-1 break-all">
                      {order.address.email}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-xs sm:text-sm">
                    <p className="font-bold text-black leading-snug">
                      {order.address.street}
                    </p>
                    <p className="font-medium text-gray-600 mt-1">
                      {order.address.city}, {order.address.state} -{" "}
                      {order.address.zipCode}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 bg-[#1A1A1A] p-3 rounded-xl text-[#C5A059] font-mono font-black text-lg sm:text-xl">
                    <IoCallOutline />{" "}
                    <span className="tracking-tighter">
                      {order.address.phone}
                    </span>
                  </div>
                </div>
              </div>

              {/* Financial Section - Fixed Size & Alignment */}
              <div className="p-4 sm:p-6 lg:p-8 space-y-4">
                <h3 className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">
                  Financial & Status
                </h3>
                <div className="bg-[#1A1A1A] p-5 rounded-2xl border-b-4 border-[#C5A059]">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-gray-400 font-bold uppercase tracking-widest">
                        Payment
                      </span>
                      <span className="text-white font-black uppercase">
                        {order.paymentMethod}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-gray-400 font-bold uppercase tracking-widest">
                        Status
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full font-black ${order.payment ? "bg-green-500 text-white" : "bg-orange-500 text-white"}`}
                      >
                        {order.payment ? "PAID" : "UNPAID"}
                      </span>
                    </div>
                    <div className="pt-3 border-t border-white/10 flex justify-between items-center">
                      <span className="text-[9px] font-black text-[#C5A059] uppercase">
                        Grand Total
                      </span>
                      {/* Size reduced from 3xl to xl */}
                      <span className="text-xl font-black text-white tracking-tight leading-none">
                        Rs.{order.amount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <select
                    onChange={(e) => statusHandler(e, order._id)}
                    value={order.status}
                    className="w-full bg-white border border-gray-300 p-3.5 text-[10px] font-black tracking-widest rounded-xl cursor-pointer hover:border-[#C5A059] outline-none"
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
