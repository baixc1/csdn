const webpack = require("webpack");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = {
  module: {
    rules: [
      {
        test: /.js$/,
        use: ["babel-loader"],
      },
    ],
  },
  plugins: [
    new webpack.DllReferencePlugin({
      manifest: require("./build/library/library.json"),
    }),
    new BundleAnalyzerPlugin(),
  ],
};
