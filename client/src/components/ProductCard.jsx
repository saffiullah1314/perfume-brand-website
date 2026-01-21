import React from "react";
import { motion } from "framer-motion";
import { AiFillStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import GoldButton from "./GoldButton";
import { useCart } from "../context/CartContext";
import { toast } from "react-hot-toast"; // Professional notification library

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const hasDiscount = product.discount > 0;
  const discountedPrice = hasDiscount
    ? Math.round(product.price - (product.price * product.discount) / 100)
    : product.price;

  // Star Rating Logic
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <AiFillStar
        key={index}
        className={index < rating ? "text-orange-400" : "text-gray-300"}
        size={14}
      />
    ));
  };

  // Professional Notification Function
  const handleAddToCart = (e) => {
    e.stopPropagation(); // Card navigation ko rokne ke liye

    addToCart(product);

    // Luxury Styled Toast
    toast.success(`${product.name} added to bag`, {
      duration: 2500,
      position: "bottom-right",
      style: {
        border: "1px solid #C5A059",
        padding: "16px",
        color: "#C5A059",
        background: "#1A1A1A",
        fontSize: "12px",
        fontWeight: "bold",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        borderRadius: "4px",
      },
      iconTheme: {
        primary: "#C5A059",
        secondary: "#1A1A1A",
      },
    });
  };

  return (
    <div className="bg-white p-5 shadow-sm flex flex-col items-center text-center group relative overflow-hidden transition-all hover:shadow-2xl rounded-lg font-body border border-gold/5">
      {/* Discount Badge */}
      {hasDiscount && (
        <div className="absolute top-4 left-4 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-md z-10">
          {product.discount}% OFF
        </div>
      )}

      {/* Image Container */}
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

      {/* Info Section */}
      <h3 className="font-bold text-grey text-md uppercase tracking-widest mb-1">
        {product.name}
      </h3>
      <p className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-bold mb-2">
        {product.category}
      </p>

      <div className="flex gap-0.5 mb-3">{renderStars(product.rating)}</div>

      {/* Price Section */}
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

      {/* Add To Cart Action */}
      <div className="w-full">
        <GoldButton
          className="w-full !py-3 !text-[10px] uppercase tracking-widest"
          onClick={handleAddToCart}
        >
          Add To Cart
        </GoldButton>
      </div>
    </div>
  );
}
