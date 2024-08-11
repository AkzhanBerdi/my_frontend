export default {
  server: {
    port: 3300 // Choose the port you want to use
  },

  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'frontend',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'ant-design-vue/dist/antd.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/antd-ui',
    '~/plugins/axios'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios'
  ],
  axios: {
    baseURL: 'http://localhost:8000', // Django API base URL
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  render: {
    resourceHints: false,
  },
  proxy: {
    '/api/': 'http://localhost:8000'
  },
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'home',
        path: '/',
        component: resolve(__dirname, 'pages/index.vue')
      })
      routes.push({
        name: 'login',
        path: '/login',
        component: resolve(__dirname, 'pages/login.vue')
      })
      routes.push({
        name: 'register',
        path: '/register',
        component: resolve(__dirname, 'pages/register.vue')
      })
      routes.push({
        name: 'logout',
        path: '/logout',
        component: resolve(__dirname, 'pages/logout.vue')
      })
    }
  }
}
