import React from 'react';
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { MdSpaceDashboard } from "react-icons/md";
import ThemeSwitcher from './ThemeSwitcher';
import { useTheme } from "../context/ThemeContext"; // Import theme context

const Header = () => {
  const { theme } = useTheme(); // Get the current theme

  return (
    <nav className={`fixed top-0 left-0 h-20 w-full border-b 
        ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
      
      <div className="px-4 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          
          {/* Left Section: Logo & Menu Button */}
          <div className="flex items-center justify-center space-x-4">
            <button className={`inline-flex items-center p-2 text-sm rounded-lg sm:hidden 
                ${theme === "dark" ? "text-gray-400 hover:bg-gray-700 focus:ring-gray-600" : "text-gray-500 hover:bg-gray-100 focus:ring-gray-200"}`}>
              <HiOutlineMenuAlt2 className="text-2xl "/>
            </button>

            <a href="#" className="flex ms-2 md:me-24">
              <MdSpaceDashboard className="h-8 me-3 text-2xl text-violet-500"/>
              <span className={`self-center text-2xl font-bold sm:text-3xl whitespace-nowrap 
                ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                Assignify
              </span>
            </a>
          </div>

          {/* Right Section: Theme Toggle Button */}
          <div className={`rounded-full p-4 ${theme === "dark" ? "bg-slate-700 text-white" : "dark:bg-slate-50 dark:text-slate-700"}`}>
            <ThemeSwitcher />
          </div>
          
        </div>
      </div>
    </nav>
  );
}

export default Header;





