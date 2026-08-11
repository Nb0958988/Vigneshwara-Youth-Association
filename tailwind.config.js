/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        maroon: {
          DEFAULT: "#4A0E12",
          deep: "#2E0A0E",
        },
        purple: {
          deep: "#2A0E45",
          void: "#160726",
        },
        gold: {
          antique: "#C9A227",
          bright: "#E8C766",
          soft: "#F3E3B3",
        },
        marigold: "#E8801A",
        saffron: "#F2994A",
        magenta: "#D8407A",
        ivory: "#FBF2DD",
      },
      fontFamily: {
        display: ["Cinzel Decorative", "Cinzel", "serif"],
        telugu: ["Baloo Tammudu 2", "sans-serif"],
        body: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px rgba(232, 199, 102, 0.45)",
      },
      animation: {
        "spin-slow": "spin 14s linear infinite",
      },
    },
  },
  plugins: [],
};
