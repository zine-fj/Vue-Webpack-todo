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
    // 规则
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          'css-loader',
          'stylus-loader'
        ]
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader', // 可以将图片转为 base64代码
            options: { // 配置
              limit: 1024, // 小于1024转为base64
              name: '[name]-aaa.[ext]'
            }
          }
        ]
      }
    ]
  }
}