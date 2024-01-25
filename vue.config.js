module.exports = {
  // 选项...
  publicPath: '/',

  //是否开启eslint校验
  lintOnSave: false,

  devServer: {
    disableHostCheck: true,
    host: '0.0.0.0',
    proxy: { //配置代理，解决跨域请求后台数据的问题
      '/api': { // 定义了一个路径前缀为 '/api' 的代理规则。
        target: 'http://localhost:8080', //后台接口
        ws: true, //是否跨域
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }

    }
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'stylus',
      patterns: []
    }
  }
}
