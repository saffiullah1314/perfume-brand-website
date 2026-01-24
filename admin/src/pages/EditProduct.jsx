import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";

const EditProduct = ({ token }) => {
  const { state } = useLocation(); // List page se jo data bheja tha wo yahan mil raha hai
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // States initialized with existing product data
  const [images, setImages] = useState([false, false, false, false]);
  const [name, setName] = useState(state?.name || "");
  const [inspiredBy, setInspiredBy] = useState(state?.inspiredBy || "");
  const [shortDescription, setShortDescription] = useState(
    state?.shortDescription || "",
  );
  const [description, setDescription] = useState(state?.description || "");
  const [price, setPrice] = useState(state?.price || "");
  const [discount, setDiscount] = useState(state?.discount || "0");
  const [category, setCategory] = useState(state?.category || "Amber Woody");
  const [subCategory, setSubCategory] = useState(state?.subCategory || "Men");
  const [rating, setRating] = useState(state?.rating || "5");
  const [size, setSize] = useState(state?.size || "50ml");
  const [bestSeller, setBestSeller] = useState(state?.bestSeller || false);

  // Olfactory Notes formatting for input (Array to String)
  const [topNotes, setTopNotes] = useState(state?.notes?.top?.join(", ") || "");
  const [heartNotes, setHeartNotes] = useState(
    state?.notes?.heart?.join(", ") || "",
  );
  const [baseNotes, setBaseNotes] = useState(
    state?.notes?.base?.join(", ") || "",
  );

  const handleImageChange = (index, file) => {
    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("id", state._id); // Zaroori hai product pehchanne ke liye
      formData.append("name", name);
      formData.append("inspiredBy", inspiredBy);
      formData.append("shortDescription", shortDescription);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("discount", discount);
      formData.append("rating", rating);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("size", size);
      formData.append("bestSeller", bestSeller);

      const notesObj = {
        top: topNotes.split(",").map((n) => n.trim()),
        heart: heartNotes.split(",").map((n) => n.trim()),
        base: baseNotes.split(",").map((n) => n.trim()),
      };
      formData.append("notes", JSON.stringify(notesObj));

      images.forEach((img, index) => {
        if (img) formData.append(`image${index + 1}`, img);
      });

      const response = await axios.post(
        backendUrl + "/api/product/update",
        formData,
        { headers: { token } },
      );

      if (response.data.success) {
        toast.success("Masterpiece Refined & Updated!");
        navigate("/list");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in pb-20 md:pb-10 px-4 md:px-0 bg-[#F9F9F7]">
      <div className="flex flex-col gap-1 mb-8">
        <h2 className="text-3xl font-serif tracking-widest text-[#1A1A1A] uppercase font-bold">
          Edit Masterpiece
        </h2>
        <div className="h-[3px] w-16 bg-[#C5A059]"></div>
      </div>

      <form
        onSubmit={onSubmitHandler}
        className="max-w-[1000px] flex flex-col gap-10 text-sm"
      >
        {/* Visuals Section - Previews Existing Images */}
        <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
          <p className="text-sm tracking-[0.2em] uppercase mb-6 font-bold text-[#1A1A1A]">
            Product Visuals{" "}
            <span className="text-gray-400 normal-case font-medium ml-2">
              (Click to change)
            </span>
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {images.map((img, index) => (
              <label
                key={index}
                htmlFor={`image${index + 1}`}
                className="group relative aspect-[4/5] border-2 border-dashed border-gray-400 flex flex-col items-center justify-center cursor-pointer hover:border-[#C5A059] transition-all overflow-hidden rounded-lg bg-gray-50"
              >
                {img ? (
                  <img
                    className="w-full h-full object-cover"
                    src={URL.createObjectURL(img)}
                    alt=""
                  />
                ) : (
                  <img
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                    src={state?.image[index]}
                    alt="existing"
                  />
                )}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                  <IoCloudUploadOutline size={24} className="text-white" />
                </div>
                <input
                  onChange={(e) => handleImageChange(index, e.target.files[0])}
                  type="file"
                  id={`image${index + 1}`}
                  hidden
                />
              </label>
            ))}
          </div>
        </div>

        {/* Identity & Story Section */}
        <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200 flex flex-col gap-8">
          <p className="text-sm tracking-[0.2em] uppercase font-bold text-[#1A1A1A]">
            Identity & Story
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase ml-1">
                Perfume Name
              </label>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="px-5 py-4 bg-white border-2 border-gray-300 rounded-lg text-black font-bold outline-none focus:border-[#C5A059] transition-all text-lg"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase ml-1">
                Inspired By
              </label>
              <input
                onChange={(e) => setInspiredBy(e.target.value)}
                value={inspiredBy}
                className="px-5 py-4 bg-white border-2 border-gray-300 rounded-lg text-black font-bold outline-none focus:border-[#C5A059] transition-all text-lg"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-gray-500 uppercase ml-1">
              Short Tagline
            </label>
            <input
              onChange={(e) => setShortDescription(e.target.value)}
              value={shortDescription}
              className="px-5 py-4 bg-white border-2 border-gray-300 rounded-lg text-black font-bold outline-none focus:border-[#C5A059] transition-all"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-gray-500 uppercase ml-1">
              Full Description
            </label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              className="px-5 py-4 bg-white border-2 border-gray-300 rounded-lg text-black font-bold outline-none focus:border-[#C5A059] transition-all min-h-[120px]"
              required
            />
          </div>
        </div>

        {/* Olfactory Notes Section */}
        <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
          <p className="text-sm tracking-[0.2em] uppercase font-bold text-[#1A1A1A] mb-6">
            Olfactory Notes
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase">
                Top Notes
              </label>
              <input
                onChange={(e) => setTopNotes(e.target.value)}
                value={topNotes}
                className="px-4 py-3 border-2 border-gray-400 rounded-lg text-black font-bold outline-none focus:border-[#C5A059]"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase">
                Heart Notes
              </label>
              <input
                onChange={(e) => setHeartNotes(e.target.value)}
                value={heartNotes}
                className="px-4 py-3 border-2 border-gray-400 rounded-lg text-black font-bold outline-none focus:border-[#C5A059]"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase">
                Base Notes
              </label>
              <input
                onChange={(e) => setBaseNotes(e.target.value)}
                value={baseNotes}
                className="px-4 py-3 border-2 border-gray-400 rounded-lg text-black font-bold outline-none focus:border-[#C5A059]"
                required
              />
            </div>
          </div>
        </div>

        {/* Pricing, Rating & Classification */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200 flex flex-col gap-6">
            <p className="text-[10px] tracking-[0.2em] uppercase font-bold text-gray-400">
              Pricing & Rating
            </p>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-[8px] font-bold uppercase text-gray-400">
                  Price
                </label>
                <input
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  type="Number"
                  className="w-full px-3 py-3 border-2 border-gray-400 rounded-lg text-black font-bold outline-none"
                  required
                />
              </div>
              <div>
                <label className="text-[8px] font-bold uppercase text-gray-400">
                  Discount%
                </label>
                <input
                  onChange={(e) => setDiscount(e.target.value)}
                  value={discount}
                  type="Number"
                  className="w-full px-3 py-3 border-2 border-gray-400 rounded-lg text-black font-bold outline-none"
                />
              </div>
              <div>
                <label className="text-[8px] font-bold uppercase text-gray-400">
                  Rating (1-5)
                </label>
                <input
                  onChange={(e) => setRating(e.target.value)}
                  value={rating}
                  type="Number"
                  min="1"
                  max="5"
                  className="w-full px-3 py-3 border-2 border-gray-400 rounded-lg text-black font-bold outline-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200 flex flex-col gap-6">
            <p className="text-[10px] tracking-[0.2em] uppercase font-bold text-gray-400">
              Classification
            </p>
            <div className="grid grid-cols-3 gap-4">
              <select
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                className="px-2 py-3 border-2 border-gray-400 rounded-lg text-black font-bold outline-none bg-white"
              >
                <option value="Amber Woody">Amber Woody</option>
                <option value="Floral">Floral</option>
                <option value="Woody Spicy">Woody Spicy</option>
                <option value="Fruity Floral">Fruity Floral</option>
              </select>
              <select
                onChange={(e) => setSubCategory(e.target.value)}
                value={subCategory}
                className="px-2 py-3 border-2 border-gray-400 rounded-lg text-black font-bold outline-none bg-white"
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Unisex">Unisex</option>
              </select>
              <select
                onChange={(e) => setSize(e.target.value)}
                value={size}
                className="px-2 py-3 border-2 border-gray-400 rounded-lg text-black font-bold outline-none bg-white"
              >
                <option value="50ml">50ml</option>
                <option value="100ml">100ml</option>
              </select>
            </div>
          </div>
        </div>

        {/* Update Button */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 md:flex-none px-24 py-5 bg-[#1A1A1A] text-white text-xs tracking-[0.4em] uppercase hover:bg-[#C5A059] hover:text-black transition-all duration-500 shadow-2xl rounded-full font-bold"
          >
            {loading ? "SAVING CHANGES..." : "UPDATE MASTERPIECE"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/list")}
            className="px-10 py-5 border-2 border-gray-300 text-black text-xs tracking-[0.4em] uppercase hover:bg-gray-100 transition-all rounded-full font-bold"
          >
            CANCEL
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
