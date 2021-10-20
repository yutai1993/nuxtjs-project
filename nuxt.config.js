export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-demo1',
    htmlAttrs: {
      lang: 'zh',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0' },
      // -定义针对搜索引擎的关键词
      { hid: 'keywords', name: 'keywords', content: '搜索引擎的全局关键词' },
      // -定义针对搜索引擎的全局描述
      { hid: 'description', name: 'description', content: '搜索引擎的全局描述' },
      // ios 连接遇到数字不让转成电话号码格式
      { name: 'format-detection', content: 'telephone=no' },
      // ios 是否允许创建桌面快捷启动方式
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      // ios 顶部通知栏的样式 黑色
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
      // ios 链接 不让转邮箱格式
      { name: 'format-detection', content: 'email=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'vant/lib/index.css',
    '@/assets/css/reset.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/vant',
    { src: './node_modules/amfe-flexible/index.js', mode: 'client' },
    { src: '~/plugins/directive/Touch/index.js', mode: 'client' },
    { src: '~/plugins/axios/axios' },
    { src: '~/plugins/api/api' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
   // '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources'
  ],

  router: {
    middleware: 'stats'
  },


  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true
  },

  proxy: {
    '/api': {target: 'http://localhost:5000/', pathRewrite: {'^/api': ''} }
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    styleResources: {
      scss: [
        '@/assets/css/var-global.scss'

      ]
    },
    postcss: {
      // Add plugin names as key and arguments as value
      // Install them before as dependencies with npm or yarn
      plugins: {
        "postcss-pxtorem": {
          // 把px单位换算成rem单位
          // 设计稿 375: 37.5
          // 设计稿 750: 75
          // Vant 是基于375
          rootValue: 37.5,
          unitPrecision: 5, // 允许REM单位增长到的十进制数字,小数点后保留的位数。
          propList: ['*']
        }
      },
      preset: {

        autoprefixer: {
          overrideBrowserslist: [
            "Android 4.1",
            "iOS 7.1",
            "Chrome > 31",
            "ff > 31",
            "ie >= 8"
          ],
        }
      }
    }
  }
}
