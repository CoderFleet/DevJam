// tailwind.config.js

import daisyui from 'daisyui';

export default {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui], // DaisyUI plugin added here
  darkMode: 'class',  // Enable dark mode using class (this makes it toggleable)
};
