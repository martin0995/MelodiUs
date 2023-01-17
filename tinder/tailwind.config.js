/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        fondito: "url('../public/bg-img3.jpeg')",
      },
      colors: {
        rojito: "#e5383b",
        verdecito: "#2b9348",
        verdedos: "#007f5f",
      },
      height: {
        heightdiv: "47rem",
      },
    },
  },
  plugins: [],
};
