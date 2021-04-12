const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");

module.exports = {
  watch: true,
  mode: "development",
  devtool: "source-map",
  entry: {
    test_element: "./src/test_element.js",
    test: "./src/test.js",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: `test_element.html`,
      chunks: ["test_element"],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, `src/index.html`),
      filename: `test.html`,
      chunks: ["test"],
    }),
  ],
};
