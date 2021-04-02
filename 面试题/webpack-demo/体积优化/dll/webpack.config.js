const webpack = require("webpack");

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
  ],
};
