import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#E8F0FF",
          300: "#4A7ED1",
          400: "#1E5BB8",
          500: "#073890",
        },
        textPrimary: "#1F2A44",
        textSecondary: "#6B7A99",
      },
      borderRadius: {
        xl2: "20px",
      },
    },
  },
  plugins: [],
};

export default config;
