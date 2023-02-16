/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        fondito: "url('../public/bg-img5.jpg')",
      },
      colors: {
        rojito: "#e5383b",
        verdecito: "#2b9348",
        verdedos: "#007f5f",
        verdespotify: "#1DB954",
        azul: "#071863",
        azulOscuro: "#07134a",
      },
      height: {
        heightdiv: "40rem",
      },
    },
  },
  plugins: [],
};
