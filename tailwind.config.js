/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
    theme: {
      extend: {
        colors: {
          black: "var(--black)",
          "collection-1-main": "var(--collection-1-main)",
        },
        fontFamily: {
          "12-regular": "var(--12-regular-font-family)",
          "14-mideum": "var(--14-mideum-font-family)",
          "14-regular": "var(--14-regular-font-family)",
          "14-semibold": "var(--14-semibold-font-family)",
          "16-medium": "var(--16-medium-font-family)",
          "16-regular": "var(--16-regular-font-family)",
          "16-semibold": "var(--16-semibold-font-family)",
          "18-mideum": "var(--18-mideum-font-family)",
          "18-semibold": "var(--18-semibold-font-family)",
          "24-semibold": "var(--24-semibold-font-family)",
        },
      },
    },
    plugins: [],
  };