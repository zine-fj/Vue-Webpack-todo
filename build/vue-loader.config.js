
// const docsLoader = require.resolve('./loader')
module.exports = isDev => {
  return {
    preserveWhitepace: true, // 去除dom间空格
    extractCSS: !isDev, // 将所有css提取到一个css文件中,(生产环境将css打包在一个文件中)
    cssModules: {
      localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' :'[hash:base64:5]', // css类名
      camelCase: true, // 驼峰命名法
    },
    // hotReload: false, // 热重载 根据环境变量生成
    // loaders: { // 可以自定义模块，（template，js，style都是可以自定义的）
    //   // 'docs': docsLoader
    // },
    // preLoader: {}, // 解析完之后再解析一遍
    // postLoader: {}, // 解析完之后再解析一遍
  }
}