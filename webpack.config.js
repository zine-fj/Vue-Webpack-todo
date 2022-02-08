const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require("webpack");

const isDev = process.env.NODE_ENV === 'development'

const config = {
  target: 'web',
  entry: path.join(__dirname, "src/index.js"), // 入口
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "dist"),
  }, // 出口
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.scss/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader', // 将图片转为base64格式代码
            options: {
              limit: 1024,
              name: '[name]-self.[ext]' // ext 扩展名jpg
            }
          }
        ]
      }
    ],
  },
  plugins: [
    // 在这里写了之后相当于全局，都可以用process.env了
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    new VueLoaderPlugin(), // 15版本需指定plugin
    new HTMLPlugin()
  ],
};

if (isDev) {
  // config.devServer = {
  //   port: 8000,
  //   host: '0.0.0.0',
  //   overlay: {
  //     errors: true, // webpack有问题就显示在网页上
  //   },
  //   static: './public'
  // }
}

module.exports = config