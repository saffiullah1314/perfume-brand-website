import React from "react";
import { motion } from "framer-motion";
import perfumes from "../data/perfumes";
import ProductCard from "../components/ProductCard";

export default function Shop() {
  return (
    <div className="bg-[#FBFBF9] min-h-screen pt-32 pb-24 px-6 md:px-12 lg:px-24 font-body">
      <div className="container-custom mx-auto">
        {/* Alignment Fixed: 'items-end' ko 'items-start' se badla gaya hai */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-20 gap-8">
          <div className="max-w-2xl text-left">
            {" "}
            {/* Force left alignment */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[12px] uppercase tracking-[0.4em] text-gold font-bold mb-4 block"
            >
              Artisanal Fragrances
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-5xl md:text-8xl text-[#1C1C1C] tracking-tighter leading-none"
            >
              The <span className="text-gold font-light ">Collection</span>
            </motion.h1>
          </div>

          {/* Item counter - mobile par left align rahega, desktop par right */}
          <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#1C1C1C]/40 text-left md:text-right w-full md:w-auto">
            Selected Creations / {perfumes.length.toString().padStart(2, "0")}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
          {perfumes.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
        {/* Footer Context for Upcoming Products */}
        <div className="mt-32 text-center border-t border-gold/10 pt-16">
          {/* Editorial Coming Soon Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-40 pt-20 border-t border-gold/10 text-center space-y-8"
          >
            <div className="flex justify-center items-center gap-4 mb-2">
              <div className="h-[1px] w-12 bg-gold/30"></div>
              <span className="text-[10px] uppercase tracking-[0.6em] text-gold font-bold">
                The Future of Roohra
              </span>
              <div className="h-[1px] w-12 bg-gold/30"></div>
            </div>

            {/* Updated Heading with Easy and Unique English */}
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-grey/40 italic leading-tight">
              More signature scents <br className="hidden md:block" />
              are on the{" "}
              <span className="text-gold/40 underline decoration-gold/20 underline-offset-8">
                way.
              </span>
            </h2>

            <p className="text-[#636363]/50 text-xs md:text-sm font-light tracking-[0.1em] max-w-lg mx-auto leading-relaxed">
              Our artisans are currently blending new masterpieces in our
              private library. Something unique is coming to your collection
              soon.
            </p>

            {/* Elegant Divider Line */}
            <div className="pt-4">
              <div className="w-1 h-12 bg-gradient-to-b from-gold/40 to-transparent mx-auto"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
