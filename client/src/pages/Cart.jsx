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
          <GoldButton onClick={() => (window.location.href = "/shop")}>
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
          {/* LEFT: PRODUCT LIST */}
          <div className="w-full lg:w-[65%] space-y-4 md:space-y-6">
            <AnimatePresence>
              {cartItems.map((item) => {
                const unitPrice = item.discount
                  ? Math.round(item.price - (item.price * item.discount) / 100)
                  : item.price;
                const rowTotal = unitPrice * item.quantity;

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="relative bg-white rounded-xl md:rounded-2xl p-4 md:p-8 shadow-md border-2 border-gold/10 flex flex-row items-center gap-4 md:gap-8"
                  >
                    {/* DELETE ICON */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="absolute top-2 right-2 text-grey/30 hover:text-red-600 transition-all p-1 z-20"
                    >
                      <FiTrash2 size={18} className="md:w-[22px] md:h-[22px]" />
                    </button>

                    {/* Image Section */}
                    <div className="w-20 h-28 sm:w-28 sm:h-36 md:w-40 md:h-48 flex-shrink-0 overflow-hidden rounded-lg md:rounded-xl bg-[#F3F2EE] border border-gold/5 relative">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      {item.discount > 0 && (
                        <div className="absolute top-0 left-0 bg-red-500 text-white text-[7px] md:text-[9px] font-black px-1.5 md:px-3 py-1 rounded-br-lg z-10 uppercase tracking-tighter">
                          {item.discount}% OFF
                        </div>
                      )}
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 flex flex-col justify-between self-stretch py-1">
                      <div>
                        <h3 className="font-serif text-lg md:text-3xl text-grey tracking-tight leading-none">
                          {item.name}
                        </h3>
                        <p className="text-[8px] md:text-[11px] uppercase tracking-widest text-gold font-bold italic">
                          {item.category}
                        </p>
                      </div>

                      {/* Math Section */}
                      <div className="flex justify-between items-end mt-4">
                        {/* UNIT PRICE COLUMN */}
                        <div className="flex flex-col">
                          <span className="text-[7px] md:text-[9px] uppercase font-black text-grey/30 mb-0.5">
                            Unit
                          </span>
                          <span className="font-bold text-grey text-sm md:text-lg leading-none tracking-tighter">
                            Rs.{unitPrice}
                          </span>
                          {item.discount > 0 && (
                            <span className="text-[9px] md:text-[11px] text-red-500/50 line-through mt-0.5">
                              Rs.{item.price}
                            </span>
                          )}
                        </div>

                        {/* QUANTITY & TOTAL STACKED COLUMN */}
                        <div className="flex flex-col items-end gap-2 md:gap-3">
                          {/* Qty Box (Smaller) */}
                          <div className="flex flex-col items-end">
                            <span className="text-[7px] md:text-[9px] uppercase font-black text-grey/30 mb-0.5">
                              Quantity
                            </span>
                            <div className="flex items-center justify-between border border-gold/30 rounded md:rounded-lg px-1 md:px-2 py-0.5 bg-[#FBFBF9] w-[60px] md:w-[90px]">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="hover:text-gold transition-colors"
                              >
                                <FiMinus size={10} />
                              </button>
                              <span className="font-bold text-[10px] md:text-sm">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="hover:text-gold transition-colors"
                              >
                                <FiPlus size={10} />
                              </button>
                            </div>
                          </div>

                          {/* Total Box (Larger) */}
                          <div className="flex flex-col items-end border-t border-gold/10 pt-1 md:pt-2 w-full">
                            <span className="text-[7px] md:text-[9px] uppercase font-black text-grey/30 mb-0.5 tracking-widest">
                              Total
                            </span>
                            <span className="text-sm md:text-[20px] font-black text-grey tracking-tighter leading-none">
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

          {/* RIGHT: SUMMARY (STICKY) */}
          <div className="w-full lg:w-[35%] bg-gold/30 rounded-1xl md:rounded-2xl p-6 md:p-10 shadow-xl border-2 border-gold/20 lg:sticky lg:top-32">
            <h2 className="font-serif text-2xl md:text-3xl text-grey mb-6">
              Summary
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs md:text-sm uppercase tracking-widest text-grey/50">
                <span>Subtotal</span>
                <span className="font-bold text-grey">
                  Rs. {subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs md:text-sm border-b border-gold/5 pb-4 uppercase tracking-widest text-grey/50">
                <span>Delivery</span>
                <span className="font-bold text-grey">
                  Rs. {deliveryCharges}
                </span>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="font-serif text-lg md:text-xl text-grey">
                  Grand Total
                </span>
                <span className="text-xl md:text-[20px] font-black text-grey tracking-tighter">
                  Rs. {(subtotal + deliveryCharges).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="pt-6">
              <GoldButton
                onClick={() => navigate("/order")}
                className="w-full !py-3 md:!py-3.5 !text-[10px] md:!text-xs uppercase tracking-widest flex items-center justify-center bg-white"
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
