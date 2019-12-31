import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//import axios from './http'
// ui组件库
import Vant from 'vant';
import 'vant/lib/index.css';
// 取消移动端点击延迟
import FastClick from 'fastclick'
import api from './http/api'
import { PullRefresh } from 'vant';
import { Lazyload } from 'vant';
import BScroll from 'better-scroll'





Vue.use(Lazyload);
Vue.use(PullRefresh);
Vue.prototype.$api = api
FastClick.attach(document.body);
Vue.use(Vant);
Vue.config.productionTip = false


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')