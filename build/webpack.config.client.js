const path = require("path");
const HTMLPlugin = require("html-webpack-plugin"); // 打包页面
const webpack = require("webpack");
const ExtractPlugin = require("extract-text-webpack-plugin");
const baseConfig = require("./webpack.config.base");
const merge = require("webpack-merge"); // 合并不同的webpack配置

const isDev = process.env.NODE_ENV === "development";

const devServer = {
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

const defaultPlugins = [
  new webpack.DefinePlugin({
    // 必须要有，配置环境 开发环境有错误提醒，生产不需要
    "process.env": {
      NODE_ENV: isDev ? '"development"' : '"production"',
    },
  }),
  new HTMLPlugin(),
]

let config;

if (isDev) {
  config = merge(baseConfig, {
    devtool: "#cheap-module-eval-source-map", // 查找问题方便，不是编译后的代码
    module: {
      rules: [
        {
          test: /\.styl$/,
          use: [
            "vue-style-loader",
            'css-loader',
            // { // 也可以用cssmodule
            //   loader: 'css-loader',
            //   options: {
            //     module: true,
            //     localIdentName: '[path]-[name]-[hash:base64:5]', // css类名
            //   }
            // },
            {
              loader: "postcss-loader",
              options: {
                sourceMap: true,
              },
            },
            "stylus-loader",
          ],
        },
      ],
    },
    devServer,
    plugins: defaultPlugins.concat([
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ])
  });

} else {
  config = merge(baseConfig, {
    // 类库文件单独打包（因为比较静态）
    entry: {
      app: path.join(__dirname, "../client/index.js"),
      vendor: ["vue"],
    },
    output: {
      filename: "[name].[chunkhash:8].js" // hash 所有打包后的hash值一样；chunkhash 打包后的hash值不一样
    },
    module: {
      rules: [
        {
          test: /\.styl$/,
          use: ExtractPlugin.extract({
            fallback: "vue-style-loader", // 将css代码包裹在js中
            use: [
              "css-loader",
              {
                loader: "postcss-loader",
                options: {
                  sourceMap: true,
                },
              },
              "stylus-loader",
            ],
          }),
        }
      ]
    },
    plugins: defaultPlugins.concat([
      // 输出的名字
      new ExtractPlugin("styles.[contentHash:8].css"),
      // 指定打包文件
      new webpack.optimize.CommonsChunkPlugin({
        name: "vendor",
      }),
      // 单独打包webpack
      new webpack.optimize.CommonsChunkPlugin({
        name: "runtime",
      })
    ])
  })
}

module.exports = config;
