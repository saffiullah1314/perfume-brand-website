import { motion } from "framer-motion";
import { FiTruck, FiShield, FiClock, FiDroplet } from "react-icons/fi";
import backgroundImage from "../../assets/Why_Choose_Us.jpg";

export default function WhyChooseUs() {
  const benefits = [
    {
      icon: <FiShield />,
      title: "Cash on Delivery",
      desc: "Pay when your order arrives available across Pakistan.",
    },
    {
      icon: <FiClock />,
      title: "Lasts 7–8 Hours",
      desc: "Crafted with premium oils for long lasting fragrance.",
    },
    {
      icon: <FiDroplet />,
      title: "Hand Crafted Fragrances",
      desc: "Artisanally blended using the finest ingredients.",
    },
    {
      icon: <FiTruck />,
      title: "Nationwide Delivery",
      desc: "Reliable and secure shipping across Pakistan.",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center py-20 px-4 overflow-hidden">
      {/* 1. Full-width Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      {/* 2. Centered Elegant White Box */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 bg-white/95 backdrop-blur-sm w-full max-w-5xl rounded-[1rem] shadow-2xl p-8 md:p-16 lg:p-20 flex flex-col items-center"
      >
        {/* Section Heading */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-serif text-3xl md:text-4xl text-grey tracking-wide mb-4">
            Why Choose Our Fragrances
          </h2>
          <div className="w-16 h-1 bg-gold mx-auto opacity-50" />
        </div>

        {/* 3. Four Benefit Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-12 w-full ">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col items-center text-center group"
            >
              <div className="text-3xl text-gold mb-5 p-4 rounded-full bg-gold/5 group-hover:bg-gold/10 transition-colors duration-300">
                {benefit.icon}
              </div>
              <h3 className="font-serif text-xl text-grey mb-3 font-medium">
                {benefit.title}
              </h3>
              <p className="font-body text-sm text-grey/60 leading-relaxed max-w-[250px]">
                {benefit.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
