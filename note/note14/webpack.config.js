const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
  // entry: './src/entry.js',
  entry: {
    a: path.resolve(__dirname, './src/a.js'),
    // b: path.resolve(__dirname, './src/b.js')
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]_[chunkhash:8].js'
  },
  // devtool: 'source-map',
  // mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  devServer: {
    hot: true,
    open: 'chrome' // windows
  },
  optimization: {
    splitChunks: {
      cacheGroups: { // 继承或重写 splitChunks.*
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial', // chunk 类别
          name: 'vendors'
        },
        default: {
          name: 'common', // chunk 名称
          chunks: 'initial', // chunk 类别
          minSize: 0, // 最小大小
          minChunks: 2,
          priority: -20,
        }
      }
    }
  }
}