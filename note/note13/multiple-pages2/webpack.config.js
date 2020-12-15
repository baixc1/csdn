const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const glob = require("glob");

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
      chunks: [pageName],
    })
  );
});

module.exports = {
  entry,
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name]_[chunkhash:8].js",
  },
  plugins: [...htmlWebpackPlugins],
};
