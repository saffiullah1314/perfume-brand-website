import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { IoTrashOutline, IoPricetagOutline } from "react-icons/io5";

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    if (window.confirm("Are you sure you want to remove this masterpiece?")) {
      try {
        const response = await axios.post(
          backendUrl + "/api/product/remove",
          { id },
          { headers: { token } },
        );
        if (response.data.success) {
          toast.success("Item removed from catalog");
          await fetchList();
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="animate-fade-in pb-20">
      <div className="flex items-center justify-between mb-8">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-serif tracking-widest text-black uppercase">
            Fragrance Catalog
          </h2>
          <div className="h-[2px] w-12 bg-[#cbc3a3]"></div>
        </div>
        <p className="text-[10px] tracking-widest text-gray-400 uppercase">
          Total Items: {list.length}
        </p>
      </div>

      <div className="bg-white shadow-sm border border-gray-100 rounded-sm overflow-hidden">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1.5fr_1fr_1fr] items-center py-4 px-6 bg-gray-50 text-[10px] tracking-[0.2em] uppercase font-bold text-gray-500">
          <span>Essence</span>
          <span>Product Name</span>
          <span>Category</span>
          <span>Price</span>
          <span className="text-center">Action</span>
        </div>

        {/* Product Rows */}
        <div className="flex flex-col">
          {list.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1.5fr_1fr_1fr] items-center gap-4 py-4 px-6 border-b border-gray-50 hover:bg-gray-50/50 transition-all group"
            >
              <div className="relative w-16 h-16 overflow-hidden rounded-full border border-gray-100 shadow-inner">
                <img
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src={item.image[0]}
                  alt=""
                />
              </div>

              <div className="flex flex-col">
                <p className="text-sm font-serif tracking-wide text-black">
                  {item.name}
                </p>
                <p className="text-[9px] text-gray-400 uppercase tracking-tighter md:hidden">
                  {item.category}
                </p>
              </div>

              <p className="hidden md:block text-xs text-gray-500 tracking-widest uppercase">
                {item.category}{" "}
                <span className="text-[10px] opacity-50">
                  | {item.subCategory}
                </span>
              </p>

              <div className="flex items-center gap-1">
                <IoPricetagOutline size={12} className="text-[#cbc3a3]" />
                <p className="text-sm font-medium">Rs. {item.price}</p>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={() => removeProduct(item._id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
                >
                  <IoTrashOutline size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default List;
