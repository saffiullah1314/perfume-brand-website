import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiMail, FiLock, FiUser, FiShield, FiKey } from "react-icons/fi";
import GoldButton from "./GoldButton";

export default function AuthModal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true); // User Login vs Register
  const [isAdmin, setIsAdmin] = useState(false); // User Mode vs Admin Mode

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[150] flex items-center justify-center px-4">
        {/* 1. Background Blur Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-md"
        />

        {/* 2. Main Form Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative bg-[#FBFBF9] w-full max-w-md p-8 md:p-10 rounded-[1.5rem] shadow-2xl border border-gold/20 overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-grey hover:text-gold transition-colors"
          >
            <FiX size={24} />
          </button>

          {/* Header Section */}
          <div className="text-center mb-8">
            <h2 className="font-serif text-3xl text-grey tracking-tight italic">
              {isAdmin
                ? "Admin Authorization"
                : isLogin
                  ? "Welcome Back"
                  : "Create Account"}
            </h2>
            <p className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold mt-2">
              {isAdmin ? "Highly Secure Access" : "The Essence of Luxury"}
            </p>
          </div>

          {/* Tabs: Sirf User mode mein dikhenge, Admin mode mein nahi */}
          {!isAdmin && (
            <div className="flex border-b border-gold/10 mb-8">
              <button
                className={`flex-1 pb-3 text-xs font-bold tracking-widest uppercase transition-all ${isLogin ? "text-gold border-b-2 border-gold" : "text-grey/40"}`}
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
              <button
                className={`flex-1 pb-3 text-xs font-bold tracking-widest uppercase transition-all ${!isLogin ? "text-gold border-b-2 border-gold" : "text-grey/40"}`}
                onClick={() => setIsLogin(false)}
              >
                Register
              </button>
            </div>
          )}

          {/* Form Fields */}
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {/* User Name: Sirf Signup ke waqt */}
            {!isLogin && !isAdmin && (
              <AuthInput
                icon={<FiUser />}
                type="text"
                placeholder="Full Name"
              />
            )}

            {/* Email: Sab ke liye zaroori hai */}
            <AuthInput
              icon={<FiMail />}
              type="email"
              placeholder="Email Address"
            />

            {/* ADMIN SPECIAL FIELD 1: Secret ID */}
            {isAdmin && (
              <AuthInput
                icon={<FiKey />}
                type="password"
                placeholder="Secret Admin ID"
              />
            )}

            {/* Password: Sab ke liye zaroori hai */}
            <AuthInput
              icon={<FiLock />}
              type="password"
              placeholder="Password"
            />

            {/* ADMIN SPECIAL FIELD 2: Badge Number */}
            {isAdmin && (
              <AuthInput
                icon={<FiShield />}
                type="text"
                placeholder="Admin Badge No."
              />
            )}

            <div className="pt-4">
              <GoldButton className="w-full py-4 rounded-xl shadow-lg shadow-gold/10 font-bold uppercase tracking-widest text-xs">
                {isAdmin
                  ? "Verify & Enter"
                  : isLogin
                    ? "Sign In"
                    : "Get Started"}
              </GoldButton>
            </div>
          </form>

          {/* Admin Toggle Button: Secure Portal Toggle */}
          <div className="mt-8 pt-6 border-t border-gold/5 text-center">
            <button
              onClick={() => {
                setIsAdmin(!isAdmin);
                setIsLogin(true);
              }}
              className={`text-[9px] font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-3 mx-auto px-6 py-2 rounded-full transition-all duration-500 ${isAdmin ? "bg-gold text-black shadow-md" : "text-gold/60 hover:text-gold hover:bg-gold/5"}`}
            >
              <FiShield className={isAdmin ? "animate-pulse" : ""} />
              {isAdmin ? "Switch to User Login" : "Secure Admin Portal"}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

// Reusable Input Component for consistent styling
function AuthInput({ icon, ...props }) {
  return (
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/50 group-focus-within:text-gold transition-colors">
        {icon}
      </div>
      <input
        {...props}
        required
        className="w-full bg-white border border-gold/10 rounded-xl py-4 pl-12 pr-4 text-sm outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all placeholder:text-grey/30"
      />
    </div>
  );
}
