const colors = require("tailwindcss/colors");
module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "light-bg": "#F3F4F6",
        "light-content-bg": "#FFFFFF",
        "light-font": "#000000",
        "dark-bg": "#212125",
        "dark-content-bg": "#2F3133",
        "dark-font": "#E8EAED",
        "dark-white": "#F7F7F7",
        "color-main": "#FF8400",
        "color-sub": "#FFEEDD",
        "color-dark-main": "#E6943F",
        "color-dark-sub": "#4A4E51",
        "wave-frozen": "#56ACCA",
        amber: colors.amber,
        orange: colors.orange,
        pink: colors.pink,
        rose: colors.rose,
        fuchsia: colors.fuchsia,
        tgray: colors.neutral,
      },
      height: {
        "10v": "10vh",
        "20v": "20vh",
        "25v": "25vh",
        "30v": "30vh",
        "40v": "40vh",
        "50v": "50vh",
        "60v": "60vh",
        "70v": "70vh",
        "80v": "80vh",
        "90v": "90vh",
        "100v": "100vh",
      },
    },
    container: {
      center: true,
      padding: "1rem",
      screens: {
        // sm: "320px",
      },
    },
  },
  variants: {
    extend: {},
  },
  // plugins: [require("@tailwindcss/forms")],
};
