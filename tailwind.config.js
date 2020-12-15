module.exports = {
  purge: ["./src/**/*.js", "./public/index.html"],
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
