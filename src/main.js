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
import AMap from 'vue-amap'; //注意不要和 AMap原始名称覆盖




Vue.use(Lazyload);
Vue.use(PullRefresh);
Vue.prototype.$api = api
FastClick.attach(document.body);
Vue.use(Vant);
Vue.config.productionTip = false
Vue.use(AMap);
// 初始化vue-amap
AMap.initAMapApiLoader({
    // 高德的key
    key: 'f7616f229fa30e9bc6bd67ec4e20e3ef',
    // 插件集合
    plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView',
        'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor',
        'AMap.CircleEditor', 'AMap.Geolocation'
    ],
});



new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')