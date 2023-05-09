const colors = require("tailwindcss/colors");
module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        main: "#FF8400",
        sub: "#FFEEDD",
        "usual-black": "#191919",
        "mid-gray": "#D9D9D9",
        "font-gray": "#9D9D9D",
        "light-gray": "#F5F5F5",
        "text-gray": "#616161",
        "usual-blue": "#0080FF",
        "url-blue": "#0099FF",
        "phone-call-green": "#65C466",
        "kakao-yellow": "#FFDD00",
        "picture-red": "#FE6666",
        font: "#000000",
        orange: colors.orange,
        neutral: colors.neutral,
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
  plugins: [require("@tailwindcss/forms")],
};
