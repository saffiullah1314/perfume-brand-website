import React from "react";
import { NavLink } from "react-router-dom";
import {
  IoAddCircleOutline,
  IoListOutline,
  IoBagHandleOutline,
  IoFlaskOutline, // Custom Requests ke liye naya icon
} from "react-icons/io5";

const Sidebar = ({ orderCount = 0 }) => {
  // Yahan maine "Custom Requests" ko navItems mein shamil kar diya hai
  const navItems = [
    { name: "Add Items", path: "/add", icon: <IoAddCircleOutline size={22} /> },
    { name: "List Items", path: "/list", icon: <IoListOutline size={22} /> },
    {
      name: "Orders",
      path: "/orders",
      icon: <IoBagHandleOutline size={22} />,
      badge: true,
    },
    {
      name: "Custom Requests",
      path: "/custom-requests",
      icon: <IoFlaskOutline size={22} />,
    },
  ];

  return (
    <>
      {/* Desktop Sidebar - Hidden on Mobile */}
      <div className="hidden md:flex w-[18%] min-h-screen border-r border-black/5 bg-[#eae4ce] backdrop-blur-sm flex-col pt-10 px-4 gap-2 sticky top-20">
        <p className="text-[10px] tracking-[0.3em] text-gray-400 uppercase mb-4 pl-4">
          Management
        </p>

        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-5 py-4 transition-all duration-500 group relative overflow-hidden
              ${isActive ? "text-black font-medium" : "text-gray-400 hover:text-black"}`
            }
          >
            {/* Animated Background on Hover/Active */}
            <span className="absolute inset-0 bg-[#cbc3a3]/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></span>

            {/* Active Indicator Line - Fixed logic */}
            <div className="absolute left-0 w-[2px] h-full transition-all duration-500">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive ? "block h-full bg-black" : "hidden"
                }
              ></NavLink>
            </div>

            <div className="relative z-10 flex items-center gap-4">
              <span className="group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </span>
              <span className="text-xs tracking-widest uppercase">
                {item.name}
              </span>
            </div>

            {/* Notification Dot for Orders */}
            {item.badge && orderCount > 0 && (
              <span className="ml-auto relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
              </span>
            )}
          </NavLink>
        ))}
      </div>

      {/* Mobile Bottom Navigation - Visible only on small screens */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-lg border-t border-black/5 flex justify-around items-center py-3 px-2 z-[100] shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 transition-all duration-300 relative
              ${isActive ? "text-black scale-110" : "text-gray-400"}`
            }
          >
            <div className="p-1">
              {item.icon}
              {item.badge && orderCount > 0 && (
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-600 rounded-full border border-white"></span>
              )}
            </div>
            {/* Small screen par text name short kar diya */}
            <span className="text-[8px] uppercase tracking-tighter font-medium">
              {item.name.split(" ")[0]}
            </span>

            {/* Mobile Active Underline */}
            <div className="h-[2px] w-full flex justify-center mt-1">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive ? "w-4 h-full bg-black rounded-full" : "w-0"
                }
              ></NavLink>
            </div>
          </NavLink>
        ))}
      </div>
    </>
  );
};

export default Sidebar;
