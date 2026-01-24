import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AiFillStar } from "react-icons/ai";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext"; // Path context ke mutabiq check karlein

export default function FeaturedPerfumes() {
  const { products } = useContext(CartContext);
  const navigate = useNavigate();

  // Logic: Pehle Best Sellers dikhao, agar wo nahi hain toh latest 4 products dikhao
  const featuredList = products.filter((item) => item.bestSeller).slice(0, 4);
  const displayList =
    featuredList.length > 0 ? featuredList : products.slice(0, 4);

  return (
    <section className="bg-[#F9F7F2] py-16 md:py-24">
      <div className="container-custom px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="font-serif text-2xl md:text-4xl text-grey tracking-wide uppercase font-bold">
            Curated Masterpieces
          </h2>
          <div className="h-1 w-20 bg-gold mx-auto mt-4"></div>
        </motion.div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {displayList.map((perfume) => (
            <PerfumeCard key={perfume.id} perfume={perfume} />
          ))}
        </div>

        {/* Shop All Button for UX */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate("/shop")}
            className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold border-b border-gold pb-1 hover:text-grey hover:border-grey transition-all"
          >
            Explore Full Collection
          </button>
        </div>
      </div>
    </section>
  );
}

function PerfumeCard({ perfume }) {
  const navigate = useNavigate();

  const hasDiscount = perfume.discount > 0;
  const discountedPrice = hasDiscount
    ? perfume.price - perfume.price * (perfume.discount / 100)
    : perfume.price;

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <AiFillStar
        key={index}
        className={index < rating ? "text-orange-400" : "text-gray-300"}
        size={10}
      />
    ));
  };

  return (
    <motion.div
      whileHover={{ y: -10 }}
      onClick={() => navigate(`/product/${perfume.id}`)}
      className="bg-white p-3 md:p-5 shadow-sm cursor-pointer flex flex-col items-center text-center group relative overflow-hidden transition-all hover:shadow-2xl rounded-xl border border-gold/5"
    >
      {/* Discount Badge */}
      {hasDiscount && (
        <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-red-500 text-white text-[8px] md:text-[10px] font-black px-1.5 py-0.5 md:px-2 md:py-1 rounded-md z-10 uppercase">
          {perfume.discount}%
        </div>
      )}

      {/* Image Container */}
      <div className="w-full aspect-[4/5] overflow-hidden rounded-lg md:rounded-2xl mb-3 md:mb-5 bg-[#1A1A1A]">
        <motion.img
          src={perfume.images[0]} // Database ki images array se pehli image
          alt={perfume.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      {/* Info Section */}
      <h3 className="font-body font-bold text-grey text-[10px] md:text-sm uppercase tracking-widest mb-1 truncate w-full px-1">
        {perfume.name}
      </h3>

      <div className="flex gap-0.5 mb-2 md:mb-3">
        {renderStars(perfume.rating)}
      </div>

      <div className="mb-4 md:mb-6">
        {hasDiscount ? (
          <div className="flex flex-col items-center leading-tight">
            <span className="text-red-500 line-through text-[10px] md:text-xs opacity-70">
              Rs.{perfume.price}
            </span>
            <span className="text-black font-black text-sm md:text-lg">
              Rs.{Math.round(discountedPrice)}
            </span>
          </div>
        ) : (
          <span className="text-black font-black text-sm md:text-lg">
            Rs.{perfume.price}
          </span>
        )}
      </div>

      <button className="w-full md:w-auto bg-grey text-white px-3 md:px-8 py-2 md:py-2.5 rounded-full text-[9px] md:text-[11px] font-bold uppercase tracking-widest transition-all hover:bg-gold hover:text-grey">
        View
      </button>
    </motion.div>
  );
}
