const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

const smp = new SpeedMeasurePlugin();
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = smp.wrap({
  module: {
    rules: [
      {
        test: /.js$/,
        use: ["babel-loader"],
      },
    ],
  },
  plugins: [new BundleAnalyzerPlugin()],
});
