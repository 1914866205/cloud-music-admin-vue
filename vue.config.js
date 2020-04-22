// 服务器自动打开，指定端口，热加载
module.exports = {
  devServer: {
    host: 'localhost',
    port: 8080,
    https: false,
    open: true,
    hotOnly: true
  },
  outputDir: './dist',
  assetsDir: './assets/',
  publicPath: './',
  indexPath: './index.html',
  transpileDependencies: ['vuetify']
}
