import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { IoCloudUploadOutline, IoCheckmarkCircle } from "react-icons/io5";

const Add = ({ token }) => {
  const [images, setImages] = useState([false, false, false, false]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("0");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Top Rated");
  const [bestSeller, setBestSeller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(false);

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
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("discount", discount);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestSeller", bestSeller);
      formData.append("sizes", JSON.stringify(sizes));

      images.forEach((img, index) => {
        if (img) formData.append(`image${index + 1}`, img);
      });

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } },
      );

      if (response.data.success) {
        toast.success("Product Crafted & Added Successfully!");
        setName("");
        setDescription("");
        setPrice("");
        setDiscount("0");
        setImages([false, false, false, false]);
        setSizes([]);
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
    <div className="animate-fade-in pb-20 md:pb-10 ">
      <div className="flex flex-col gap-1 mb-8">
        <h2 className="text-2xl font-serif tracking-widest text-black uppercase">
          Add New Masterpiece
        </h2>
        <div className="h-[2px] w-12 bg-[#cbc3a3]"></div>
      </div>

      <form
        onSubmit={onSubmitHandler}
        className="max-w-[900px] flex flex-col gap-8"
      >
        {/* Luxury Image Upload Section */}
        <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-100">
          <p className="text-xs tracking-widest uppercase mb-4 font-medium text-gray-500">
            Product Visuals
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {images.map((img, index) => (
              <label
                key={index}
                htmlFor={`image${index + 1}`}
                className="group relative aspect-square border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:border-[#cbc3a3] transition-all overflow-hidden"
              >
                {img ? (
                  <img
                    className="w-full h-full object-cover"
                    src={URL.createObjectURL(img)}
                    alt=""
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-gray-400 group-hover:text-[#cbc3a3]">
                    <IoCloudUploadOutline size={24} />
                    <span className="text-[10px] tracking-tighter">UPLOAD</span>
                  </div>
                )}
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

        {/* Product Details Section */}
        <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-100 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-xs tracking-widest uppercase font-medium text-gray-500">
              Fragrance Identity
            </p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="w-full px-4 py-3 border-b border-gray-200 focus:border-black outline-none transition-all font-serif text-lg"
              type="text"
              placeholder="Perfume Name (e.g. Royal Oud)"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-xs tracking-widest uppercase font-medium text-gray-500">
              Story & Notes
            </p>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              className="w-full px-4 py-3 border border-gray-100 focus:border-black outline-none transition-all min-h-[120px] bg-gray-50/30"
              placeholder="Describe the soul of this fragrance..."
              required
            />
          </div>
        </div>

        {/* Pricing & Classification */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-100 flex flex-col gap-4">
            <p className="text-xs tracking-widest uppercase font-medium text-gray-500">
              Classification
            </p>
            <div className="grid grid-cols-2 gap-4">
              <select
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-3 border border-gray-100 outline-none text-sm bg-gray-50"
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Unisex">Unisex</option>
              </select>
              <select
                onChange={(e) => setSubCategory(e.target.value)}
                className="w-full p-3 border border-gray-100 outline-none text-sm bg-gray-50"
              >
                <option value="Top Rated">Top Rated</option>
                <option value="Luxury">Luxury</option>
                <option value="Casual">Casual</option>
              </select>
            </div>
          </div>

          <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-100 flex flex-col gap-4">
            <p className="text-xs tracking-widest uppercase font-medium text-gray-500">
              Pricing Strategy
            </p>
            <div className="grid grid-cols-2 gap-4">
              <input
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                className="w-full p-3 border border-gray-100 outline-none text-sm"
                type="Number"
                placeholder="Price (Rs)"
                required
              />
              <input
                onChange={(e) => setDiscount(e.target.value)}
                value={discount}
                className="w-full p-3 border border-gray-100 outline-none text-sm"
                type="Number"
                placeholder="Discount %"
              />
            </div>
          </div>
        </div>

        {/* Sizes & Boutique Features */}
        <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <p className="text-xs tracking-widest uppercase font-medium text-gray-500 mb-4">
              Available Sizes
            </p>
            <div className="flex gap-3">
              {["50ml", "100ml", "150ml"].map((item) => (
                <div
                  key={item}
                  onClick={() =>
                    setSizes((prev) =>
                      prev.includes(item)
                        ? prev.filter((s) => s !== item)
                        : [...prev, item],
                    )
                  }
                  className={`px-4 py-2 cursor-pointer border text-xs tracking-widest transition-all duration-300 ${sizes.includes(item) ? "bg-black text-white" : "bg-white text-black hover:border-black"}`}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div
            className="flex items-center gap-3 group cursor-pointer"
            onClick={() => setBestSeller((prev) => !prev)}
          >
            <div
              className={`w-5 h-5 border flex items-center justify-center transition-all ${bestSeller ? "bg-black border-black" : "border-gray-300"}`}
            >
              {bestSeller && <IoCheckmarkCircle className="text-white" />}
            </div>
            <p className="text-xs tracking-widest uppercase font-medium text-gray-600">
              Mark as Best Seller
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full md:w-max px-20 py-4 bg-black text-white text-xs tracking-[0.3em] uppercase hover:bg-gray-800 transition-all shadow-xl disabled:bg-gray-400"
        >
          {loading ? "Crafting..." : "Publish Masterpiece"}
        </button>
      </form>
    </div>
  );
};

export default Add;
