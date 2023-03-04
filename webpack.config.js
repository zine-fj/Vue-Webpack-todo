const path = require('path')

module.exports = {
  // 入口 (拼接地址)
  entry: path.join(__dirname, 'src/index.js'),

  // 出口
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },

  // 配置
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  }
}