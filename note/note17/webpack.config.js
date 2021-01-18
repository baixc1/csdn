// webpack.config.js
const webpack = require('webpack')
module.exports = {
  mode: 'none',
  optimization: {
    concatenateModules: true
  }
  // plugins: [
  //   new webpack.optimize.ModuleConcatenationPlugin()
  // ]
}