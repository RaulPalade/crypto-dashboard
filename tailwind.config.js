/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      xsm: "550px",
      md: "768px",
      lg: "976px",
      xs: "1100px",
      xm: "1200px",
      xl: "1440px",
    },
    extend: {
      colors: {
        lightViolet: "#635e9a",
        lightGreen: "#17B794",
        lightRed: "#F05454",
      },
      fontSize: {
        cc: "10px",
      },
    },
  },
  plugins: [],
};
