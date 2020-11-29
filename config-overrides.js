const path = require("path");
const { override } = require("customize-cra");

const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");

module.exports = override(
  // Ignore wasm files on file loader
  config => {
    config.module.rules.find(rule => {
      return (rule.oneOf || []).find(item => {
        if (item.loader && item.loader.indexOf("file-loader") >= 0) {
          item.exclude.push(/\.wasm$/);
          return true;
        }
      });
    });

    return config;
  },

  // Hook canvas Rust-WASM module
  config => {
    config.plugins = (config.plugins || []).concat([
      new WasmPackPlugin({
        crateDirectory: path.resolve(__dirname, "./src/canvas"),
        extraArgs: "--no-typescript",
        outDir: path.resolve(__dirname, "./src/canvas-wasm")
      })
    ]);

    return config;
  }
);
