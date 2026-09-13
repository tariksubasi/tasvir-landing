/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./tr/index.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
      },
      colors: {
        brand: {
          DEFAULT: "#6366f1",
          dark: "#4f46e5",
          // Small text on the near-black background: #6366f1 only reaches
          // 4.1:1 contrast, this clears the 4.5:1 minimum.
          light: "#a5b4fc",
        },
      },
    },
  },
  plugins: [],
};
