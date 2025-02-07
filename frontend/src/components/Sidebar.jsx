  import React from "react";
  import { useTheme } from "../context/ThemeContext"; // Import Theme Context
  import { FaChartBar, FaCalendarAlt, FaFacebookMessenger, FaUsersCog,FaTasks } from "react-icons/fa";
  import { IoIosLogOut } from "react-icons/io";
  import { useState } from "react";
  import { Link } from "react-router-dom";
  import { AssignmentProvider } from "../context/AssignmentContext";
  import {logout } from "../utils/api"
  import { MdAssignment } from "react-icons/md";
  import { useNavigate } from "react-router-dom";
  
   const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("token"); // Remove stored token
      window.location.href = "/"; // Redirect to login page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  


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
                <Link
                  to="/dashboard"
                  className={`${theme === "dark" ? "text-white hover:bg-gray-700" : "text-black hover:bg-gray-100 "}`}
                  >
                  <FaTasks className="fixed text-xl top-10" />
                  <span className="fixed top-10 text-xl">Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/assignments"
                  className={`${theme === "dark" ? "text-white hover:bg-gray-700" : "text-black hover:bg-gray-100 "}`}
                >
                  <MdAssignment className="fixed top-20 text-xl" />
                  <span className="fixed top-20 text-xl">Assignments</span>
                </Link>
          
              </li>

              <li>
                <Link
                  to ="/calender"
                  className={`${theme === "dark" ? "text-white hover:bg-gray-700" : "text-black hover:bg-gray-100 "}`}
                >
                  <FaCalendarAlt className="mr-3 fixed top-30 text-xl" />
                  <span className="fixed top-30 text-xl">HeatMap</span>
                </Link>
              </li>

              <li>
                <Link 
                  to="/chats"
                  className={`${theme === "dark" ? "text-white hover:bg-gray-700" : "text-black hover:bg-gray-100 "}`}
                >
                  <FaFacebookMessenger className="mr-3  fixed top-40 text-xl" />
                  <span className="fixed top-40 text-xl">Chat</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/progress"
                  className={`${theme === "dark" ? "text-white hover:bg-gray-700" : "text-black hover:bg-gray-100 "}`}
                >
                  <FaChartBar className="mr-3 fixed top-50  text-xl" />
                  <span className="fixed top-50 text-xl">Progress</span>
                </Link>
              </li>
              <li>
               
                  <IoIosLogOut className="mr-3 fixed top-60 text-xl" />
                  <button  className="fixed top-60 text-xl"onClick={handleLogout}>Logout</button>
                
              </li>
            </ul>
          </div>
        </aside>
      </div>
    );
  };

  export default Sidebar;
