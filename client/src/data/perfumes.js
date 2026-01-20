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

const perfumes = [
  {
    id: "dream-drift",
    name: "Dream Drift",
    inspiredBy: "Dunhill Desire",
    price: 1500,
    discount: 10,
    rating: 5,
    size: "50ml",
    category: "Amber Woody",
    shortDescription: "A seductive, warm, and masculine masterpiece.",
    description:
      "Dream Drift is a classic scent that balances fresh citrus with warm vanilla and teak wood. Inspired by the legendary Dunhill Desire, it captures the spirit of confidence and desire. It opens with an energetic burst of apple and neroli, leading to a heart of rose and patchouli, and settling into a long-lasting, sophisticated base of vanilla and musk.",
    notes: {
      top: ["Apple", "Neroli", "Bergamot", "Lemon"],
      heart: ["Rose", "Patchouli", "Teak Wood"],
      base: ["Vanilla", "Musk", "Labdanum"],
    },
    images: [dream1, dream2, dream3, dream4],
  },
  {
    id: "wolf-empire",
    name: "Wolf Empire",
    inspiredBy: "Azzaro Wanted",
    price: 2000,
    discount: 0,
    rating: 5,
    size: "50ml",
    category: "Woody Spicy",
    shortDescription: "Bold, energetic, and irresistible dominance.",
    description:
      "Inspired by Azzaro Wanted, Wolf Empire is designed for the man who dares to live life to the fullest. It is a powerful blend of spicy ginger and fresh lemon, followed by an aromatic heart of juniper. The fragrance finishes with the intense warmth of Tonka bean, making it a perfect choice for those who want to dominate every room they enter.",
    notes: {
      top: ["Lemon", "Ginger", "Lavender", "Mint"],
      heart: ["Guatemalan Cardamom", "Juniper", "Apple"],
      base: ["Haitian Vetiver", "Tonka Bean", "Amberwood"],
    },
    images: [wolf1, wolf2, wolf3, wolf4],
  },
  {
    id: "berry-blaze",
    name: "Berry Blaze",
    inspiredBy: "Victoria's Secret Berry Spill",
    price: 1800,
    discount: 15,
    rating: 4,
    size: "50ml",
    category: "Fruity Floral",
    shortDescription: "Vibrant, sweet, and playfully seductive.",
    description:
      "Berry Blaze is a sweet celebration of life, inspired by the playful spirit of Victoria's Secret fruity collections. It features a delicious mix of juicy red berries and delicate floral undertones. This scent is light, refreshing, and perfect for the woman who wants to feel vibrant and energetic throughout the day.",
    notes: {
      top: ["Wild Strawberry", "Raspberry", "Blackberry"],
      heart: ["Jasmine", "Lily of the Valley"],
      base: ["Soft Musk", "Vanilla Bean", "Sugared Woods"],
    },
    images: [berry1, berry2, berry3, berry4],
  },
  {
    id: "rose-fantasy",
    name: "Rose Fantasy",
    inspiredBy: "Gucci Flora (Gorgeous Gardenia)",
    price: 2100,
    discount: 10,
    rating: 5,
    size: "50ml",
    category: "Floral",
    shortDescription: "Elegant, romantic, and purely feminine.",
    description:
      "Inspired by the timeless Gucci Flora, Rose Fantasy is a romantic journey through a blooming garden. It centers around the enchanting white gardenia and absolute jasmine. The fragrance is sweetened by a touch of brown sugar and pear blossom, creating a delicate yet long-lasting floral trail that is both modern and incredibly feminine.",
    notes: {
      top: ["Pear Blossom", "Red Berries", "Italian Mandarin"],
      heart: ["White Gardenia", "Jasmine", "Frangipani"],
      base: ["Brown Sugar", "Patchouli"],
    },
    images: [rose1, rose2, rose3, rose4],
  },
];

export default perfumes;
