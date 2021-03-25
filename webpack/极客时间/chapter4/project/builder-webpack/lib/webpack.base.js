const setMPA = require("./setMPA");
const loaders = require("./loaders");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");

const projectRoot = process.cwd();
const { entry, htmlWebpackPlugins } = setMPA();

module.exports = {
  entry,
  output: {
    path: path.join(projectRoot, "dist"),
    filename: "[name]_[chunkhash:8].js",
  },
  module: loaders,
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name]_[contenthash:8].css",
    }),
    new CleanWebpackPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    function errorPlugin() {
      this.hooks.done.tap("done", (stats) => {
        if (
          stats.compilation.errors &&
          stats.compilation.errors.length &&
          process.argv.indexOf("--watch") === -1
        ) {
          process.exit(1);
        }
      });
    },
    ...htmlWebpackPlugins,
  ],
  stats: "errors-only",
};
