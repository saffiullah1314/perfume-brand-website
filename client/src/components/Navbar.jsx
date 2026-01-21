import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.png";
import { FiShoppingCart, FiMenu, FiX, FiUser } from "react-icons/fi";
import AuthModal from "./AuthModal";
import { useCart } from "../context/CartContext";

function Navbar() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Animation variants for the Desktop Navbar on Load
  const navVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className="bg-grey sticky top-0 z-[100] w-full"
    >
      <div className="container-custom">
        <div className="flex items-center justify-between py-1 md:py-2">
          {/* Logo */}
          <img src={logo} alt="Perfume Brand Logo" className="h-12 w-auto" />

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 font-body text-gold text-lg">
            <NavLinks />
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center gap-4">
            {/* Profile Icon (New) */}
            <button
              onClick={() => setIsAuthOpen(true)} // Modal kholne ke liye
              className="text-gold hover:text-lightText transition text-2xl"
            >
              <FiUser />
            </button>

            {/* Cart Icon */}
            <NavLink to="/cart" className="relative text-gold text-2xl">
              <FiShoppingCart />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                  {totalItems}
                </span>
              )}
            </NavLink>

            {/* Hamburger Button (Mobile Only) */}
            <button
              onClick={toggleMenu}
              className="text-gold text-3xl md:hidden z-[110] relative"
            >
              {isOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay & Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* 1. Dark Blurred Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] md:hidden"
            />

            {/* 2. Right-side Small Menu Panel */}
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-screen w-64 bg-grey z-[100] shadow-2xl flex flex-col p-8 pt-24 gap-6 font-body text-gold text-xl md:hidden"
            >
              <NavLinks onClick={() => setIsOpen(false)} />
            </motion.nav>
          </>
        )}
      </AnimatePresence>
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </motion.header>
  );
}

function NavLinks({ onClick }) {
  const links = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Custom Perfume", path: "/custom-perfume" },
    { name: "Track Order", path: "/track-order" },
    { name: "Contact", path: "#contact-section" }, // Updated path to the ID
  ];

  return (
    <>
      {links.map((link) => {
        // Check if it's the Contact link to use an anchor tag
        if (link.name === "Contact") {
          return (
            <a
              key={link.name}
              href={link.path}
              onClick={onClick}
              className="relative w-fit hover:text-lightText transition-colors duration-300 border-b-2 border-transparent hover:border-gold pb-1 md:pb-0 cursor-pointer"
            >
              {link.name}
            </a>
          );
        }

        // Standard NavLink for other pages
        return (
          <NavLink
            key={link.path}
            to={link.path}
            onClick={onClick}
            className="relative w-fit hover:text-lightText transition-colors duration-300 border-b-2 border-transparent hover:border-gold pb-1 md:pb-0"
          >
            {link.name}
          </NavLink>
        );
      })}
    </>
  );
}

export default Navbar;
