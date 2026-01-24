import React from "react";
import { useCart } from "../context/CartContext";
import { FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";
import GoldButton from "../components/GoldButton";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    subtotal,
    deliveryCharges,
  } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FBFBF9]">
        <div className="text-center space-y-4 font-body">
          <h2 className="font-serif text-3xl md:text-5xl text-grey/20 italic uppercase tracking-tighter">
            Bag is Empty
          </h2>
          <GoldButton onClick={() => navigate("/shop")}>
            Back to Shop
          </GoldButton>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FBFBF9] min-h-screen pt-24 md:pt-32 pb-20 px-4 sm:px-8 md:px-12 lg:px-24 font-body">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-serif text-3xl md:text-5xl text-grey mb-8 md:mb-12 tracking-tight text-left border-b border-gold/10 pb-4">
          Your Selection
        </h1>
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
          <div className="w-full lg:w-[65%] space-y-4 md:space-y-6">
            <AnimatePresence>
              {cartItems.map((item) => {
                const hasDiscount = item.discount > 0;
                const unitPrice = hasDiscount
                  ? Math.round(item.price - (item.price * item.discount) / 100)
                  : item.price;
                const rowTotal = unitPrice * item.quantity;

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="relative bg-white rounded-xl md:rounded-2xl p-4 md:p-8 shadow-md border-2 border-gold/10 flex flex-row items-center gap-4 md:gap-8"
                  >
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="absolute top-2 right-2 text-grey/30 hover:text-red-600 transition-all p-1 z-20"
                    >
                      <FiTrash2 size={18} />
                    </button>

                    {/* Image Section with Discount Badge */}
                    <div className="w-20 h-28 sm:w-28 sm:h-36 md:w-40 md:h-48 flex-shrink-0 overflow-hidden rounded-lg md:rounded-xl bg-[#F3F2EE] border border-gold/5 relative">
                      <img
                        src={item.image ? item.image[0] : item.images[0]}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      {hasDiscount && (
                        <div className="absolute top-0 left-0 bg-red-600 text-white text-[7px] md:text-[10px] font-black px-2 md:px-3 py-1 rounded-br-lg z-10 uppercase tracking-tighter shadow-md">
                          {item.discount}% OFF
                        </div>
                      )}
                    </div>

                    <div className="flex-1 flex flex-col justify-between self-stretch py-1">
                      <div>
                        <h3 className="font-serif text-lg md:text-3xl text-grey tracking-tight leading-none">
                          {item.name}
                        </h3>
                        <p className="text-[8px] md:text-[11px] uppercase tracking-widest text-gold font-bold italic mt-1">
                          {item.category}
                        </p>
                      </div>

                      <div className="flex justify-between items-end mt-4">
                        {/* PRICE COLUMN */}
                        <div className="flex flex-col">
                          <span className="text-[7px] md:text-[9px] uppercase font-black text-grey/30 mb-0.5 tracking-widest">
                            Unit Price
                          </span>
                          <div className="flex flex-col">
                            <span className="font-bold text-grey text-sm md:text-xl leading-none tracking-tighter">
                              Rs.{unitPrice.toLocaleString()}
                            </span>
                            {hasDiscount && (
                              <span className="text-[9px] md:text-[12px] text-red-500/50 line-through mt-1 font-medium">
                                Rs.{item.price.toLocaleString()}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* QUANTITY & TOTAL COLUMN */}
                        <div className="flex flex-col items-end gap-2">
                          <div className="flex items-center justify-between border border-gold/30 rounded md:rounded-lg px-1 md:px-2 py-0.5 bg-[#FBFBF9] w-[60px] md:w-[90px]">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="text-grey hover:text-gold transition-colors"
                            >
                              <FiMinus size={10} />
                            </button>
                            <span className="font-bold text-[10px] md:text-sm">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="text-grey hover:text-gold transition-colors"
                            >
                              <FiPlus size={10} />
                            </button>
                          </div>
                          <div className="text-right">
                            <span className="text-[7px] md:text-[9px] uppercase font-black text-grey/30 block mb-0.5 tracking-widest">
                              Subtotal
                            </span>
                            <span className="text-sm md:text-[22px] font-black text-grey leading-none tracking-tighter">
                              Rs.{rowTotal.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* SUMMARY SIDEBAR */}
          <div className="w-full lg:w-[35%] bg-gold/30 rounded-2xl p-6 md:p-10 shadow-xl border-2 border-gold/20 lg:sticky lg:top-32">
            <h2 className="font-serif text-2xl md:text-3xl text-grey mb-6 font-bold">
              Summary
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between text-xs md:text-sm uppercase tracking-widest text-grey/60 font-bold">
                <span>Subtotal</span>
                <span className="text-grey">
                  Rs. {subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-xs md:text-sm border-b border-gold/10 pb-4 uppercase tracking-widest text-grey/60 font-bold">
                <span>Delivery</span>
                <span className="text-grey">Rs. {deliveryCharges}</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="font-serif text-lg md:text-2xl text-grey italic">
                  Grand Total
                </span>
                <span className="text-xl md:text-3xl font-black text-grey tracking-tighter">
                  Rs. {(subtotal + deliveryCharges).toLocaleString()}
                </span>
              </div>
            </div>
            <div className="pt-8">
              <GoldButton
                onClick={() => navigate("/order")}
                className="w-full bg-white !py-4 font-black shadow-lg"
              >
                Proceed to Checkout
              </GoldButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
