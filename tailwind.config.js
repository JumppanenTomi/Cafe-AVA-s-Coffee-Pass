/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'light',
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: "#FFD5BA",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        'ping': 'ping 2s linear infinite', // Adjust the duration (2s in this example)
      }
    }
  },
  plugins: [],
};
