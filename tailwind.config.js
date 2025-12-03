/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./frontend/views/**/*.ejs",
    "./frontend/public/**/*.html",
    "./frontend/scripts/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          500: "#0ea5e9",
          600: "#0284c7",
        },
      },
    },
  },
  plugins: [],
};
