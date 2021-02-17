// webpack.config.js
const path = require('path');

module.exports = {
  mode: 'none',
  entry: {
    'large-number': './src/large-number.js',
  },
  output: {
    path: path.resolve(__dirname, 'modules'),
    filename: '[name].umd.js',
    library: 'largeNumber', // 指定库的名称，及库的全局变量
    libraryTarget: 'umd', // 支持库引入的方式
  },
};
