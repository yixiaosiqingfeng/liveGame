// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import './assets/css/app.css'
import router from './router'
import App from './App.vue'
import api from '@/assets/js/api';
import Common from '@/assets/js/common';
// import $ from 'jquery';
import store from './store';
import VueClipboard from 'vue-clipboard2'
import 'video.js/dist/video-js.css'



Vue.config.productionTip = false
Vue.prototype.$api = api;
Vue.filter('dateformat', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)

});


Vue.use(MintUI);
Vue.use(Common);
Vue.use(VueClipboard);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
