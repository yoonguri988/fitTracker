// tailwind.config.js
// @type {import('tailwindcss').Config}
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#222831",
        sub: "#393E46",
        "sub-light": "#E3E3E3",
        err: "#F38181",
        "btn-main": "#99BC85",
        "btn-sub": "#E4EFE7",
        "btn-del": "#B2B2B2",
        base: "#FDFAF6",
        "base-point": "#FAF1E6",
      },
      borderRadius: {
        lg: "1rem",
        xl: "1.5rem",
        full: "9999px",
      },
      fontFamily: {
        sans: ['"Poppins"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
