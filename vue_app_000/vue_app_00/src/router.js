import Vue from 'vue'
import Router from 'vue-router'
import Advertising from "./components/xmds/Advertising.vue"
import Index from "./components/Index.vue"
import Home from "./components/xmds/Home.vue"
import Login from "./components/xmds/Login.vue"
import Newlist from "./components/xmds/Newlist.vue"
import Schedule from "./components/xmds/Schedule.vue"
import Mine from "./components/xmds/Mine.vue"
import Details from "./components/xmds/Details.vue"
import Waitconfirm from "./components/xmds/Waitconfirm.vue"
import Amend from "./components/xmds/Amend.vue"
import Submit from "./components/xmds/Submit.vue"
import Addressbook from "./components/xmds/Addressbook.vue"
import Linkman from "./components/xmds/Linkman.vue"
import Room from "./components/xmds/Room.vue"
import Notice from "./components/xmds/Notice.vue"
import Signed from "./components/xmds/Signed.vue"
import Null from "./components/xmds/Null"
// 2.为组件配置访问路径 /Exam01
Vue.use(Router)
export default new Router({
  routes: [
    {path:'/',component:Advertising},
    {path:'/Advertising',component:Advertising},
    {path:'/Index',component:Index},
    {path:'/Home',component:Home},
    {path:'/Login',component:Login},
    {path:'/Newlist',component:Newlist},
    {path:'/Schedule',component:Schedule},
    {path:'/Mine',component:Mine},
    {path:'/Details/:bid',component:Details,props:true},
    {path:'/Waitconfirm',component:Waitconfirm},
    {path:'/Amend',component:Amend},
    {path:'/Submit/:bid',component:Submit,props:true},
    {path:'/Addressbook',component:Addressbook},
    {path:'/Linkman/:uid',component:Linkman,props:true},
    {path:'/Room',component:Room},
    {path:'/Notice',component:Notice},
    {path:'/Signed',component:Signed},
    {path:"/Null",component:Null}
  ]
})
