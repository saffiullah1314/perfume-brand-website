import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import GoldButton from "../components/GoldButton";
import { useNavigate } from "react-router-dom";

export default function PlaceOrder() {
  const { subtotal, deliveryCharges, cartItems } = useCart();
  const navigate = useNavigate(); // Navigation ke liye hook

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

  const onSubmitHandler = (event) => {
    event.preventDefault();

    // Yahan hum order ka data console mein save kar rahe hain (Backend ready)
    console.log("Order Data:", {
      items: cartItems,
      customer: formData,
      total: subtotal + deliveryCharges,
    });

    // 1. Alert hata kar seedha Success page par bhej rahe hain
    navigate("/success");
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="bg-white min-h-screen pt-32 pb-20 px-4 sm:px-12 lg:px-24 font-body"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
        {/* LEFT SIDE: DELIVERY INFORMATION */}
        <div className="w-full lg:w-[60%] space-y-8">
          <div className="border-b-2 border-gold pb-4 text-left">
            <h2 className="font-serif text-3xl md:text-5xl text-grey tracking-tight font-bold">
              Shipping Details
            </h2>
            <p className="text-gold text-[11px] uppercase tracking-[0.2em] font-black mt-2 italic">
              Refining your delivery experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputGroup
              label="First Name"
              placeholder="First name"
              name="firstName"
              value={formData.firstName}
              onChange={onChangeHandler}
              required
            />
            <InputGroup
              label="Last Name"
              placeholder="Last name"
              name="lastName"
              value={formData.lastName}
              onChange={onChangeHandler}
              required
            />
          </div>

          <InputGroup
            label="Email Address"
            type="email"
            placeholder="example@email.com"
            name="email"
            value={formData.email}
            onChange={onChangeHandler}
            required
          />
          <InputGroup
            label="Street / House Number"
            placeholder="House #, Street name, Area"
            name="street"
            value={formData.street}
            onChange={onChangeHandler}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputGroup
              label="City"
              placeholder="e.g. Lahore"
              name="city"
              value={formData.city}
              onChange={onChangeHandler}
              required
            />
            <InputGroup
              label="Province"
              placeholder="e.g. Punjab"
              name="state"
              value={formData.state}
              onChange={onChangeHandler}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputGroup
              label="Zip Code"
              placeholder="e.g. 54000"
              name="zipCode"
              value={formData.zipCode}
              onChange={onChangeHandler}
              required
            />
            <div className="flex flex-col gap-2">
              <label className="text-[11px] uppercase font-bold text-grey/80 tracking-widest text-left">
                Country
              </label>
              <input
                readOnly
                value="Pakistan"
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-5 py-3.5 text-grey font-bold cursor-not-allowed"
              />
              <span className="text-[9px] text-gold font-bold italic text-left">
                * Delivery in Pakistan only.
              </span>
            </div>
          </div>

          <InputGroup
            label="Phone Number"
            type="tel"
            placeholder="03XXXXXXXXX"
            name="phone"
            value={formData.phone}
            onChange={onChangeHandler}
            required
          />
        </div>

        {/* RIGHT SIDE: SUMMARY & PAYMENT */}
        <div className="w-full lg:w-[40%] space-y-10 lg:sticky lg:top-32">
          <div className="bg-[#FBFBF9] p-8 md:p-10 rounded-3xl shadow-sm border border-gray-200">
            <h3 className="font-serif text-3xl text-grey mb-8 border-b border-gold/20 pb-4 font-bold">
              Order Totals
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between text-sm tracking-widest text-grey/70 uppercase font-bold">
                <span>Subtotal</span>
                <span>Rs. {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm tracking-widest text-grey/70 uppercase font-bold border-b border-gray-100 pb-4">
                <span>Delivery</span>
                <span>Rs. {deliveryCharges}</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="font-serif text-xl text-grey italic">
                  Grand Total
                </span>
                <span className="text-2xl font-black text-gold tracking-tighter">
                  Rs. {(subtotal + deliveryCharges).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-200">
            <h3 className="font-serif text-3xl text-grey mb-8 font-bold text-center underline decoration-gold/30">
              Payment
            </h3>
            <label className="flex items-center gap-4 border border-gray-300 p-5 rounded-2xl cursor-pointer hover:border-gold transition-all">
              <input
                type="radio"
                name="payment"
                defaultChecked
                className="accent-gold w-5 h-5"
              />
              <div className="flex flex-col">
                <span className="text-sm font-black text-grey uppercase tracking-widest">
                  Cash on Delivery
                </span>
                <span className="text-[10px] text-grey/50 font-bold italic uppercase">
                  Pay at your doorstep
                </span>
              </div>
            </label>
            <div className="pt-8">
              <GoldButton
                type="submit"
                className="w-full !py-5 !text-[11px] uppercase tracking-[0.4em] font-black shadow-lg"
              >
                Complete Purchase
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
    <div className="flex flex-col gap-2 w-full">
      <label className="text-[11px] uppercase font-bold text-grey/80 tracking-widest text-left">
        {label}
      </label>
      <input
        {...props}
        className="w-full bg-white border border-gray-300 rounded-xl px-5 py-3.5 text-sm md:text-base outline-none focus:border-gold transition-all placeholder:text-gray-300 text-grey font-medium shadow-sm"
      />
    </div>
  );
}
