import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import {
  FiPackage,
  FiTruck,
  FiCheckCircle,
  FiSearch,
  FiClock,
} from "react-icons/fi";
import GoldButton from "../components/GoldButton";
import { CartContext } from "../context/CartContext";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function TrackOrder() {
  const [orderId, setOrderId] = useState("");
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { backendUrl, token } = useContext(CartContext);

  // handleTrack function ke andar ye line update karein
  const handleTrack = async (e) => {
    e.preventDefault();
    const cleanOrderId = orderId.trim(); // Spaces khatam karne ke liye

    if (!cleanOrderId) return;

    setLoading(true);
    try {
      // cleanOrderId bhejien yahan
      const response = await axios.post(backendUrl + "/api/order/track", {
        orderId: cleanOrderId,
      });

      if (response.data.success) {
        setOrderData(response.data.order);
        toast.success("Order Found!");
      } else {
        toast.error(response.data.message);
        setOrderData(null);
      }
    } catch (error) {
      // ... error logic
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#FBFBF9] min-h-screen pt-32 pb-20 px-4 md:px-12 lg:px-24 font-body">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="font-serif text-4xl md:text-6xl text-grey tracking-tighter">
            Track Your Journey
          </h1>
          <p className="text-gold text-[10px] md:text-[12px] uppercase tracking-[0.4em] font-black">
            Follow your signature scent
          </p>
        </div>

        {/* SEARCH BOX */}
        <div className="max-w-xl mx-auto mb-16">
          <form
            onSubmit={handleTrack}
            className="flex flex-col sm:flex-row gap-4 p-2 bg-white rounded-2xl shadow-xl border border-gold/10"
          >
            <div className="flex-1 flex items-center px-4 gap-3">
              <FiSearch className="text-gold" size={20} />
              <input
                type="text"
                placeholder="Enter Order ID (e.g. #678abc...)"
                className="w-full py-3 outline-none text-sm text-grey font-bold bg-transparent"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                required
              />
            </div>
            <GoldButton type="submit" className="!py-3 !px-10 !text-[10px]">
              {loading ? "Searching..." : "Track Now"}
            </GoldButton>
          </form>
        </div>

        {orderData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-10"
          >
            {/* TIMELINE SECTION - FULLY DYNAMIC */}
            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-gold/5 overflow-x-auto scrollbar-hide">
              <div className="min-w-[600px] flex justify-between relative px-4">
                <div className="absolute top-[24px] left-0 w-full h-[2px] bg-gray-100 z-0"></div>
                <div
                  className="absolute top-[24px] left-0 h-[2px] bg-gold z-0 transition-all duration-1000"
                  style={{
                    width:
                      orderData.status === "Delivered"
                        ? "100%"
                        : orderData.status === "Shipped"
                          ? "66%"
                          : orderData.status === "Packed"
                            ? "33%"
                            : "0%",
                  }}
                ></div>

                <StatusNode
                  active={true}
                  icon={<FiClock />}
                  label="Order Placed"
                  date={new Date(orderData.date).toLocaleDateString()}
                />
                <StatusNode
                  active={["Packed", "Shipped", "Delivered"].includes(
                    orderData.status,
                  )}
                  icon={<FiPackage />}
                  label="Packed"
                  date={orderData.status === "Packed" ? "Processing" : "Done"}
                />
                <StatusNode
                  active={["Shipped", "Delivered"].includes(orderData.status)}
                  icon={<FiTruck />}
                  label="In Transit"
                  date={
                    orderData.status === "Shipped" ? "On the way" : "Arrived"
                  }
                />
                <StatusNode
                  active={orderData.status === "Delivered"}
                  icon={<FiCheckCircle />}
                  label="Delivered"
                  date={
                    orderData.status === "Delivered" ? "Received" : "Pending"
                  }
                />
              </div>
            </div>

            {/* ORDER SUMMARY DISPLAY */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
              <div className="lg:col-span-2 bg-white p-6 md:p-10 rounded-[2.5rem] shadow-xl border border-gold/5">
                <h3 className="font-serif text-2xl text-grey mb-6 border-b border-gold/10 pb-4">
                  Items List
                </h3>
                <div className="space-y-6">
                  {orderData.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-6">
                      <div className="w-20 h-24 flex-shrink-0 bg-[#F3F2EE] rounded-xl overflow-hidden border border-gold/10">
                        <img
                          src={item.image?.[0] || item.images?.[0]}
                          className="w-full h-full object-cover"
                          alt={item.name}
                          onError={(e) => {
                            e.target.src = "fallback-image-url-here";
                          }} // Optional: agar image na mile
                        />
                      </div>
                      <div className="text-left">
                        <h4 className="font-serif text-xl text-grey">
                          {item.name}
                        </h4>
                        <p className="text-gold text-[9px] font-black uppercase tracking-widest">
                          Qty: {item.quantity} | Size: {item.size || "50ml"}
                        </p>
                        <p className="font-bold text-grey">Rs. {item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery info from Database */}
              <div className="bg-grey p-8 md:p-10 rounded-[2.5rem] text-white shadow-2xl flex flex-col">
                <h3 className="font-serif text-2xl text-gold border-b border-gold/20 pb-2 text-left">
                  Shipping Info
                </h3>
                <div className="mt-4 text-left space-y-2">
                  <p className="font-black uppercase">
                    {orderData.address.firstName} {orderData.address.lastName}
                  </p>
                  <p className="text-sm opacity-70">
                    {orderData.address.street}
                  </p>
                  <p className="text-sm opacity-70">
                    {orderData.address.city}, {orderData.address.state}
                  </p>
                  <p className="text-sm opacity-70">
                    {orderData.address.phone}
                  </p>
                </div>
                <div className="mt-auto pt-6 border-t border-gold/20 flex justify-between items-end">
                  <div className="text-left">
                    <p className="text-[9px] uppercase font-black text-gold">
                      Amount
                    </p>
                    <p className="text-xl font-black">Rs. {orderData.amount}</p>
                  </div>
                  <span className="text-[9px] px-3 py-1 bg-gold/20 text-gold rounded-full font-bold uppercase">
                    {orderData.payment ? "Online Paid" : "COD"}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function StatusNode({ active, icon, label, date }) {
  return (
    <div className="relative z-10 flex flex-col items-center gap-3 w-32">
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-500 ${active ? "bg-gold border-white text-white shadow-lg shadow-gold/30" : "bg-white border-gray-100 text-gray-300"}`}
      >
        {icon}
      </div>
      <div className="text-center">
        <p
          className={`text-[11px] font-black uppercase tracking-widest ${active ? "text-grey" : "text-gray-300"}`}
        >
          {label}
        </p>
        <p
          className={`text-[9px] italic ${active ? "text-gold font-bold" : "text-grey/30"}`}
        >
          {date}
        </p>
      </div>
    </div>
  );
}
