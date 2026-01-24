import { motion } from "framer-motion";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

export default function Shop() {
  const { products } = useContext(CartContext);

  return (
    <div className="bg-[#FBFBF9] min-h-screen pt-32 pb-24 px-6 md:px-12 lg:px-24 font-body">
      <div className="container-custom mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-20 gap-8">
          <div className="max-w-2xl text-left">
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

          <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#1C1C1C]/40 text-left md:text-right w-full md:w-auto">
            Selected Creations / {products.length.toString().padStart(2, "0")}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
          {products.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}

          {/* Luxury Coming Soon Card */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="border border-dashed border-black rounded-[2rem] flex flex-col items-center justify-center p-12 text-center bg-gold/[0.02] min-h-[400px]"
          >
            <div className="w-16 h-16 mb-6 rounded-full border border-black flex items-center justify-center">
              <div className="w-2 h-2 bg-black rounded-full animate-pulse" />
            </div>
            <h3 className="font-serif text-2xl text-grey/80 italic mb-2">
              Coming Soon...
            </h3>
            <p className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold max-w-[150px]">
              Our artisans are blending new masterpieces.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
