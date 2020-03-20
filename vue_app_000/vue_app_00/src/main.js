import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入和配置mint-ui组件库
// 1.完整引入mint-ui组件库
import MintUI from 'mint-ui'
// 2.单独引入mint-ui样式文件
import "mint-ui/lib/style.css"
// 3.将mint-ui对象注册Vue实例中
Vue.use(MintUI)
// 4.引入字体图标样式文件!!!
import "./font/iconfont.css"
// 5.引入第三方 axios
import axios from "axios"
// 6.配置访问服务器基础路径  127.0.0.1:3030/  176.52.6.203:3030/ 
// axios.defaults.baseURL = "http://176.52.6.203:3030/"
axios.defaults.baseURL = "http://127.0.0.1:3030/"
// 7.保存session 信息
// 每次ajax访问发我QQ将session id发送服务器验证使用
axios.defaults.withCredentials = true
// 8.将axios注册Vue实例中
  // 注意顺序不能配置在Vue顺序后面
Vue.prototype.axios = axios;

// 9引入第三方库
import Vuex from "vuex"
// 10.注册
Vue.use(Vuex)
// 11.创建储存对象
var store = new Vuex.Store({
  
})
// 12.将储存对象添Vue实例

// 创建Vue实例必须放在最后
new Vue({
  router,
  render: h => h(App),
  store //!!!
}).$mount('#app')
