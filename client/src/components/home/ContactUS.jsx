import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { FiInstagram, FiMessageCircle } from "react-icons/fi";
import { FaTiktok } from "react-icons/fa";
import GoldButton from "../GoldButton";

export default function ContactUs() {
  const form = useRef();
  const [status, setStatus] = useState("");

  const socialLinks = {
    instagram: "https://www.instagram.com/roohrafragrances",
    whatsapp: "https://wa.me/923301818591",
    tiktok: "https://www.tiktok.com/@roohrafragrances",
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("Processing...");

    emailjs
      .sendForm(
        "service_jka9dpa",
        "template_h9ugpp3",
        form.current,
        "YacIzfwjfXsnvCeyk",
      )
      .then(
        () => {
          setStatus("Your message has been received.");
          form.current.reset();
        },
        () => {
          setStatus("An error occurred. Please try again later.");
        },
      );
  };

  return (
    <section
      id="contact"
      className="bg-[#FBFBF9] py-16 md:py-24 px-6 md:px-12 lg:px-24 font-body relative"
    >
      <div className="container-custom max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-stretch">
          {/* Left Side */}
          <div className="flex flex-col justify-between p-2 relative">
            <div className="space-y-6">
              <span className="text-[14px] md:text-[16px] uppercase tracking-[0.4em] text-[#C5A059] font-bold block">
                Connect With Us
              </span>
              <h2 className="font-serif text-3xl md:text-5xl lg:text-5xl text-[#1C1C1C] leading-[1.1] tracking-tight">
                Let your soul <br />
                <span className="font-light text-4xl md:text-7xl text-[#C5A059]">
                  Find its Scent
                </span>
              </h2>

              <div className="space-y-4 text-[#636363] max-w-md leading-relaxed text-base md:text-lg font-light">
                <p>
                  At Roohra, we believe every person has a unique story that
                  deserves to be told through fragrance.
                </p>
              </div>
            </div>

            {/* Social Icons Section - Added isolation */}
            <div className="mt-12 lg:mt-0 relative z-[999]">
              <p className="text-[10px] uppercase tracking-widest text-[#C5A059] mb-4 font-bold">
                Follow Our Journey
              </p>
              <div className="flex gap-4 isolate">
                <SocialIcon
                  url={socialLinks.instagram}
                  icon={<FiInstagram />}
                  label="Instagram"
                />
                <SocialIcon
                  url={socialLinks.whatsapp}
                  icon={<FiMessageCircle />}
                  label="WhatsApp"
                />
                <SocialIcon
                  url={socialLinks.tiktok}
                  icon={<FaTiktok />}
                  label="TikTok"
                />
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="bg-[#F3F2EE] p-8 md:p-12 lg:p-14 rounded-[1.5rem] shadow-sm border border-[#C5A059]/20 flex flex-col justify-center relative z-10">
            <form ref={form} onSubmit={sendEmail} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Full Name"
                  name="from_name"
                  type="text"
                  placeholder="John Doe"
                />
                <InputField
                  label="Email Address"
                  name="from_email"
                  type="email"
                  placeholder="john@example.com"
                />
              </div>
              <InputField
                label="Subject"
                name="subject"
                type="text"
                placeholder="General Inquiry"
              />

              <div className="flex flex-col gap-3">
                <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#C5A059]">
                  Your Message
                </label>
                <textarea
                  name="message"
                  rows="5"
                  required
                  placeholder="How may we assist you today?"
                  className="bg-white border border-[#C5A059]/40 rounded-2xl p-5 text-sm outline-none focus:border-[#C5A059] transition-all"
                ></textarea>
              </div>

              <GoldButton type="submit" className="w-full">
                Send Inquiry
              </GoldButton>
              {status && (
                <p className="text-center text-[10px] font-bold text-[#C5A059] mt-4 uppercase tracking-widest">
                  {status}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

// Fixed SocialIcon Component
function SocialIcon({ url, icon, label }) {
  const handleClick = (e) => {
    e.preventDefault(); // Default behavior rokhne ke liye
    e.stopPropagation(); // Event bubbling (parent #contact tak jana) rokhne ke liye
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className="w-12 h-12 md:w-14 md:h-14 bg-white border border-[#EEECE7] rounded-full text-[#1C1C1C] flex items-center justify-center hover:bg-[#1C1C1C] hover:text-white transition-all duration-300 shadow-sm cursor-pointer relative z-[1000]"
      style={{ pointerEvents: "auto" }}
      aria-label={label}
    >
      <span className="text-xl pointer-events-none">{icon}</span>
    </button>
  );
}

function InputField({ label, name, type, placeholder }) {
  return (
    <div className="flex flex-col gap-3">
      <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#C5A059]">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required
        placeholder={placeholder}
        className="bg-white border border-[#C5A059]/40 rounded-xl px-6 py-4 text-sm outline-none focus:border-[#C5A059] transition-all"
      />
    </div>
  );
}
