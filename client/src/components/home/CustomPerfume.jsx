import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../../assets/customize.jpg";
// 1. Import your reusable GoldButton component
import GoldButton from "../GoldButton";

export default function CustomPerfume() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
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
    <section className="relative w-full h-[500px] md:h-[700px] overflow-hidden flex items-center justify-center text-center px-4">
      {/* Background with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[2000ms] hover:scale-110"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-brightness-75" />
      </div>

      <div className="container-custom relative z-10 max-w-4xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Main Heading */}
          <motion.h2
            variants={itemVariants}
            className="font-serif text-3xl md:text-5xl lg:text-6xl text-gold mb-4 md:mb-6 tracking-tight"
          >
            Create Your Own <br />
            <span className="italic font-light text-white text-3xl md:text-6xl">
              Signature Scent
            </span>
          </motion.h2>

          {/* Body Content */}
          <motion.p
            variants={itemVariants}
            className="font-body text-lightText text-s md:text-lg leading-relaxed max-w-xs md:max-w-2xl mx-auto mb-8 md:mb-10 opacity-80"
          >
            Experience the art of bespoke perfumery. Collaborate with our master
            blenders to design a fragrance that is uniquely yours. From
            selecting premium base oils to fine-tuning the concentration levels
            and choosing your bottle style every detail is crafted to reflect
            your personal statement.
          </motion.p>

          <motion.div variants={itemVariants}>
            {/* 2. Replaced the manual button code with your GoldButton component */}
            <GoldButton onClick={() => navigate("/custom-perfume")}>
              Request Custom Perfume
            </GoldButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
