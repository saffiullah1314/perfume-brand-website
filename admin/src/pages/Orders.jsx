import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import {
  IoCubeOutline,
  IoPersonOutline,
  IoLocationOutline,
  IoCallOutline,
  IoWalletOutline,
  IoCalendarOutline,
} from "react-icons/io5";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return null;
    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } },
      );
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: event.target.value },
        { headers: { token } },
      );
      if (response.data.success) {
        await fetchAllOrders();
        toast.success("Status Updated Successfully");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="animate-fade-in pb-20 px-2 sm:px-0">
      <div className="flex flex-col gap-1 mb-8">
        <h2 className="text-xl sm:text-2xl font-serif tracking-[0.2em] text-black uppercase">
          Order Management
        </h2>
        <div className="h-[2px] w-12 bg-[#cbc3a3]"></div>
      </div>

      <div className="flex flex-col gap-6">
        {orders.map((order, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all"
          >
            {/* Order Header - Tracking & Date */}
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-100 flex flex-wrap justify-between items-center gap-2">
              <div className="flex items-center gap-2">
                <span className="bg-black text-white text-[10px] px-2 py-1 rounded font-bold uppercase tracking-widest">
                  Order ID: {order._id.slice(-6)}
                </span>
                <div className="flex items-center gap-1 text-gray-500 text-xs">
                  <IoCalendarOutline />
                  <span>{new Date(order.date).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="text-sm font-bold text-black">
                Total:{" "}
                <span className="text-[#cbc3a3]">Rs. {order.amount}</span>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-5 sm:p-6">
              {/* Column 1: Items List */}
              <div className="flex flex-col gap-3">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                  <IoCubeOutline /> Ordered Items
                </p>
                <div className="flex flex-col gap-2">
                  {order.items.map((item, i) => (
                    <div
                      key={i}
                      className="bg-gray-50 p-2 rounded border border-gray-100"
                    >
                      <p className="text-xs font-bold text-black">
                        {item.name}
                      </p>
                      <p className="text-[10px] text-gray-500">
                        Size: {item.size} | Qty: {item.quantity}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 2: Customer Identity */}
              <div className="flex flex-col gap-3">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                  <IoPersonOutline /> Customer
                </p>
                <div className="text-sm">
                  <p className="font-bold text-black text-base">
                    {order.address.firstName} {order.address.lastName}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    {order.address.email}
                  </p>
                </div>
              </div>

              {/* Column 3: Shipping & Contact */}
              <div className="flex flex-col gap-3">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                  <IoLocationOutline /> Shipping Details
                </p>
                <div className="text-xs text-gray-600 leading-relaxed">
                  <p>{order.address.street}</p>
                  <p>
                    {order.address.city}, {order.address.state} -{" "}
                    {order.address.zipcode}
                  </p>
                  <div className="mt-2 flex items-center gap-1 text-black font-medium">
                    <IoCallOutline /> {order.address.phone}
                  </div>
                </div>
              </div>

              {/* Column 4: Payment & Status Update */}
              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1 mb-2">
                    <IoWalletOutline /> Payment Info
                  </p>
                  <div className="flex flex-col gap-1">
                    <p className="text-xs">
                      Method:{" "}
                      <span className="font-bold">{order.paymentMethod}</span>
                    </p>
                    <p className="text-xs">
                      Status:
                      <span
                        className={`ml-2 px-2 py-0.5 rounded-full text-[9px] font-bold ${order.payment ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}
                      >
                        {order.payment ? "PAID" : "UNPAID"}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t border-gray-100 md:border-none md:pt-0">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                    Update Order Status
                  </p>
                  <select
                    onChange={(e) => statusHandler(e, order._id)}
                    value={order.status}
                    className="w-full bg-black text-white p-3 text-xs font-bold tracking-widest outline-none cursor-pointer hover:bg-gray-800 transition-all rounded"
                  >
                    <option value="Order Placed">Order Placed</option>
                    <option value="Packing">Packing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for delivery">Out for delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
