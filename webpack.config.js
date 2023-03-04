const path = require("path");
const HTMLPlugin = require("html-webpack-plugin"); // 打包页面
const webpack = require("webpack");
const ExtractPlugin = require("extract-text-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";

const config = {
  target: "web", // 编译目标是web平台
  // 入口 (拼接地址)
  entry: path.join(__dirname, "src/index.js"),

  // 出口
  output: {
    filename: "bundle.[hash:8].js",
    path: path.join(__dirname, "dist"),
  },

  // 配置
  module: {
    // 规则
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.jsx$/,
        loader: "babel-loader",
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: "url-loader", // 可以将图片转为 base64代码
            options: {
              // 配置
              limit: 1024, // 小于1024转为base64
              name: "[name]-aaa.[ext]",
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      // 必须要有，配置环境 开发环境有错误提醒，生产不需要
      "process.env": {
        NODE_ENV: isDev ? '"development"' : '"production"',
      },
    }),
    new HTMLPlugin(),
  ],
};

if (isDev) {
  config.devtool = "#cheap-module-eval-source-map"; // 查找问题方便，不是编译后的代码
  config.module.rules.push({
    test: /\.styl$/,
    use: [
      "style-loader",
      "css-loader",
      {
        loader: "postcss-loader",
        options: {
          sourceMap: true,
        },
      },
      "stylus-loader",
    ],
  });
  config.devServer = {
    port: "8000",
    host: "0.0.0.0", // 可用两种方式查看
    overlay: {
      // 有错误就显示在网页上
      errors: true,
    },
    hot: true,

    // historyFallback: {}
    // open: true
  };
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  );
} else {
  config.output.filename = '[name].[chunkhash:8].js'
  config.module.rules.push({
    test: /\.styl$/,
    use: ExtractPlugin.extract({
      fallback: 'style-loader', // 将css代码包裹在js中
      use: [
        "css-loader",
        {
          loader: "postcss-loader",
          options: {
            sourceMap: true,
          },
        },
        "stylus-loader",
      ]
    }),
  });
  // 输出的名字
  config.plugins.push(
    new ExtractPlugin('styles.[contentHash:8].css')
  )
}

module.exports = config;
