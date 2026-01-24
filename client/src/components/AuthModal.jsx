import React, { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiMail, FiLock, FiUser } from "react-icons/fi";
import axios from "axios";
import { toast } from "react-toastify";
import { CartContext } from "../context/CartContext";
import GoldButton from "./GoldButton";

export default function AuthModal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { backendUrl, setToken } = useContext(CartContext);

  // --- Login / Register Function ---
  const handleAuth = async () => {
    // Basic Validation
    if (!email || !password || (!isLogin && !name)) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const endpoint = isLogin ? "/api/user/login" : "/api/user/register";
      const payload = isLogin ? { email, password } : { name, email, password };

      console.log("Sending request to:", backendUrl + endpoint);

      const response = await axios.post(backendUrl + endpoint, payload);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        toast.success(
          isLogin ? "Welcome back to ROOHRA!" : "Account Created Successfully!",
        );
        onClose(); // Modal band kar dein
        // Form reset
        setName("");
        setEmail("");
        setPassword("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Auth Error:", error);
      toast.error(error.response?.data?.message || "Server connection failed");
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[150] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-md"
        />

        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative bg-[#FBFBF9] w-full max-w-md p-8 md:p-10 rounded-[1.5rem] shadow-2xl border border-gold/20 overflow-hidden"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-grey hover:text-gold transition-colors"
          >
            <FiX size={24} />
          </button>

          <div className="text-center mb-8">
            <h2 className="font-serif text-3xl text-grey tracking-tight italic">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gold/10 mb-8">
            <button
              className={`flex-1 pb-3 text-xs font-bold uppercase transition-all ${isLogin ? "text-gold border-b-2 border-gold" : "text-grey/40"}`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={`flex-1 pb-3 text-xs font-bold uppercase transition-all ${!isLogin ? "text-gold border-b-2 border-gold" : "text-grey/40"}`}
              onClick={() => setIsLogin(false)}
            >
              Register
            </button>
          </div>

          {/* Input Fields */}
          <div className="space-y-4">
            {!isLogin && (
              <AuthInput
                icon={<FiUser />}
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}
            <AuthInput
              icon={<FiMail />}
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <AuthInput
              icon={<FiLock />}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="pt-4">
              {/* Direct onClick use kar rahe hain yahan taake GoldButton trigger ho */}
              <GoldButton
                type="button"
                onClick={handleAuth}
                className="w-full py-4 rounded-xl font-bold uppercase tracking-widest text-xs"
              >
                {isLogin ? "Sign In" : "Get Started"}
              </GoldButton>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

function AuthInput({ icon, ...props }) {
  return (
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/50 group-focus-within:text-gold transition-colors">
        {icon}
      </div>
      <input
        {...props}
        required
        className="w-full bg-white border border-gold/10 rounded-xl py-4 pl-12 pr-4 text-sm outline-none focus:border-gold transition-all"
      />
    </div>
  );
}
