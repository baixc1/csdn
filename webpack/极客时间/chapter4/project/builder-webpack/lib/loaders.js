const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");
module.exports = {
  rules: [
    {
      test: /.js$/,
      use: [
        {
          loader: "babel-loader",
        },
      ],
    },
    {
      test: /.css$/,
      // use: ["style-loader", "css-loader"],
      use: [MiniCssExtractPlugin.loader, "css-loader"],
    },
    {
      test: /.less$/,
      use: [
        MiniCssExtractPlugin.loader,
        "css-loader",
        "less-loader",
        {
          loader: "postcss-loader",
          options: {
            postcssOptions: {
              plugins: [
                [
                  "autoprefixer",
                  {
                    overrideBrowserslist: ["last 2 version", ">1%", "ios 7"],
                  },
                ],
              ],
            },
          },
        },
        {
          loader: "px2rem-loader",
          options: {
            remUnit: 75,
            remPrecision: 8,
          },
        },
      ],
    },
    {
      test: /.(png|jpg|gif|jpeg)$/,
      use: [
        {
          loader: "file-loader",
          options: {
            name: "[name]_[hash:8].[ext]",
          },
        },
      ],
    },
    {
      test: /.(woff|woff2|eot|ttf|otf)$/,
      use: [
        {
          loader: "file-loader",
          options: {
            name: "[name]_[hash:8][ext]",
          },
        },
      ],
    },
  ],
};
