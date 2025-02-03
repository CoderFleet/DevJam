
import daisyui from 'daisyui';


export default {
  content: [
    './pages/**/*.{html,js}',
    './components/**/*.{html,js}',
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        quickSand : ["Quicksand", "sans-serif"],
      }
    },
  },
  plugins: [daisyui], 
  darkMode: "class",
};
