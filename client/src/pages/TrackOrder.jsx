import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiPackage,
  FiTruck,
  FiCheckCircle,
  FiSearch,
  FiClock,
} from "react-icons/fi";
import GoldButton from "../components/GoldButton";
import perfumes from "../data/perfumes"; // Import perfumes for images

export default function TrackOrder() {
  const [orderId, setOrderId] = useState("");
  const [showDetails, setShowDetails] = useState(false);

  // Simulation: Maan letay hain user ne 'dream-drift' order kiya tha
  const sampleProduct = perfumes[0];
  const orderStatus = "Shipped";

  const handleTrack = (e) => {
    e.preventDefault();
    // Real backend mein yahan database query hogi
    if (orderId) setShowDetails(true);
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
                placeholder="Enter Order ID (e.g. #123)"
                className="w-full py-3 outline-none text-sm text-grey font-bold"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                required
              />
            </div>
            <GoldButton
              type="submit"
              className="!py-3 !px-10 whitespace-nowrap !text-[10px]"
            >
              Track Now
            </GoldButton>
          </form>
        </div>

        {showDetails && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-10"
          >
            {/* TIMELINE SECTION */}
            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-gold/5 overflow-x-auto scrollbar-hide">
              <div className="min-w-[600px] flex justify-between relative px-4">
                <div className="absolute top-[24px] left-0 w-full h-[2px] bg-gray-100 z-0"></div>
                <div
                  className="absolute top-[24px] left-0 h-[2px] bg-gold z-0 transition-all duration-1000"
                  style={{
                    width:
                      orderStatus === "Delivered"
                        ? "100%"
                        : orderStatus === "Shipped"
                          ? "66%"
                          : orderStatus === "Packed"
                            ? "33%"
                            : "0%",
                  }}
                ></div>

                <StatusNode
                  active={true}
                  icon={<FiClock />}
                  label="Order Placed"
                  date="Just Now"
                />
                <StatusNode
                  active={orderStatus !== "Placed"}
                  icon={<FiPackage />}
                  label="Packed"
                  date="Processing"
                />
                <StatusNode
                  active={
                    orderStatus === "Shipped" || orderStatus === "Delivered"
                  }
                  icon={<FiTruck />}
                  label="In Transit"
                  date="On the way"
                />
                <StatusNode
                  active={orderStatus === "Delivered"}
                  icon={<FiCheckCircle />}
                  label="Delivered"
                  date="Arriving soon"
                />
              </div>
            </div>

            {/* ORDER ITEMS & SHIPPING DETAILS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
              {/* Left: Product List */}
              <div className="lg:col-span-2 bg-white p-6 md:p-10 rounded-[2.5rem] shadow-xl border border-gold/5">
                <h3 className="font-serif text-2xl text-grey mb-6 border-b border-gold/10 pb-4">
                  Order Summary
                </h3>
                <div className="flex items-center gap-6">
                  {/* FIXED IMAGE SOURCE */}
                  <div className="w-24 h-32 flex-shrink-0 bg-[#F3F2EE] rounded-xl overflow-hidden border border-gold/10 shadow-inner">
                    <img
                      src={sampleProduct.images[0]}
                      alt="Product"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-2 text-left">
                    <h4 className="font-serif text-2xl text-grey">
                      {sampleProduct.name}
                    </h4>
                    <p className="text-gold text-[10px] font-black uppercase tracking-widest">
                      {sampleProduct.category} | {sampleProduct.size}
                    </p>

                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-3">
                        {/* 1. Jis price par user ne khareeda (Dynamic) */}
                        <span className="font-black text-grey text-lg">
                          Rs. 1250
                        </span>

                        {/* 2. Original price jo purchase ke waqt thi (Strike through) */}
                        <span className="text-xs text-red-500/50 line-through font-bold">
                          Rs. 1500
                        </span>
                      </div>

                      {/* 3. Confirmation Label */}
                      <span className="text-[9px] text-green-600 font-bold uppercase tracking-tighter italic">
                        * You saved Rs. 34 on this order
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Customer Details */}
              <div className="bg-grey p-8 md:p-10 rounded-[2.5rem] text-white shadow-2xl flex flex-col justify-between">
                <div className="space-y-6 text-left">
                  <h3 className="font-serif text-2xl text-gold border-b border-gold/20 pb-2">
                    Delivery To
                  </h3>
                  <div className="space-y-1">
                    <p className="font-black text-xl tracking-tight text-white uppercase">
                      Ali Ahmed
                    </p>
                    <p className="text-sm opacity-60 italic">
                      ali.ahmed@email.com
                    </p>
                  </div>
                  <div className="text-sm opacity-80 leading-relaxed">
                    <p>House #42, Street 5, Phase 6</p>
                    <p>DHA, Lahore, Punjab</p>
                    <p>Pakistan - 54000</p>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-gold/20 flex justify-between items-end">
                  <div>
                    <p className="text-[10px] uppercase font-black text-gold tracking-widest">
                      Total Amount
                    </p>
                    <p className="text-2xl font-black tracking-tighter">
                      Rs. 1,750
                    </p>
                  </div>
                  <p className="text-[10px] text-white/40 italic font-bold">
                    COD Paid
                  </p>
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
