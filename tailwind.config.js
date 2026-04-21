/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        text: "var(--text)",
        muted: "var(--muted)",
        primary: "var(--primary)",
        "primary-hover": "var(--primary-hover)",
        danger: "var(--danger)",
        "danger-hover": "var(--danger-hover)",
        border: "var(--border)",
        dark: "var(--dark)",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        heading: ["League Spartan", "sans-serif"],
      },
    },
  },
  plugins: [],
};
