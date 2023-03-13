// 公用的 webpack 放在该文件里面

const path = require('path')
const createVueLoaderOptions = require('./vue-loader.config')

const isDev = process.env.NODE_ENV === 'development'

const config = {
  mode: process.env.NODE_ENV || 'production', // development || production
  target: 'web', // 编译目标是web平台
  // 入口 (拼接地址)
  entry: path.join(__dirname, '../client/index.js'),

  // 出口
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, '../dist')
  },

  // 配置
  module: {
    // 规则
    rules: [
      {
        test: /\.(vue|js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: createVueLoaderOptions(isDev)
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/ // 忽略该文件夹内容
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader', // 可以将图片转为 base64代码
            options: {
              // 配置
              limit: 1024, // 小于1024转为base64
              name: 'resources/[path][name].[hash:8].[ext]' // 静态目录生成的资源更好看些
            }
          }
        ]
      }
    ]
  }
}

module.exports = config
