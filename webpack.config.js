// @ts-check

const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

/** @type {import("webpack").Configuration} */
module.exports = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "./dist"),
  },
  context: path.resolve(__dirname, "./src"),
  entry: {
    background: "./background",
    contentScript: "./contentScript",
  },
  resolve: {
    extensions: [".wasm", ".ts", ".tsx", ".mjs", ".js", ".jsx", ".json"],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "manifest.json" },
        { from: "icons/*.png" },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
};
