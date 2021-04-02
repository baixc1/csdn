const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: {
    library: ["react", "react-dom"],
  },
  output: {
    filename: "[name]_[chunkhash].dll.js",
    path: path.join(__dirname, "build/library"),
    library: "[name]_[fullhash]",
  },
  plugins: [
    new webpack.DllPlugin({
      name: "[name]_[fullhash]",
      path: path.join(__dirname, "build/library/[name].json"),
    }),
  ],
};
