const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
  mode: "production", // 如果不添加就会警告
  entry: {
    index: "./src/index.js", // 一个入口文件
    chunk1: "./src/chunk1.js" // 两一个入口文件
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name].[chunkhash:8].js" // 出口文件
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:8].css"
    })
  ]
}