import React from "react";

export default function GoldButton({
  children,
  onClick,
  className = "",
  type = "button",
}) {
  return (
    <button
      type={type}
      // Agar onClick nahi hai toh e.stopPropagation() chalaye taake form submission clear rahay
      onClick={onClick ? onClick : (e) => e.stopPropagation()}
      className={`relative border border-gold px-6 py-2.5 md:px-10 md:py-4 text-gold uppercase tracking-[0.2em] rounded-md text-[10px] md:text-xs font-bold overflow-hidden transition-all duration-500 hover:text-black [&:hover>div]:translate-y-0 ${className}`}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-gold translate-y-full transition-transform duration-500 ease-out pointer-events-none" />
    </button>
  );
}
