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

  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.19, 1, 0.22, 1],
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section
      id="contact"
      className="bg-[#FBFBF9] py-16 md:py-24 px-6 md:px-12 lg:px-24 font-body"
    >
      <div className="container-custom max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          /* items-stretch ensures the left and right cards have equal height on desktop */
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-stretch"
        >
          {/* Left Side: Editorial Typography */}
          <div className="flex flex-col justify-between p-2">
            <div className="space-y-6">
              <span className="text-[14px] md:text-[16px] uppercase tracking-[0.4em] text-[#C5A059] font-bold">
                Connect With Us
              </span>
              <h2 className="font-serif text-3xl md:text-5xl lg:text-5xl text-[#1C1C1C] leading-[1.1] tracking-tight">
                Let your soul <br />
                <span className="font-light text-4xl md:text-7xl text-[#C5A059]">
                  Find its Scent
                </span>
              </h2>

              {/* Extra context for perfect vertical alignment */}
              <div className="space-y-4 text-[#636363] max-w-md leading-relaxed text-base md:text-lg font-light">
                <p>
                  At Roohra, we believe every person has a unique story that
                  deserves to be told through fragrance. Our master artisans are
                  ready to help you discover a scent that truly represents who
                  you are.
                </p>
                <p>
                  Whether you have a question about our collections or you want
                  to design something completely new, we are here to provide an
                  exclusive and luxury experience.
                </p>
              </div>
            </div>

            {/* Social Icons - Positioned at the bottom of the left column on desktop */}
            <div className="mt-8 lg:mt-0">
              <p className="text-[10px] uppercase tracking-widest text-[#C5A059] mb-4 font-bold">
                Follow Our Journey
              </p>
              <div className="flex gap-4">
                <SocialIcon
                  href={socialLinks.instagram}
                  icon={<FiInstagram />}
                  label="Instagram"
                />
                <SocialIcon
                  href={socialLinks.whatsapp}
                  icon={<FiMessageCircle />}
                  label="WhatsApp"
                />
                <SocialIcon
                  href={socialLinks.tiktok}
                  icon={<FaTiktok />}
                  label="TikTok"
                />
              </div>
            </div>
          </div>

          {/* Right Side: The Masterwork Form */}
          <motion.div
            variants={containerVariants}
            className="bg-[#fffdf6] p-8 md:p-12 lg:p-14 rounded-[1.5rem] shadow-[0_30px_90px_rgba(0,0,0,0.04)] border border-gold flex flex-col justify-center"
          >
            <form
              ref={form}
              onSubmit={sendEmail}
              className="space-y-6 lg:space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
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
                  className="bg-[#FCFBFA] border border-gold/40 rounded-2xl p-5 text-sm text-[#1C1C1C] focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all duration-500 placeholder:text-[#C2C2C2] resize-none hover:border-gold"
                ></textarea>
              </div>

              <div className="mt-2">
                <GoldButton type="submit" className="w-full">
                  Send Inquiry
                </GoldButton>
              </div>

              {status && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-[10px] font-bold text-[#C5A059] uppercase tracking-[0.2em] mt-4"
                >
                  {status}
                </motion.p>
              )}
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
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
        className="bg-[#FCFBFA] border border-gold/40 rounded-xl px-6 py-4 text-sm text-[#1C1C1C] focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all duration-500 placeholder:text-[#C2C2C2] hover:border-gold"
      />
    </div>
  );
}

function SocialIcon({ href, icon, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-12 h-12 md:w-14 md:h-14 bg-white border border-[#EEECE7] rounded-full text-[#1C1C1C] flex items-center justify-center hover:bg-[#1C1C1C] hover:text-white hover:border-[#1C1C1C] transition-all duration-700 shadow-sm"
      aria-label={label}
    >
      <span className="text-lg">{icon}</span>
    </a>
  );
}
