const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require('webpack');

require("dotenv").config();
module.exports = {
  mode: `${process.env.mode}`,
  entry: {
    "main.bundle": "./src/index.js",
    "layout.bundle": "./src/layout.js",
  },
  output: {
    path: path.resolve(__dirname, `${process.env.WEBPACK_OUTPUT}`),
    filename: "[name].js",
    clean: true,
  },
  performance: {
    maxEntrypointSize: 1024000,
    maxAssetSize: 1024000,
  },

  watch: process.env.mode === "development",
  watchOptions: {
    ignored: /node_modules/,
    poll: 500, // Check for changes every second
  },

  devServer: {
    static: {
      directory: path.join(__dirname, `${process.env.WEBPACK_OUTPUT}`),
    },
    compress: true,
    port: 9000,
    hot: true,
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "[id].css",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "src/img/",
          to: path.resolve(__dirname, `./${process.env.WEBPACK_OUTPUT}/img/`),
        },
        {
          from: "src/fonts/",
          to: path.resolve(__dirname, `./${process.env.WEBPACK_OUTPUT}/fonts/`),
        },
        {
          from: "src/models/",
          to: path.resolve(
            __dirname,
            `./${process.env.WEBPACK_OUTPUT}/models/`
          ),
        },
      ],
    }),
    new webpack.DefinePlugin({
      STATIC_DIR: JSON.stringify(process.env.STATIC_DIR),
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader',
          {
            loader: "css-loader",
            options: {
              url: false,
              // sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              // Prefer `dart-sass`
              implementation: require("sass"),
              sourceMap: true,
              // sourceMapContents: false,
              sassOptions: {
                outputStyle: "compressed",
              },
            },
          },
        ],
      },
    ],
  },
};
