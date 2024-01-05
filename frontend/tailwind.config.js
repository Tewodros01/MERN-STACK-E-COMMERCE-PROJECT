/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lightbrown: "#FBF7ED",
        lightgreen: "#008060",
        midgreen: "#004c3f",
        darkgreen: "#002E25",
      },
    },
  },
  plugins: [],
};
