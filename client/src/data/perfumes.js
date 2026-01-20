import berry1 from "../assets/perfumes/Berry_Blaze/image_1.jpeg";
import berry2 from "../assets/perfumes/Berry_Blaze/image_2.jpeg";
import berry3 from "../assets/perfumes/Berry_Blaze/image_3.jpeg";
import berry4 from "../assets/perfumes/Berry_Blaze/image_4.jpeg";

import dream1 from "../assets/perfumes/Dream_Drift/image_1.jpeg";
import dream2 from "../assets/perfumes/Dream_Drift/image_2.jpeg";
import dream3 from "../assets/perfumes/Dream_Drift/image_3.jpeg";
import dream4 from "../assets/perfumes/Dream_Drift/image_4.jpeg";

import rose1 from "../assets/perfumes/Rose_Fantasy/image_1.jpeg";
import rose2 from "../assets/perfumes/Rose_Fantasy/image_2.jpeg";
import rose3 from "../assets/perfumes/Rose_Fantasy/image_3.jpeg";
import rose4 from "../assets/perfumes/Rose_Fantasy/image_4.jpeg";

import wolf1 from "../assets/perfumes/Wolf_Empire/image_1.jpeg";
import wolf2 from "../assets/perfumes/Wolf_Empire/image_2.jpeg";
import wolf3 from "../assets/perfumes/Wolf_Empire/image_3.jpeg";
import wolf4 from "../assets/perfumes/Wolf_Empire/image_4.jpeg";

// ... (Keep your existing image imports at the top)

const perfumes = [
  {
    id: "dream-drift",
    name: "Dream Drift",
    price: 1500,
    discount: 10, // 10% OFF
    rating: 5,
    size: "50ml",
    category: "Oriental",
    shortDescription: "Warm, woody-oriental men’s fragrance...",
    images: [dream1, dream2, dream3, dream4],
    // ... (rest of data)
  },
  {
    id: "Wolf-Empire",
    name: "Wolf Empire",
    price: 2000,
    discount: 0, // No discount
    rating: 4,
    size: "50ml",
    category: "Woody Spicy",
    shortDescription: "Bold, energetic and irresistible.",
    images: [wolf1, wolf2, wolf3, wolf4],
  },
  {
    id: "Berry-Blaze",
    name: "Berry Blaze",
    price: 1800,
    discount: 15, // 15% OFF
    rating: 3,
    size: "50ml",
    category: "Fruity Floral",
    shortDescription: "Sweet, vibrant and irresistible.",
    images: [berry1, berry2, berry3, berry4],
  },
  {
    id: "Rose-Fantasy",
    name: "Rose Fantasy",
    price: 2100,
    discount: 10, // 5% OFF
    rating: 5,
    size: "50ml",
    category: "Floral Fruity",
    shortDescription: "Elegant, romantic and feminine.",
    images: [rose1, rose2, rose3, rose4],
  },
];

export default perfumes;
