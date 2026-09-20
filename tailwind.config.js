/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./tr/index.html", "./tr/yks/index.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
      },
      colors: {
        page: "var(--c-bg)",
        alt: "var(--c-bg-alt)",
        elevated: "var(--c-elevated)",
        soft: "var(--c-soft)",
        ink: "var(--c-ink)",
        muted: "var(--c-muted)",
        line: "var(--c-line)",
        preview: "var(--c-preview)",
        brand: {
          DEFAULT: "var(--c-brand)",
          dark: "var(--c-brand-dark)",
          fg: "var(--c-brand-fg)",
          soft: "var(--c-brand-soft)",
        },
      },
      boxShadow: {
        card: "var(--shadow-card)",
        lift: "var(--shadow-lift)",
      },
      ringOffsetColor: {
        page: "var(--c-bg)",
      },
    },
  },
  plugins: [],
};
