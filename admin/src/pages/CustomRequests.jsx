import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import {
  IoPersonOutline,
  IoCallOutline,
  IoMailOutline,
  IoFlaskOutline,
  IoTrashOutline,
  IoTimeOutline,
} from "react-icons/io5";

const CustomRequests = ({ token }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      // Backend route ko double check karein ke ye GET hai ya POST
      const response = await axios.get(backendUrl + "/api/order/custom-list", {
        headers: { token },
      });
      if (response.data.success) {
        setRequests(response.data.requests.reverse());
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching inquiries");
    } finally {
      setLoading(false);
    }
  };

  const deleteRequest = async (id) => {
    if (window.confirm("Are you sure you want to delete this inquiry?")) {
      try {
        const response = await axios.post(
          backendUrl + "/api/order/custom-remove",
          { id },
          { headers: { token } },
        );
        if (response.data.success) {
          toast.success("Inquiry Deleted");
          fetchRequests(); // List refresh karein
        }
      } catch (error) {
        toast.error("Error deleting inquiry");
      }
    }
  };

  useEffect(() => {
    if (token) fetchRequests();
  }, [token]);

  if (loading)
    return (
      <div className="p-10 text-center font-serif italic">
        Loading Masterpieces...
      </div>
    );

  return (
    <div className="animate-fade-in pb-20 px-4 max-w-[1200px] mx-auto text-left">
      <div className="mb-10">
        <h2 className="text-3xl font-serif tracking-widest text-[#1A1A1A] uppercase font-bold">
          Custom Inquiries
        </h2>
        <div className="h-[3px] w-20 bg-[#C5A059] mt-1"></div>
      </div>

      {requests.length === 0 ? (
        <div className="bg-white p-20 rounded-[2rem] border-2 border-dashed border-gray-200 text-center">
          <p className="text-gray-400 font-serif italic">
            Your bespoke inbox is currently empty.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {requests.map((item, index) => (
            <div
              key={item._id || index}
              className="bg-white border border-gray-200 rounded-[2rem] p-8 shadow-md hover:shadow-2xl transition-all relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 bg-[#1A1A1A] text-[#C5A059] text-[9px] font-black px-6 py-1.5 rounded-bl-2xl uppercase tracking-widest">
                {item.intensity} Scent
              </div>

              <div className="flex items-center gap-5 mb-8">
                <div className="bg-gray-100 p-4 rounded-2xl text-[#C5A059] shadow-inner">
                  <IoPersonOutline size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-black uppercase leading-none tracking-tighter">
                    {item.name}
                  </h3>
                  <p className="text-[10px] text-gray-400 font-bold mt-2 flex items-center gap-1 uppercase tracking-widest">
                    <IoTimeOutline /> {new Date(item.date).toLocaleDateString()}{" "}
                    at{" "}
                    {new Date(item.date).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">
                    Customer Contact
                  </p>
                  <div className="flex items-center gap-2 text-sm font-bold text-black truncate">
                    <IoMailOutline className="text-[#C5A059] shrink-0" />{" "}
                    {item.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm font-bold text-black mt-2">
                    <IoCallOutline className="text-[#C5A059] shrink-0" />{" "}
                    {item.phone}
                  </div>
                </div>

                <div className="bg-[#1A1A1A] p-4 rounded-2xl text-white shadow-xl">
                  <p className="text-[9px] font-black text-[#C5A059] uppercase tracking-widest mb-2 flex items-center gap-1">
                    <IoFlaskOutline /> Profile
                  </p>
                  <p className="text-xs font-bold truncate">
                    <span className="text-gray-500">Target:</span>{" "}
                    {item.targetBrand || "N/A"}
                  </p>
                  <p className="text-xs font-bold mt-1">
                    <span className="text-gray-500">Size:</span>{" "}
                    {item.bottleSize}
                  </p>
                </div>
              </div>

              {item.specialRequest && (
                <div className="mb-6 p-5 bg-[#C5A059]/5 border-l-4 border-[#C5A059] rounded-r-2xl italic text-xs text-gray-700 leading-relaxed shadow-sm">
                  "{item.specialRequest}"
                </div>
              )}

              <div className="pt-6 border-t border-gray-100 flex justify-between items-center">
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${item.email}&su=Roohra Custom Quote&body=Hello ${item.name},`}
                  target="_blank"
                  className="bg-[#C5A059] text-black px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all shadow-lg active:scale-95"
                >
                  Send Quote
                </a>
                <button
                  onClick={() => deleteRequest(item._id)}
                  className="p-3 text-red-100 hover:text-red-600 transition-colors"
                >
                  <IoTrashOutline size={22} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomRequests;
