import React, { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import GoldButton from "../components/GoldButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function PlaceOrder() {
  const {
    subtotal,
    deliveryCharges,
    cartItems,
    backendUrl,
    token,
    setCartItems,
  } = useContext(CartContext);
  const navigate = useNavigate();

  const [method, setMethod] = useState("cod"); // Default method COD

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "Pakistan",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];
      cartItems.map((item) => {
        const itemCopy = structuredClone(item);
        itemCopy.quantity = item.quantity;
        orderItems.push(itemCopy);
      });

      let orderData = {
        address: formData,
        items: orderItems,
        amount: subtotal + deliveryCharges,
      };

      // API Call
      const response = await axios.post(
        backendUrl + "/api/order/place",
        orderData,
        { headers: { token } },
      );

      if (response.data.success) {
        setCartItems([]); // Order ke baad cart khali
        toast.success("Order Placed Successfully!");

        // Success page par orderId bhej rahe hain taake user ko ID nazar aaye
        navigate("/success", { state: { orderId: response.data.orderId } });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        "Order process failed. Please check your connection or login.",
      );
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="bg-white min-h-screen pt-32 pb-20 px-4 sm:px-12 lg:px-24 font-body"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
        {/* LEFT SIDE: SHIPPING INFO */}
        <div className="w-full lg:w-[60%] space-y-8 text-left">
          <div className="border-b-2 border-gold pb-4">
            <h2 className="font-serif text-3xl md:text-5xl text-grey tracking-tight font-bold">
              Shipping Details
            </h2>
            <p className="text-gold text-[10px] uppercase tracking-[0.3em] font-bold mt-2">
              The Art of Handcrafted Delivery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputGroup
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={onChangeHandler}
              required
            />
            <InputGroup
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={onChangeHandler}
              required
            />
          </div>

          <InputGroup
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={onChangeHandler}
            required
          />
          <InputGroup
            label="Street / House Number"
            name="street"
            value={formData.street}
            onChange={onChangeHandler}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputGroup
              label="City"
              name="city"
              value={formData.city}
              onChange={onChangeHandler}
              required
            />
            <InputGroup
              label="Province / State"
              name="state"
              value={formData.state}
              onChange={onChangeHandler}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputGroup
              label="Zip Code"
              name="zipCode"
              value={formData.zipCode}
              onChange={onChangeHandler}
              required
            />
            <InputGroup
              label="Phone Number"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={onChangeHandler}
              required
            />
          </div>
        </div>

        {/* RIGHT SIDE: SUMMARY & PAYMENT */}
        <div className="w-full lg:w-[40%] space-y-8 lg:sticky lg:top-32">
          {/* TOTALS CARD */}
          <div className="bg-gold/30 p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="font-serif text-2xl text-grey mb-6 border-b border-gold/20 pb-4 font-bold uppercase tracking-widest text-left">
              Order Summary
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between text-sm uppercase font-bold text-grey/60">
                <span>Subtotal</span>
                <span>Rs. {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm uppercase font-bold text-grey/60 border-b border-gray-100 pb-4">
                <span>Delivery</span>
                <span>Rs. {deliveryCharges}</span>
              </div>
              <div className="flex justify-between items-center pt-2 font-serif text-xl">
                <span className="italic text-grey">Grand Total</span>
                <span className="text-2xl font-black text-black">
                  Rs. {(subtotal + deliveryCharges).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* PAYMENT METHOD CARD */}
          <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-lg">
            <h3 className="font-serif text-2xl text-grey mb-8 font-bold uppercase tracking-widest text-center decoration-gold/30 underline">
              Payment Method
            </h3>

            <div className="space-y-4">
              <div
                onClick={() => setMethod("cod")}
                className={`flex items-center gap-4 border p-4 rounded-2xl cursor-pointer transition-all ${method === "cod" ? "border-gold bg-gold/5 shadow-inner" : "border-gray-200"}`}
              >
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${method === "cod" ? "border-gold" : "border-gray-300"}`}
                >
                  {method === "cod" && (
                    <div className="w-2- h-2 bg-gold rounded-full"></div>
                  )}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-black text-grey uppercase tracking-widest">
                    Cash on Delivery
                  </span>
                  <span className="text-[9px] text-grey/40 font-bold italic uppercase">
                    Pay at your doorstep
                  </span>
                </div>
              </div>

              {/* Online Payment Disabled */}
              <div className="flex items-center gap-4 border border-gray-100 p-4 rounded-2xl cursor-not-allowed bg-gray-50 opacity-60 relative group">
                <div className="w-4 h-4 rounded-full border-2 border-gray-200"></div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-black text-gray-400 uppercase tracking-widest">
                    Online Payment
                  </span>
                  <span className="text-[9px] text-gold font-bold italic uppercase">
                    Coming Soon
                  </span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[8px] font-black bg-black text-white px-2 py-1 rounded">
                    NOT AVAILABLE
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <GoldButton
                type="submit"
                className="w-full !py-5 !text-[11px] uppercase tracking-[0.4em] font-black shadow-xl"
              >
                Confirm Order
              </GoldButton>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

function InputGroup({ label, ...props }) {
  return (
    <div className="flex flex-col gap-2 w-full text-left">
      <label className="text-[10px] md:text-[11px] uppercase font-bold text-grey/80 tracking-widest">
        {label}
      </label>
      <input
        {...props}
        className="w-full bg-white border border-gray-300 rounded-xl px-5 py-4 text-sm outline-none focus:border-gold transition-all text-grey font-medium shadow-sm placeholder:text-gray-300"
      />
    </div>
  );
}
