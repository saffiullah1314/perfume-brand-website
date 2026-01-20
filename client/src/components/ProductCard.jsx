import React from "react";
import { motion } from "framer-motion";
import { AiFillStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import GoldButton from "./GoldButton";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  const hasDiscount = product.discount > 0;
  const discountedPrice = hasDiscount
    ? Math.round(product.price - (product.price * product.discount) / 100)
    : product.price;

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <AiFillStar
        key={index}
        className={index < rating ? "text-orange-400" : "text-gray-300"}
        size={14}
      />
    ));
  };

  return (
    /* Main card: Yahan se hover shadows handle hongi lekin button ka hover nahi */
    <div className="bg-white p-5 shadow-sm flex flex-col items-center text-center group relative overflow-hidden transition-all hover:shadow-2xl rounded-lg font-body">
      {hasDiscount && (
        <div className="absolute top-4 left-4 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-md z-10">
          {product.discount}% OFF
        </div>
      )}

      {/* Image Container: Hover effect sirf image zoom tak mahdood hai */}
      <div
        className="w-full aspect-[4/5] overflow-hidden rounded-2xl mb-5 bg-[#1A1A1A] cursor-pointer"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <motion.img
          src={product.images[0]}
          alt={product.name}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full h-full object-cover"
        />
      </div>

      <h3 className="font-bold text-grey text-md uppercase tracking-widest mb-1">
        {product.name}
      </h3>
      <p className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-bold mb-2">
        {product.category}
      </p>

      <div className="flex gap-0.5 mb-3">{renderStars(product.rating)}</div>

      <div className="mb-6">
        {hasDiscount ? (
          <div className="flex flex-col items-center">
            <span className="text-red-500 line-through text-xs opacity-70">
              Rs. {product.price.toLocaleString()}
            </span>
            <span className="text-black font-bold text-lg">
              Rs. {discountedPrice.toLocaleString()}
            </span>
          </div>
        ) : (
          <span className="text-black font-bold text-lg">
            Rs. {product.price.toLocaleString()}
          </span>
        )}
      </div>

      <div className="w-full">
        {/* Fixed GoldButton: Ensure no group-hover classes are passed down */}
        <GoldButton
          className="w-full !py-3 !text-[10px] uppercase tracking-widest"
          onClick={(e) => {
            e.stopPropagation(); // Card ke click event ko rokne ke liye
            console.log("Added to cart", product.id);
          }}
        >
          Add To Cart
        </GoldButton>
      </div>
    </div>
  );
}
