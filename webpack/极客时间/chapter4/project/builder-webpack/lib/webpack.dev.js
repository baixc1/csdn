const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base");

const devConfig = {
  mode: "development",
  devServer: {
    contentBase: "./dist",
    hot: true,
    stats: "errors-only",
  },
  devtool: "cheap-source-map",
};

module.exports = merge(baseConfig, devConfig);
