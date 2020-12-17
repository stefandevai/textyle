module.exports = {
  purge: ["./src/ui/**/*.{js,jsx}",  "./src/resources/**/*.{js,jsx}", "./src/*.{js,jsx}", "./public/index.html"],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        'almost-black': '#0a0913'
      },
      transitionProperty: {
        'width': 'width',
      },
    },
  },
  variants: {
    extend: {
      borderWidth: ["first"],
      backgroundColor: ["active"],
    },
  },
  plugins: [],
};
