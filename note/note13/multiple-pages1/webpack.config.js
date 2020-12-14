const HtmlWebpackPlugin = require('html-webpack-plugin')
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
  entry,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]_[chunkhash:8].js'
  },
  plugins: [
    ...htmlWebpackPlugins
  ]
}