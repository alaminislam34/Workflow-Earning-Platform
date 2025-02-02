/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      colors: {
        primaryColor: "#FF6F00",
        // btnColor: "#FFD54F",
        bgColor: "#FAFAFA",
        textColor: "#333333",
        btnColor: "#FF8C00",
      },
    },
    fontFamily: {
      Cinzel: ["Cinzel", "serif"],
      righteous: ["Righteous", "serif"],
    },
    backgroundImage: {
      earn: "url('/assets/images/earn.jpg')",
    },
  },
};
