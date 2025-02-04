import React from "react";
import { useTheme } from "../context/ThemeContext"; // Import the custom hook
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <style>
        {`
          /* Light Mode */
          :root {
              --bg-color: #ffffff;
              --text-color: #333333;
          }

          /* Dark Mode */
          [data-theme="dark"] {
              --bg-color: #1a1a1a;
              --text-color: #ffffff;
          }

          body {
              background-color: var(--bg-color);
              color: var(--text-color);
              transition: background-color 0.3s ease, color 0.3s ease;
          }

          .toggle-container {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 50px;
              height: 25px;
              background-color: var(--text-color);
              border-radius: 50px;
              cursor: pointer;
              transition: background-color 0.3s ease;
              border: none;
              outline: none;
              position: relative;
              padding: 5px;
          }

          .toggle-slider {
              width: 20px;
              height: 20px;
              background-color: var(--bg-color);
              border-radius: 50%;
              position: absolute;
              left: 5px;
              transition: transform 0.3s ease;
              display: flex;
              align-items: center;
              justify-content: center;
          }

          /* Dark mode adjustments */
          .dark-mode .toggle-slider {
              transform: translateX(25px);
          }
        `}
      </style>

      <button onClick={toggleTheme} className="toggle-container">
        <div className={`toggle-slider ${theme === "dark" ? "dark-mode" : ""}`}>
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </div>
      </button>
    </>
  );
};

export default ThemeSwitcher;
