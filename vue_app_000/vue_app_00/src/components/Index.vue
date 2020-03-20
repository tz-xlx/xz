<template>
    <div class="page-tabbar">
        <!-- <title fixed></title> -->
        <!--2:div保留(标题)48px高度-->
        <!-- <div style="margin-top:48px;">
        </div> -->
        <!--Home.vue 入口全局组件-->
        <!--3:切换面板列表-->
        <mt-tab-container class="page-tabbar-container" v-model="active">
            <mt-tab-container-item id="message">
                <home></home>
            </mt-tab-container-item>
            <mt-tab-container-item id="contact">
                <addressbook></addressbook>
            </mt-tab-container-item>
            <mt-tab-container-item id="mine">
                <mine></mine>
            </mt-tab-container-item>
        </mt-tab-container>
        <!-- 底部按钮 -->
        <mt-tabbar v-model="active" fixed>
        <mt-tab-item id="message" @click.native="changeState(0)">
         <tabbarlcon
          :selectedImage="require('../assets/tabbar/sy_active.png')"
          :normalImage="require('../assets/tabbar/sy.png')"
          :focused="currentIndex[0].isSelect">
         </tabbarlcon>
         首页 
        </mt-tab-item>
        <mt-tab-item id="contact" @click.native="changeState(1)">
         <tabbarlcon
         :normalImage="require('../assets/tabbar/lc.png')"
         :selectedImage="require('../assets/tabbar/lc_active.png')"
         :focused="currentIndex[1].isSelect">
         </tabbarlcon>
         通讯录
        </mt-tab-item>
        <mt-tab-item id="mine" @click.native="changeState(2)">
          <tabbarlcon
           :normalImage="require('../assets/tabbar/txl.png')"
           :selectedImage="require('../assets/tabbar/txl_active.png')"
           :focused="currentIndex[2].isSelect"
          ></tabbarlcon>
          我的
        </mt-tab-item>
      </mt-tabbar>
    </div>
</template>
<script>
// import advertising from "./xmds/Advertising"
import home from "./xmds/Home"
import TabBarlcon from "./xmds/TabBarlcon"
import Mine from "./xmds/Mine"
import Addressbook from "./xmds/Addressbook"
export default {
    data() {
        return {
            //面板中显示子组件id
            active:"message",
            //创建数组保存图片焦点状态
            currentIndex:[
                {isSelect:true},
                {isSelect:false},
                {isSelect:false}
            ]
        }
    },
    methods: {
        changeState(n){
            //函数功能:将当前参数下标
            //对应数组值修改true其它修改false
            //1:创建循环,循环数组中内容
            for(var i=0;i<this.currentIndex.length;i++){
                //2:判断如果循环下标与n相等 20
                if(n==i){
                    //3:当前下标元素true 10:22
                    this.currentIndex[i].isSelect=true;
                }else{
                    //4:其它元素修改false
                    this.currentIndex[i].isSelect=false;
                }
            }
        }
    },
    components:{
        // advertising,
        home,
        "tabbarlcon":TabBarlcon,
        "mine":Mine,
        "addressbook":Addressbook
    }
}
</script>
<style scoped>
    .page-tabbar{
        overflow: hidden;
    }
</style>