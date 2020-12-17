const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const glob = require("glob");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const entry = {};
const htmlWebpackPlugins = [];

glob.sync(path.join(__dirname, "./src/*/index.js")).forEach((url) => {
  const match = url.match(/src\/(.*)\/index\.js/);
  const pageName = match && match[1];

  entry[pageName] = path.join(__dirname, `src/${pageName}`);
  htmlWebpackPlugins.push(
    new HtmlWebpackPlugin({
      filename: `${pageName}.html`,
      template: path.join(__dirname, `src/${pageName}/index.html`),
      chunks: [pageName], // 使用的 chunks
      inject: "head", // 注入位置
    })
  );
});

module.exports = {
  entry,
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name]_[chunkhash:8].js",
  },
  plugins: [new CleanWebpackPlugin(), ...htmlWebpackPlugins],
};
