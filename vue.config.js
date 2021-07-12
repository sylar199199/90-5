const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, '.', dir)
}

module.exports = {
  lintOnSave: true,
  transpileDependencies: ['*'], // 解决npm run serve某些node_modules依赖不能被babel编译问题
  productionSourceMap: process.env.NODE_ENV === 'development',
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  outputDir: process.env.BASE_URL,
  assetsDir: 'static',
  configureWebpack: {
    // module: {
    //   // rules: [ // 可在package.json 配置顶层 sideEffects: false
    //   //   {
    //   //     enforce: 'pre',
    //   //     test: /\.(js|vue)$/,
    //   //     exclude: /node_modules/,
    //   //     loader: 'eslint-loader',
    //   //   },
    //   // ],
    // },
    performance: {
      hints: false,
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              warnings: false,
              drop_console: true, // console
              drop_debugger: false,
              pure_funcs: ['console.log'], // 移除console
            },
          },
        }),
      ],
    },
  },
  chainWebpack: config => {
    // 移除 prefetch 插件
    config.plugins.delete('prefetch')
    config.plugins.delete('preload')

    // 设置 svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/icon'))
      .end()

    config.module
      .rule('svg-icon')
      // .test(/^(?:(?!iconfont).)+\.svg$/)
      // .test/.*[?<!iconfont]\.svg$/)
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icon'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end()
  },
  devServer: {
    proxy: {
      // 第三方报表代理
      '/report': {
        target: 'http://10.6.0.34:8080', // 报表
        changeOrigin: true,
        pathRewrite: {
          '^/report': '/',
        },
      }
    },
    overlay: {
      warnings: false,
      errors: false,
    },
    // 匹配所有以 /api 开头的url
    // '/api': {
    //   // 请求的目标主机
    //   target: 'http://http://10.9.0.110:8401',
    //   changeOrigin: true,
    //   ws: true
    //   // 这样重写会把路径中 /api 消去
    //   // pathRewrite: {
    //   //   '^/api': '/api'
    //   // }
    // }
  },
}
