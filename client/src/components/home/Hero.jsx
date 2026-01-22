import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../../assets/hero.jpg";
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
    <section className="relative h-screen w-full overflow-hidden flex items-center md:items-end md:pb-32">
      {/* Background Image Container */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat brightness-[0.65] md:brightness-75"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {/* Gradient Overlay - Mobile par thora dark rakha hai taake text nazar aaye */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent md:bg-gradient-to-tr" />
      </div>

      <div className="container-custom relative z-10 px-6 md:px-16 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl text-left" /* Content start se align hai */
        >
          {/* H1: Mobile par size barha diya (text-4xl) */}
          <motion.h1
            variants={itemVariants}
            className="font-serif text-3xl md:text-5xl  text-lightText leading-[1.1] tracking-tight"
          >
            The Essence of <br />
            <span className="font-bold text-4xl md:text-6xl text-gold mt-2 block">
              Timeless Elegance
            </span>
          </motion.h1>

          {/* Paragraph: Mobile par readability behtar ki */}
          <motion.p
            variants={itemVariants}
            className="font-body text-lightText text-lg md:text-xl mt-6 max-w-sm md:max-w-md leading-relaxed opacity-90"
          >
            Hand crafted in Pakistan using premium oils sourced globally.
            Fragrances that linger long after you leave.
          </motion.p>

          <motion.div variants={itemVariants} className="mt-10">
            {/* Button: Mobile par padding aur text barha diya */}
            <GoldButton
              onClick={() => navigate("/shop")}
              className="!px-12 !py-5 !text-[12px] md:!text-[12px] tracking-[0.3em]"
            >
              Shop the Collection
            </GoldButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
