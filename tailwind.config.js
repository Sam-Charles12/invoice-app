/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#f7f8fc",
        surface: "#ffffff",
        text: "#1e2139",
        muted: "#888eb0",
        primary: "#7c5dfa",
        "primary-hover": "#9277ff",
        danger: "#ec5757",
        "danger-hover": "#ff9797",
        border: "#dfe3fa",
        dark: "#252945",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        heading: ["League Spartan", "sans-serif"],
      },
    },
  },
  plugins: [],
};
