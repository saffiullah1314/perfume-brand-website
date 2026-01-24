import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]); // Database Products
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const deliveryCharges = 150;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // --- Fetch Products from Backend ---
  const getProductsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        // Mapping backend keys to match your frontend logic
        const formatted = response.data.products.map((item) => ({
          ...item,
          id: item._id, // Taake link (/product/id) na tootay
          images: item.image, // Backend 'image' array ko 'images' mein convert kiya
        }));
        setProducts(formatted);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  // Add to Cart Logic
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const isItemInCart = prevItems.find((item) => item.id === product.id);
      if (isItemInCart) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, amount) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item,
      ),
    );
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => {
    const price = item.discount
      ? item.price - (item.price * item.discount) / 100
      : item.price;
    return acc + price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        products,
        addToCart,
        updateQuantity,
        removeFromCart,
        subtotal,
        deliveryCharges,
        token,
        setToken,
        backendUrl,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
