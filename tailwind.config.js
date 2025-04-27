/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    darkMode: 'class', // <-- Tambahkan ini
    theme: {
      extend: {
        colors: {
          primary: "#2563eb",
          secondary: "#64748b",
          accent: "#facc15",
          danger: "#ef4444",
          success: "#22c55e",
        },
        fontFamily: {
          sans: ["Inter", "ui-sans-serif", "system-ui"],
        },
      },
    },
    plugins: [],
  }
  