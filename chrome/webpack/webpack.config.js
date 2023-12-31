const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
module.exports = {
  devtool: "inline-source-map",
  mode: "development",
  entry: {
    background: path.resolve(__dirname, "..", "src", "background.ts"),
    options: path.resolve(__dirname, "..", "src", "options.ts"),
    popup: path.resolve(__dirname, "..", "src", "popup.ts"),
    edtools: path.resolve(__dirname, "..", "src", "edtools.ts"),
  },
  output: {
    path: path.join(__dirname, "../dist"),
    filename: "[name].js",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {from: ".", to: ".", context: "public"},
      ],
    }),
  ],
};
