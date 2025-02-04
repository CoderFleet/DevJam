import React from "react";
import { useTheme } from "../context/ThemeContext"; // Import Theme Context
import { FaChartBar, FaCalendarAlt, FaFacebookMessenger, FaUsersCog } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { useState } from "react";

const Sidebar = () => {
  const { theme } = useTheme(); // Get theme state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      {/* Sidebar toggle button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-1/2 left-4 z-50 p-2 rounded-full bg-gray-800 text-white hover:bg-gray-600 transition duration-200"
        style={{ transform: "translateY(-50%)" }}
      >
        <span className="text-2xl">☰</span> {/* Hamburger icon */}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 border-r transition-transform duration-300
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
      >
        <div className="h-full px-3 pb-4 overflow-y-auto">
          <ul className="space-y-2 font-semibold">
            <li>
              <a
                href="#"
                className={`${theme === "dark" ? "text-white hover:bg-gray-700" : "text-black hover:bg-gray-100 "}`}
                >
                <FaChartBar className="mr-3 text-3xl mt-5" />
                <span className="flex-1">Dashboard</span>
              </a>
            </li>

            <li>
              <a
                href="#"
                className={`${theme === "dark" ? "text-white hover:bg-gray-700" : "text-black hover:bg-gray-100 "}`}
              >
                <FaCalendarAlt className="mr-3 text-3xl" />
                <span className="flex-1">HeatMap</span>
              </a>
            </li>

            <li>
              <a
                href="#"
                className={`${theme === "dark" ? "text-white hover:bg-gray-700" : "text-black hover:bg-gray-100 "}`}
              >
                <FaFacebookMessenger className="mr-3 text-3xl" />
                <span className="flex-1">Chat</span>
              </a>
            </li>

            <li>
              <a
                href="#"
                className={`${theme === "dark" ? "text-white hover:bg-gray-700" : "text-black hover:bg-gray-100 "}`}
              >
                <FaUsersCog className="mr-3 text-3xl" />
                <span className="flex-1">Users</span>
              </a>
            </li>

            <li>
              <a
                href="#"
                className={`${theme === "dark" ? "text-white hover:bg-gray-700" : "text-black hover:bg-gray-100 "}`}
              >
                <IoIosLogOut className="mr-3 text-3xl mt-5" />
                <span className="flex-1">Sign Out</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
