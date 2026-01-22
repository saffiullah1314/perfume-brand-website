import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import GoldButton from "../components/GoldButton";
import { FiCheckCircle } from "react-icons/fi";

export default function Success() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full text-center space-y-8 p-10 rounded-[3rem] border-2 border-gold/10 shadow-2xl"
      >
        <div className="flex justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center text-gold"
          >
            <FiCheckCircle size={50} />
          </motion.div>
        </div>

        <div className="space-y-3">
          <h1 className="font-serif text-4xl text-[#1A1A1A]">Thank You!</h1>
          <p className="text-gold font-black uppercase tracking-[0.2em] text-[10px]">
            Order Placed Successfully
          </p>
          <p className="text-grey/60 text-sm leading-relaxed">
            Your fragrance journey has begun. We’ve received your order and our
            team is preparing it with care.
          </p>
        </div>

        <div className="pt-6 border-t border-gold/10">
          <GoldButton
            onClick={() => navigate("/shop")}
            className="w-full !py-4"
          >
            Continue Shopping
          </GoldButton>
          <button
            onClick={() => navigate("/track-order")}
            className="mt-4 text-[10px] uppercase font-black tracking-widest text-grey/40 hover:text-gold transition-colors"
          >
            Track Your Order
          </button>
        </div>
      </motion.div>
    </div>
  );
}
