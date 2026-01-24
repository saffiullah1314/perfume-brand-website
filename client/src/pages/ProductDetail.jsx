import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AiFillStar, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { CartContext } from "../context/CartContext";
import GoldButton from "../components/GoldButton";
import { toast } from "react-hot-toast";
import { FiMinus, FiPlus } from "react-icons/fi";

export default function ProductDetail() {
  const { id } = useParams();
  const { products, addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [imgIndex, setImgIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Ab ye direct CartContext ke products array se find karega
    const foundProduct = products.find((p) => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
    }
    window.scrollTo(0, 0);
  }, [id, products]);

  if (!product)
    return (
      <div className="h-screen flex items-center justify-center font-serif italic text-grey/60">
        Finding the Essence...
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
    toast.success(`${quantity} x ${product.name} added to bag`);
  };

  return (
    <div className="bg-[#FBFBF9] min-h-screen pt-24 pb-20 font-body">
      {/* ... Baki ka UI code same rahega jo aapne bheja tha ... */}
      <div className="container-custom px-6 md:px-12 lg:px-24 mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          <div className="w-full lg:w-1/2 space-y-8">
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
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              <button
                onClick={prevImg}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg z-10"
              >
                <AiOutlineLeft size={20} />
              </button>
              <button
                onClick={nextImg}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg z-10"
              >
                <AiOutlineRight size={20} />
              </button>
            </div>
            {/* Thumbnails */}
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setImgIndex(i)}
                  className={`w-20 h-24 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${imgIndex === i ? "border-gold" : "border-transparent opacity-50"}`}
                >
                  <img src={img} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
          {/* Details Column */}
          <div className="w-full lg:w-1/2 space-y-8">
            <span className="text-gold text-[12px] uppercase tracking-[0.4em] font-black">
              Inspired by {product.inspiredBy}
            </span>
            <h1 className="font-serif text-5xl md:text-7xl text-[#1A1A1A] tracking-tighter font-bold">
              {product.name}
            </h1>
            <div className="text-4xl md:text-5xl font-black text-[#1A1A1A]">
              Rs. {discountedPrice.toLocaleString()}
            </div>
            <p className="text-[#222] leading-relaxed text-lg font-medium text-justify">
              {product.description}
            </p>
            {/* Olfactory Notes UI (Mapping from dynamic data) */}
            <div className="flex flex-col gap-8 py-8 border-y-2 border-gold/5">
              <NoteSection title="Top Notes" notes={product.notes?.top || []} />
              <NoteSection
                title="Heart Notes"
                notes={product.notes?.heart || []}
              />
              <NoteSection
                title="Base Notes"
                notes={product.notes?.base || []}
              />
            </div>
            <GoldButton onClick={handleAddToCart} className="w-full !py-4">
              Add to Bag
            </GoldButton>
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
