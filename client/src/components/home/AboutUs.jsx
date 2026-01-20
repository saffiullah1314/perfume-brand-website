import { motion } from "framer-motion";
import {
  FiTarget,
  FiEye,
  FiHeart,
  FiAward,
  FiClock,
  FiCheckCircle,
} from "react-icons/fi";
import boxImage from "../../assets/about/about2.png";
import roundImage from "../../assets/about/about1.png";

export default function AboutUs() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const roundImageVariants = {
    hidden: { opacity: 1, scale: 1, rotate: -50 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { duration: 1.5, ease: "easeOut" },
    },
  };

  return (
    <section
      id="about-section"
      className="bg-[#3f3f3f] py-16 md:py-32 overflow-hidden text-white font-body"
    >
      <div className="container-custom px-4 md:px-12">
        {/* 1. Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-24"
        >
          <h1 className="font-serif text-gold text-xl sm:text-3xl md:text-5xl  uppercase tracking-tighter whitespace-nowrap">
            Our Story <span className="text-white">&</span> Craft
          </h1>
          <div className="w-24 h-1 bg-gold mx-auto mt-4 opacity-40 rounded-full" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="flex flex-col gap-6 md:gap-10"
        >
          {/* FIRST ROW */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 items-stretch">
            {/* Box 1: Our Name */}
            <motion.div
              variants={itemVariants}
              className="group bg-white/5 p-8 md:p-12 rounded-[2.5rem] border border-white/10 flex flex-col justify-center shadow-lg transition-all duration-500 hover:border-gold/30"
            >
              {/* Unique Heading Design */}
              <div className="mb-8 relative w-fit">
                <span className="text-[10px] uppercase tracking-[0.3em] text-gold/60 font-bold block mb-2">
                  Heritage
                </span>
                <h2 className="text-white font-serif text-2xl md:text-3xl uppercase tracking-widest font-bold relative inline-block group-hover:text-gold transition-colors duration-300">
                  Our Name
                  <span className="absolute -bottom-2 left-0 w-1/2 h-[2px] bg-gold rounded-full group-hover:w-full transition-all duration-500"></span>
                </h2>
              </div>

              <div className="space-y-4 text-white/80 text-sm md:text-base leading-relaxed">
                <p>
                  ROOHRA comes from the word{" "}
                  <strong className="text-gold">"Rooh"</strong>, meaning soul.
                  We believe a fragrance is more than a scent it’s a reflection
                  of your soul, your mood, and your style.
                </p>
                <p>
                  We hand craft unique fragrances inspired by luxury brands. We
                  use premium ingredients to give you the same high quality
                  experience at an affordable price.
                </p>
              </div>
            </motion.div>

            {/* Box 2: Our Values */}
            <motion.div
              variants={itemVariants}
              className="group bg-black/20 p-8 md:p-12 rounded-[2.5rem] border border-white/10 relative shadow-2xl flex flex-col justify-center transition-all duration-500 hover:border-gold/30"
            >
              <motion.div
                variants={roundImageVariants}
                className="absolute -top-10 -right-2 md:-top-14 md:-right-4 z-20"
              >
                <div className="w-24 h-24 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-gold shadow-2xl transition-transform duration-500 group-hover:scale-105">
                  <img
                    src={roundImage}
                    alt="Roohra Round"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>

              {/* Unique Heading Design */}
              <div className="mb-10 relative w-fit">
                <span className="text-[10px] uppercase tracking-[0.3em] text-gold/60 font-bold block mb-2">
                  Philosophy
                </span>
                <h3 className="text-gold font-serif text-2xl md:text-3xl uppercase tracking-[0.2em] font-bold relative inline-block transition-all duration-300">
                  Our Values
                  <span className="absolute -bottom-2 left-0 w-1/2 h-[2px] bg-white rounded-full group-hover:bg-gold group-hover:w-full transition-all duration-500"></span>
                </h3>
              </div>

              <div className="space-y-6">
                <ValueItem
                  icon={<FiHeart />}
                  title="High Concentration"
                  desc="30-40% Oil for a richer, longer lasting scent."
                />
                <ValueItem
                  icon={<FiClock />}
                  title="7-8 Hours Lasting"
                  desc="Enjoy a noticeable fragrance throughout the day."
                />
                <ValueItem
                  icon={<FiAward />}
                  title="Premium Quality"
                  desc="Premium ingredients for true-to-original performance."
                />
                <ValueItem
                  icon={<FiCheckCircle />}
                  title="Affordable Luxury"
                  desc="Same luxury experience at a low budget."
                />
              </div>
            </motion.div>
          </div>

          {/* ... Rest of the code (Second Row & Statement of Style) remains the same ... */}
          {/* SECOND ROW */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 items-stretch">
            {/* [Keep your previous Second Row code here] */}
            <motion.div
              variants={itemVariants}
              className="w-full h-64 md:h-80 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-xl"
            >
              <img
                src={boxImage}
                alt="Craftsmanship"
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
              />
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 min-h-full"
            >
              <div className="group p-8 bg-white/5 rounded-[2.5rem] border border-white/10 flex flex-col items-center justify-center text-center shadow-lg hover:bg-white/10 transition-all duration-300">
                <FiEye className="text-gold text-3xl mb-4 transition-transform duration-300 group-hover:scale-125" />
                <h3 className="text-white uppercase font-bold text-xs tracking-widest mb-3">
                  Vision
                </h3>
                <p className="text-white/60 text-[11px] leading-relaxed">
                  To make luxury fragrance experiences accessible to everyone
                  without compromising on quality or performance.
                </p>
              </div>
              <div className="group p-8 bg-white/5 rounded-[2.5rem] border border-white/10 flex flex-col items-center justify-center text-center shadow-lg hover:bg-white/10 transition-all duration-300">
                <FiTarget className="text-gold text-3xl mb-4 transition-transform duration-300 group-hover:scale-125" />
                <h3 className="text-white uppercase font-bold text-xs tracking-widest mb-3">
                  Mission
                </h3>
                <p className="text-white/60 text-[11px] leading-relaxed">
                  To bring you the essence, performance, and elegance of world
                  famous perfumes at an affordable price.
                </p>
              </div>
            </motion.div>
          </div>

          {/* 3. Statement of Style */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-center mt-6"
          >
            <div className="max-w-3xl bg-white/5 py-8 px-12 rounded-[2rem] border border-gold/10 text-center shadow-inner group hover:border-gold/40 transition-all duration-500">
              <h4 className="font-serif text-gold text-xl md:text-2xl italic mb-3">
                A Statement of Style
              </h4>
              <p className="text-white/50 text-xs md:text-sm leading-relaxed mx-auto max-w-xl">
                Roohra ensures your presence is felt before you speak. Luxury is
                now part of your daily ritual.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ValueItem Component remains same
function ValueItem({ icon, title, desc }) {
  return (
    <div className="flex gap-4 items-start group cursor-default">
      <div className="text-gold text-xl mt-1 shrink-0 transition-all duration-300 group-hover:scale-125 group-hover:brightness-125">
        {icon}
      </div>
      <div className="flex flex-col text-left">
        <h4 className="text-white font-bold text-[10px] md:text-xs uppercase tracking-widest mb-0.5 transition-colors duration-300 group-hover:text-gold">
          {title}
        </h4>
        <p className="text-white/40 text-[11px] leading-snug">{desc}</p>
      </div>
    </div>
  );
}
