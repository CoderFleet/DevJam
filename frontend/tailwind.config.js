import daisyui from "daisyui";

export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        quicksand: ["Quicksand", "serif"],
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: true,
    darkTheme: "night",
  },
};
