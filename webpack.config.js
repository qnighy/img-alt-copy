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
  entry: {
    background: "./src/background",
  },
  resolve: {
    extensions: [".wasm", ".ts", ".tsx", ".mjs", ".js", ".jsx", ".json"],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "src/manifest.json", to: "manifest.json" },
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
