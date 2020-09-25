// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import env from './api/index.js'
import axios from 'axios'
Vue.prototype.$axios = axios

Vue.prototype.$appid = env.appid
axios.defaults.baseURL = '/api'// 关键代码

import router from './router'
import MintUI from 'mint-ui'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

import 'mint-ui/lib/style.css'

Vue.use(MintUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
