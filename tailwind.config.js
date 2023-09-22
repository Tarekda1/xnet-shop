/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        primary: "#3490dc", // Example primary background color
        dark: "#1a202c", // Dark background color
      },
      textColor: {
        primary: "#3490dc", // Example primary text color
        dark: "#ffffff", // White text color for dark background
      },
    },
  },
  variants: {},
  plugins: [],
};
