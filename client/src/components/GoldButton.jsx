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
      onClick={onClick}
      className={`group relative border border-gold px-6 py-2.5 md:px-10 md:py-4 text-gold uppercase tracking-[0.2em] text-[10px] md:text-xs font-bold overflow-hidden transition-all duration-500 hover:text-black ${className}`}
    >
      <span className="relative z-10">{children}</span>
      {/* This is the sliding hover effect */}
      <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
    </button>
  );
}
