/* webpack.dev.js */

/* 主要配置 devServer 参数 */
/* - devServer.before */
/* - devServer.proxy  */

const path = require("path");
const webpack = require("webpack");

const { mockServer } = require("./utils");

module.exports = ({ mode = "development", mock }) => {
  console.log(1111111111111111111, mode, mock);
  return {
    mode,
    devServer: {
      host: "127.0.0.1",
      // 配置mock环境
      before: (app) => {
        if (mock) {
          mockServer(path.resolve(__dirname, "../mock"), app);
        }
      },
      // 配置联调环境
      proxy: mock
        ? {}
        : {
            "/": "localhost:port",
          },
    },
  };
};
