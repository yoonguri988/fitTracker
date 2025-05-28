// tailwind.config.js
// @type {import('tailwindcss').Config}
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#222831",
        sub: "#393E46",
        "sub-lg": "#E3E3E3",
        "sub-dk": "#828282",
        err: "#F38181",
        "btn-main": "#99BC85",
        "btn-sub": "#E4EFE7",
        "btn-del": "#B2B2B2",
        base: "#FDFAF6",
        "base-point": "#FAF1E6",
        "input-bg": "#E6E0D7",
        "input-tx": "#96918A",
      },
      borderRadius: {
        m: "0.7rem",
        lg: "1rem",
        xl: "1.5rem",
        full: "9999px",
      },
      fontFamily: {
        sans: ['"Noto Sans KR"', "sans-serif"],
      },
      keyframes: {
        "slide-up": {
          "0%": { transform: "translateY(50%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        "slide-up": "slide-up 0.3s ease-out forwards",
      },
    },
  },
  plugins: [],
};
