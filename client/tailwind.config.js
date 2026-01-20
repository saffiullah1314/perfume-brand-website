export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        gold: "#e5bf76",
        dark: "#0B0B0B",
        grey: "#2e2c2c",
        darkSecondary: "#121212",
        lightText: "#F5F5F5",
        mutedText: "#9CA3AF",
      },
      fontFamily: {
        heading: ["Playfair Display", "serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
