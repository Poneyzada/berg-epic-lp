/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        foreground: "#ffffff",
        primary: {
          DEFAULT: "#ffffff",
          foreground: "#050505",
        },
        accent: {
          blue: "#0066ff",
          gold: "#d4af37",
        },
        muted: {
          DEFAULT: "#1a1a1a",
          foreground: "#a1a1aa",
        }
      },
      fontFamily: {
        monument: ["Monument Extended", "sans-serif"],
        sans: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(to right, #1a1a1a 1px, transparent 1px), linear-gradient(to bottom, #1a1a1a 1px, transparent 1px)",
      }
    },
  },
  plugins: [],
}
