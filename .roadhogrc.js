const path = require('path')
const { version } = require('./package.json')

const svgSpriteDirs = [
  path.resolve(__dirname, 'src/svg/'),
  require.resolve('antd').replace(/index\.js$/, '')
]

export default {
  entry: 'src/index.js',//指定 webpack 入口文件
  svgSpriteLoaderDirs: svgSpriteDirs,
  theme: "./theme.config.js",
  publicPath: `/${version}/`,//配置生产环境的 publicPath，开发环境下永远为 /
  outputPath: `./dist/${version}`,//配置输出路径，默认是 ./dist
  // 接口代理示例
  proxy: {
    "/api/v1/weather": {
      "target": "https://api.seniverse.com/",
      "changeOrigin": true,
      "pathRewrite": { "^/api/v1/weather": "/v3/weather" }
    },
    "/api_1": {
      "target": "http://182.254.136.144",
      "changeOrigin": true,
      "pathRewrite": { "^/api_1" : "/api" }
    }
  },
  env: {
    development: {
      extraBabelPlugins: [
        "dva-hmr",//可实现 routes 和 components 以及相关 CSS 修改的热更新，其他修改会自动刷新页面
        "transform-runtime",
        [
          "import", {
            "libraryName": "antd",
            "style": true
          }
        ]
      ]
    },

    production: {
      extraBabelPlugins: [
        "transform-runtime",
        [
          "import", {
            "libraryName": "antd",
            "style": true
          }
        ]
      ]
    }
  },
  dllPlugin: {
    exclude: ["babel-runtime", "roadhog", "cross-env"],
    include: ["dva/router", "dva/saga", "dva/fetch"]
  }
}
