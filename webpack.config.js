const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
console.log("VueLoaderPlugin: ", VueLoaderPlugin);
module.exports = {
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
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader', // 将图片转为base64格式代码
            options: {
              limit: 1024,
              name: '[name]-self.[ext]'
            }
          }
        ]
      }
    ],
  },
  plugins: [
    new VueLoaderPlugin(), // 15版本需指定plugin
  ],
};
