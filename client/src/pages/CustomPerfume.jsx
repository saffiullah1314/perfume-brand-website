import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import GoldButton from "../components/GoldButton";
import { toast } from "react-hot-toast";
import axios from "axios";
import { CartContext } from "../context/CartContext";

export default function CustomPerfume() {
  const { backendUrl } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    targetBrand: "",
    specialRequest: "",
    intensity: "Medium",
    bottleSize: "50ml",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        backendUrl + "/api/order/custom-request",
        formData,
      );
      if (response.data.success) {
        toast.success("Request Received! We will email you the quote soon.", {
          duration: 5000,
          style: {
            background: "#1A1A1A",
            color: "#C5A059",
            border: "1px solid #C5A059",
          },
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          targetBrand: "",
          specialRequest: "",
          intensity: "Medium",
          bottleSize: "50ml",
        });
      }
    } catch (error) {
      toast.error("Failed to send request. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#FBFBF9] min-h-screen pt-32 pb-20 px-4 md:px-12 lg:px-24 font-body">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="font-serif text-[12px] uppercase tracking-[0.6em] text-gold font-black text-center">
            Bespoke Fragrance
          </h2>
          <h1 className="font-serif text-4xl md:text-6xl text-grey tracking-tighter leading-none text-black text-center">
            Your Scent, Your Story
          </h1>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-stretch gap-10">
          {/* LEFT: INFORMATION BOX */}
          <div className="w-full lg:w-[40%] flex flex-col">
            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border-2 border-gold/10 shadow-xl flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-3xl text-grey mb-8 border-b border-gold pb-4 text-black text-left">
                  The Process
                </h3>
                <ul className="space-y-8 text-gold">
                  <ProcessStep
                    number="01"
                    title="Inspiration"
                    desc="Mention a brand or specific notes you adore."
                  />
                  <ProcessStep
                    number="02"
                    title="Analysis"
                    desc="Our perfumers evaluate the ingredient complexity."
                  />
                  <ProcessStep
                    number="03"
                    title="Quote"
                    desc="A personalized price is sent to your email."
                  />
                  <ProcessStep
                    number="04"
                    title="Creation"
                    desc="Each bottle is handcrafted upon your final approval."
                  />
                </ul>
              </div>
              <div className="mt-10 p-6 bg-[#1A1A1A] rounded-2xl text-center">
                <p className="text-gold text-[10px] uppercase font-black tracking-widest mb-2">
                  Expert Consultation
                </p>
                <p className="text-white/70 text-xs italic">
                  "We use only high-concentration premium oils."
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: CUSTOM FORM BOX */}
          <div className="w-full lg:w-[60%] flex">
            <form
              onSubmit={handleSubmit}
              className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-gray-100 flex-1 space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <InputGroup
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  placeholder="Enter your name"
                  onChange={handleChange}
                  required
                />
                <InputGroup
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  placeholder="03XXXXXXXXX"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="text-left">
                <InputGroup
                  label="Email Address"
                  name="email"
                  value={formData.email}
                  type="email"
                  placeholder="example@gmail.com"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2 text-left">
                <label className="text-[11px] uppercase font-black text-grey tracking-widest">
                  Inspiration (Brand/Perfume Name)
                </label>
                <input
                  name="targetBrand"
                  value={formData.targetBrand}
                  placeholder="e.g. Dunhill Desire"
                  className="w-full bg-[#F3F2EE] border-none rounded-xl px-5 py-4 text-sm focus:ring-1 focus:ring-gold outline-none"
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2 text-left">
                <label className="text-[11px] uppercase font-black text-grey tracking-widest">
                  Anything else? (Optional)
                </label>
                <textarea
                  name="specialRequest"
                  value={formData.specialRequest}
                  rows="3"
                  placeholder="Describe your unique requirements..."
                  className="w-full bg-[#F3F2EE] border-none rounded-xl px-5 py-4 text-sm focus:ring-1 focus:ring-gold outline-none resize-none"
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2 text-left">
                  <label className="text-[11px] uppercase font-black text-grey tracking-widest">
                    Bottle Size
                  </label>
                  <select
                    name="bottleSize"
                    value={formData.bottleSize}
                    className="w-full bg-[#F3F2EE] border-none rounded-xl px-5 py-3.5 text-sm"
                    onChange={handleChange}
                  >
                    <option value="50ml">50ml</option>
                    <option value="100ml">100ml</option>
                  </select>
                </div>
                <div className="space-y-2 text-left">
                  <label className="text-[11px] uppercase font-black text-grey tracking-widest">
                    Intensity
                  </label>
                  <select
                    name="intensity"
                    value={formData.intensity}
                    className="w-full bg-[#F3F2EE] border-none rounded-xl px-5 py-3.5 text-sm"
                    onChange={handleChange}
                  >
                    <option value="light">Light</option>
                    <option value="medium">Medium</option>
                    <option value="strong">Strong</option>
                  </select>
                </div>
              </div>

              <GoldButton
                type="submit"
                disabled={loading}
                className="w-full !py-5 uppercase tracking-[0.3em] !text-[12px] font-black"
              >
                {loading ? "SENDING..." : "Submit Request"}
              </GoldButton>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- ADDING MISSING SUB-COMPONENTS ---

function InputGroup({ label, ...props }) {
  return (
    <div className="space-y-2 w-full text-left">
      <label className="text-[11px] uppercase font-black text-grey tracking-widest">
        {label}
      </label>
      <input
        {...props}
        className="w-full bg-[#F3F2EE] border-none rounded-xl px-5 py-4 text-sm focus:ring-1 focus:ring-gold outline-none transition-all placeholder:text-grey/40 text-grey"
      />
    </div>
  );
}

function ProcessStep({ number, title, desc }) {
  return (
    <li className="flex gap-5 items-start">
      <span className="font-serif text-3xl text-gold font-bold">{number}</span>
      <div className="text-left">
        <h4 className="font-serif text-lg text-grey font-bold leading-none mb-1 text-black">
          {title}
        </h4>
        <p className="text-[11px] text-grey/50 leading-relaxed uppercase tracking-wider">
          {desc}
        </p>
      </div>
    </li>
  );
}
