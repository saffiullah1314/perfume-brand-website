import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AiFillStar, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import perfumes from "../data/perfumes";
import { useCart } from "../context/CartContext";
import GoldButton from "../components/GoldButton";
import { toast } from "react-hot-toast";
import { FiMinus, FiPlus } from "react-icons/fi";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [imgIndex, setImgIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const foundProduct = perfumes.find((p) => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
    }
    window.scrollTo(0, 0);
  }, [id]);

  if (!product)
    return (
      <div className="h-screen flex items-center justify-center font-serif italic text-grey/60">
        Loading...
      </div>
    );

  const hasDiscount = product.discount > 0;
  const discountedPrice = hasDiscount
    ? Math.round(product.price - (product.price * product.discount) / 100)
    : product.price;

  const nextImg = () =>
    setImgIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  const prevImg = () =>
    setImgIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast.success(`${quantity} x ${product.name} added to bag`, {
      style: {
        background: "#1A1A1A",
        color: "#C5A059",
        border: "1px solid #C5A059",
        fontSize: "12px",
      },
    });
  };

  return (
    <div className="bg-[#FBFBF9] min-h-screen pt-24 pb-20 font-body">
      {/* Luxury Header */}
      <div className="w-full py-10 border-b border-gold/10 text-center mb-10">
        <h2 className="font-serif text-sm md:text-lg uppercase tracking-[0.6em] text-grey font-light">
          Perfume Detail
        </h2>
      </div>

      <div className="container-custom px-6 md:px-12 lg:px-24 mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          {/* LEFT COLUMN: IMAGES + BUTTONS */}
          <div className="w-full lg:w-1/2 space-y-8">
            {/* Main Image with Scroll Buttons */}
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#F3F2EE] border-2 border-gold/5 shadow-xl group">
              {hasDiscount && (
                <div className="absolute top-0 left-0 bg-red-600 text-white text-[11px] font-black px-4 py-2 rounded-br-xl z-20">
                  {product.discount}% OFF
                </div>
              )}

              <AnimatePresence mode="wait">
                <motion.img
                  key={imgIndex}
                  src={product.images[imgIndex]}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              <button
                onClick={prevImg}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg hover:bg-gold hover:text-white transition-all z-10"
              >
                <AiOutlineLeft size={20} />
              </button>
              <button
                onClick={nextImg}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg hover:bg-gold hover:text-white transition-all z-10"
              >
                <AiOutlineRight size={20} />
              </button>
            </div>

            {/* Thumbnail Boxes */}
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setImgIndex(i)}
                  className={`w-20 h-24 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${imgIndex === i ? "border-gold scale-95 shadow-md" : "border-transparent opacity-50"}`}
                >
                  <img src={img} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* ACTION SECTION (Quantity + Add to Bag - Left Aligned) */}
            <div className="space-y-4 pt-4 border-t border-gold/10">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] uppercase font-black text-[#1A1A1A] tracking-[0.2em]">
                  Select Quantity
                </span>
                <div className="flex items-center border-2 border-gold/20 rounded-lg px-4 py-2 bg-white w-24 justify-between">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-grey"
                  >
                    <FiMinus size={14} />
                  </button>
                  <span className="font-bold text-sm text-[#1A1A1A]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-grey"
                  >
                    <FiPlus size={14} />
                  </button>
                </div>
              </div>

              <GoldButton
                onClick={handleAddToCart}
                className="w-full !py-4 !text-[11px] font-black tracking-[0.3em]"
              >
                Add to Bag
              </GoldButton>
            </div>
          </div>

          {/* RIGHT COLUMN: DETAILS */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="border-b border-gold/10 pb-6">
              <span className="text-gold text-[12px] uppercase tracking-[0.4em] font-black">
                Inspired by {product.inspiredBy}
              </span>
              <h1 className="font-serif text-5xl md:text-7xl text-[#1A1A1A] tracking-tighter mt-4 leading-none font-bold">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mt-6">
                <div className="flex text-orange-400">
                  {[...Array(5)].map((_, i) => (
                    <AiFillStar
                      key={i}
                      size={18}
                      className={i < product.rating ? "" : "text-gray-200"}
                    />
                  ))}
                </div>
                <span className="text-[#1A1A1A] font-black text-xs uppercase tracking-widest">
                  | {product.category}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-baseline gap-4">
                <span className="text-4xl md:text-5xl font-black text-[#1A1A1A] tracking-tighter">
                  Rs. {discountedPrice.toLocaleString()}
                </span>
                {hasDiscount && (
                  <span className="text-xl text-red-600/60 line-through font-bold">
                    Rs. {product.price.toLocaleString()}
                  </span>
                )}
              </div>
              <span className="text-gold text-[10px] uppercase font-bold tracking-widest">
                {product.size} - Extrait de Parfum
              </span>
            </div>

            <p className="text-[#222] leading-relaxed text-lg font-medium opacity-90 text-justify">
              {product.description}
            </p>

            {/* Olfactory Notes */}
            <div className="flex flex-col gap-8 py-8 border-y-2 border-gold/5">
              <NoteSection title="Top Notes" notes={product.notes.top} />
              <NoteSection title="Heart Notes" notes={product.notes.heart} />
              <NoteSection title="Base Notes" notes={product.notes.base} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NoteSection({ title, notes }) {
  return (
    <div className="flex flex-col gap-3">
      <h4 className="text-[11px] uppercase tracking-[0.2em] font-black text-[#1A1A1A]">
        {title}
      </h4>
      <div className="flex flex-wrap gap-2">
        {notes.map((note, i) => (
          <span
            key={i}
            className="text-sm text-[#333] font-bold italic border-l-2 border-gold/40 pl-3 py-0.5"
          >
            {note}
          </span>
        ))}
      </div>
    </div>
  );
}
