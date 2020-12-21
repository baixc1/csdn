const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path')
const pages = ['home', 'search']

const entry = {}
const htmlWebpackPlugins = []
pages.forEach(pageName => {
  entry[pageName] = path.join(__dirname, `src/${pageName}`)
  htmlWebpackPlugins.push(
    new HtmlWebpackPlugin({
      filename: `${pageName}.html`,
      chunks: [pageName]
    })
  )
})

module.exports = {
  // devtool: 'eval',
  // devtool: 'source-map',
  devtool: 'cheap-source-map',
  // devtool: 'inline-source-map',
  // devtool: 'hidden-source-map',
  mode: 'development',
  entry,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]_[chunkhash:8].js'
  },
  plugins: [
    new CleanWebpackPlugin(),
    ...htmlWebpackPlugins
  ]
}