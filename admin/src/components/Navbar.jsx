import React, { useState } from "react";
import {
  IoNotificationsOutline,
  IoSettingsOutline,
  IoMenuOutline,
  IoCloseOutline,
} from "react-icons/io5";

const Navbar = ({ setToken, orderCount = 3 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const playNotificationSound = () => {
    const audio = new Audio(
      "https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3",
    );
    audio.play();
  };

  return (
    <nav className="bg-[#cbc3a3] sticky top-0 z-[100] border-b border-black/10 shadow-sm">
      <div className="max-w-[1440px] mx-auto flex items-center h-20 px-6 sm:px-[6%] md:px-[8%] justify-between">
        {/* Brand Identity */}
        <div className="group cursor-pointer z-[110]">
          <h1 className="text-xl sm:text-2xl font-serif tracking-[0.2em] font-light text-black transition-all duration-500">
            ROOHRA
          </h1>
          <div className="h-[1px] w-0 group-hover:w-full bg-black transition-all duration-700"></div>
          <p className="text-[7px] sm:text-[9px] tracking-[0.3em] text-white uppercase mt-1 font-medium">
            Maison de Parfum
          </p>
        </div>

        {/* Desktop Menu (Visible on MD and larger) */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-5">
            <div className="relative p-2 rounded-full hover:bg-white/20 transition-colors cursor-pointer group">
              <IoSettingsOutline
                size={22}
                className="text-black/70 group-hover:rotate-90 transition-transform duration-500"
              />
            </div>

            <div
              onClick={playNotificationSound}
              className="relative p-2 rounded-full hover:bg-white/20 transition-colors cursor-pointer group"
            >
              <IoNotificationsOutline
                size={22}
                className="text-black/70 group-hover:scale-110 transition-transform"
              />
              {orderCount > 0 && (
                <span className="absolute top-2.5 right-2.5 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600 shadow-sm"></span>
                </span>
              )}
            </div>
          </div>

          <button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => setToken("")}
            className="relative overflow-hidden border border-black px-8 py-2 transition-all duration-500"
          >
            <span
              className={`relative z-10 text-[10px] tracking-[0.2em] uppercase font-medium transition-colors duration-500 ${isHovered ? "text-white" : "text-black"}`}
            >
              Logout
            </span>
            <div
              className={`absolute top-0 left-0 h-full bg-black transition-all duration-500 ${isHovered ? "w-full" : "w-0"}`}
            ></div>
          </button>
        </div>

        {/* Mobile Toggle Icons (Visible on Mobile only) */}
        <div className="md:hidden flex items-center gap-5 z-[110]">
          <div
            onClick={playNotificationSound}
            className="relative cursor-pointer"
          >
            <IoNotificationsOutline size={26} className="text-black" />
            {orderCount > 0 && (
              <span className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-red-600 rounded-full border-2 border-[#cbc3a3]"></span>
            )}
          </div>
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="text-black focus:outline-none"
          >
            {mobileMenu ? (
              <IoCloseOutline size={32} />
            ) : (
              <IoMenuOutline size={32} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Clean Slide-down/Slide-in Effect) */}
      <div
        className={`fixed inset-0 bg-[#f8f5f0] z-[105] flex flex-col transition-all duration-500 ease-in-out ${mobileMenu ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-10">
          <p className="text-black/30 text-[10px] tracking-[0.8em] uppercase font-serif">
            Main Menu
          </p>

          <div className="flex flex-col items-center gap-8">
            <button
              onClick={() => {
                setMobileMenu(false); /* Add Navigation Logic here */
              }}
              className="text-2xl font-serif tracking-widest text-black hover:text-[#cbc3a3] transition-colors"
            >
              DASHBOARD
            </button>
            <button
              onClick={() => {
                setMobileMenu(false); /* Add Navigation Logic here */
              }}
              className="text-2xl font-serif tracking-widest text-black hover:text-[#cbc3a3] transition-colors"
            >
              PRODUCTS
            </button>
            <button
              onClick={() => {
                setMobileMenu(false); /* Add Navigation Logic here */
              }}
              className="text-2xl font-serif tracking-widest text-black hover:text-[#cbc3a3] transition-colors"
            >
              ORDERS
            </button>
          </div>

          <div className="w-16 h-[1px] bg-black/10 my-4"></div>

          <button
            onClick={() => {
              setMobileMenu(false);
              setToken("");
            }}
            className="bg-black text-white px-12 py-3 text-xs tracking-[0.3em] font-medium shadow-xl active:scale-95 transition-transform"
          >
            LOGOUT
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
