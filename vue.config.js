module.exports = {
  // 选项...
  publicPath: '/',

  //是否开启eslint校验
  lintOnSave: false,

  devServer: {
    disableHostCheck: true,
    host: '0.0.0.0',
    port: 8089, // 指定端口
    proxy: {
      //'/api/api2'和'/api'位置切忌不可调换，否则会出bug（应该是按次序匹配的缘故）
      // 代理 localhost:5000 = http://localhost:8089/api/api2
      '/api/api2': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        pathRewrite: { '^/api/api2': '' }, // 将 /api/api2 替换为空字符串
      },
      // 代理 localhost:8000 = http://localhost:8089/api
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }, // 将 /api 替换为空字符串
      },

    },

  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'stylus',
      patterns: []
    }
  }
}
