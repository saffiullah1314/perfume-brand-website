import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../../assets/hero.jpg";
// 1. Import your new reusable GoldButton component
import GoldButton from "../GoldButton";

export default function Hero() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="relative h-[90vh] md:h-screen w-full overflow-hidden flex items-end pb-48">
      {/* Background Image Container */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat brightness-50"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-black/90 via-black/40 to-transparent" />
      </div>

      <div className="container-custom relative z-10 px-6 md:px-16 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-xl text-left"
        >
          <motion.h1
            variants={itemVariants}
            className="font-serif text-2xl md:text-4xl text-lightText leading-tight tracking-wide"
          >
            The Essence of <br />
            <span className="font-bold text-3xl text text-gold md:text-5xl">
              Timeless Elegance
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="font-body text-lightText text-sm md:text-base mt-4 max-w-xs md:max-w-md leading-relaxed opacity-80"
          >
            Hand crafted in Pakistan using premium oils sourced globally.
            Fragrances that linger long after you leave the room.
          </motion.p>

          <motion.div variants={itemVariants} className="mt-8">
            {/* 2. Using the imported GoldButton with the shop navigation */}
            <GoldButton onClick={() => navigate("/shop")}>
              Shop the Collection
            </GoldButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
