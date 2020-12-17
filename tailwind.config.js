module.exports = {
  purge: ["./src/ui/**/*.{js,jsx}",  "./src/resources/**/*.{js,jsx}", "./src/*.{js,jsx}", "./public/index.html"],
  darkMode: false,
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      borderWidth: ["first"],
      backgroundColor: ["active"],
    },
  },
  plugins: [],
};
