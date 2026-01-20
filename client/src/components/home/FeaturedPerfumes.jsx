import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AiFillStar } from "react-icons/ai"; // Star icon
import perfumes from "../../data/perfumes";

export default function FeaturedPerfumes() {
  const featuredList = perfumes.slice(0, 4);

  return (
    <section className="bg-[#F9F7F2] py-16 md:py-24">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="font-serif text-3xl md:text-4xl text-grey tracking-wide">
            Curated Masterpieces
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
          {featuredList.map((perfume) => (
            <PerfumeCard key={perfume.id} perfume={perfume} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PerfumeCard({ perfume }) {
  const navigate = useNavigate();

  // Logic to calculate discounted price
  const hasDiscount = perfume.discount > 0;
  const discountedPrice = hasDiscount
    ? perfume.price - perfume.price * (perfume.discount / 100)
    : perfume.price;

  // Rating Stars Logic
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <AiFillStar
        key={index}
        className={index < rating ? "text-orange-400" : "text-gray-300"}
        size={14}
      />
    ));
  };

  return (
    <motion.div
      whileHover={{ y: -10 }}
      onClick={() => navigate(`/product/${perfume.id}`)}
      className="bg-white p-5 shadow-sm cursor-pointer flex flex-col items-center text-center group relative overflow-hidden transition-all hover:shadow-2xl rounded-lg"
    >
      {/* Discount Badge */}
      {hasDiscount && (
        <div className="absolute top-4 left-4 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-md z-10">
          {perfume.discount}% OFF
        </div>
      )}

      {/* Image Container */}
      <div className="w-full aspect-[4/5] overflow-hidden rounded-2xl mb-5 bg-[#1A1A1A]">
        <motion.img
          src={perfume.images[0]}
          alt={perfume.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      {/* Product Info */}
      <h3 className="font-body font-bold text-grey text-md uppercase tracking-widest mb-1">
        {perfume.name}
      </h3>

      {/* Ratings */}
      <div className="flex gap-0.5 mb-3">{renderStars(perfume.rating)}</div>

      {/* Price Section */}
      <div className="mb-6">
        {hasDiscount ? (
          <div className="flex flex-col items-center">
            <span className="text-red-500 line-through text-xs opacity-70">
              Rs. {perfume.price.toLocaleString()}
            </span>
            <span className="text-black font-bold text-lg">
              Rs. {discountedPrice.toLocaleString()}
            </span>
          </div>
        ) : (
          <span className="text-black font-bold text-lg">
            Rs. {perfume.price.toLocaleString()}
          </span>
        )}
      </div>

      <button className="bg-grey text-white px-8 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all hover:bg-gold hover:text-grey">
        View Details
      </button>
    </motion.div>
  );
}
