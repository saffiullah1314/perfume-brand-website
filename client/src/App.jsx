import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import "./index.css";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import CustomPerfume from "./pages/CustomPerfume";
import TrackOrder from "./pages/TrackOrder";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import { CartProvider } from "./context/CartContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <CartProvider>
      <Toaster position="bottom-right" reverseOrder={false} />
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/custom-perfume" element={<CustomPerfume />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </MainLayout>
    </CartProvider>
  );
}

export default App;
