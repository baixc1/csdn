const path = require("path");
const CopyrightWebpackPlugin = require("./plugins/copyright-webpack-plugin");
module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  resolveLoader: {
    modules: ["node_modules", "./loaders"], // 当你引用一个Loader的时候它会先去查找node_modules，如果找不到再去./loaders找
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            // loader: path.resolve(__dirname, './loaders/replaceLoaderAsync.js'),
            loader: "replaceLoaderAsync",
            options: {
              name: "https",
            },
          },
          // {
          //   // loader: path.resolve(__dirname, './loaders/replaceLoader.js'),
          //   loader: "replaceLoader",
          //   options: {
          //     name: "你好",
          //   },
          // },
        ],
      },
    ],
  },
  plugins: [new CopyrightWebpackPlugin()],
};
