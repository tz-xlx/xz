<template>
    <div>
       <div class="title">
            <button @click="redraw">
                <img src="../../assets/fh.png">
            </button>
            <p>欢迎进入聊天室</p>
            <button @click="home">
                <img src="../../assets/more.png">
            </button>
        </div>
        <div style="height:55px"></div>
        <div id="inputRs">
            <!-- 聊天区域 -->
           {{xx}}
        </div>
        <div class="fasong">
            <input type="text" id="inputMsg" v-model="xx">
            <button @click="zz">发送</button>
        </div>
        
        <!-- <button @click="inputBtn">发送</button> -->
    </div>
</template>
<script>
// import {socket} from "../../../public/js/socket.io.js"
export default {
    data() {
        return {
            aa:"",
            xx:""
        }
    },
    created() {    
    //    var cio = socket("ws://127.0.0.1:4000");
    //     // 2.绑定事件enter 有新人进入
    //     cio.on("enter",(data)=>{
    //         // 2.1创建div元素
    //         var div = document.getElementById("inputRs");
    //         div.innerText=data;
    //         this.$refs.div.style.color = "#f00";
    //         var inputRs = document.getElementById("inputRs");
    //         this.$refs.inputRs.appendChild(div);
    //     })
    //     // 接收服务器广播它的聊天内容
    //     cio.on("list",(data)=>{
    //         // 创建div
    //         var div = document.getElementById("inputRs");
    //         // 将聊天内容保存div
    //         this.$refs.div.innerText = data;
    //         // 添加样式 蓝色
    //         this.$refs.div.style.color = "#00f";
    //         // 将div添加msg元素
    //         var msg = document.getElementById("inputRs");
    //         this.$refs.msg.appendChild(div);
    //     })
    //     // 5.绑定用户离开事件
    //     cio.on("leave",(data)=>{
    //         // 创建div
    //         var div = document.getElementById("inputRs");
    //         // 将返回数据data保存div中间
    //         this.$refs.div.innerText = data;
    //         // 添加样式 #0f0
    //         this.$refs.div.style.color = "#0f0";
    //         // 将div追加inputRs
    //         var msg = document.getElementById("inputRs");
    //         this.$refs.msg.appendChild(div);
    //     })
    },
    methods: {
        // inputBtn(){
        //     var cio = socket("ws://127.0.0.1:4000");
        //     // 获取输入框
        //     var inputMsg = document.getElementById("inputMsg");
        //     // 获取发送按钮
        //     var inputBtn = document.getElementById("inputBtn");
        //     // 将输入框内容发送服务器
        //     cio.emit("message",inputMsg.value);
        // },
        redraw(){
            this.$router.go(-1);
        }, 
        home(){
            this.$router.push("/Index");
        },
        zz(){
            
        }
    },
}
</script>
<style scoped>
    .title{
        width:100%;
        height:48px;
        background:#3f80fe;
        color:#fff;
        align-items: center;
        font-size: 18px;
        letter-spacing: 3px;
        display: flex;
        justify-content: space-between;
        position: fixed;
        z-index: 99999;
    }
    .title button{
        background: transparent;
        border:0;
        outline:0;
        width:20%;
    }
    #inputRs{
        width: 90%;
        height: 30rem;
        border: 1px solid #aaa;
        margin: 0 auto;
    }
    .fasong{
        margin-top: 5%;
        text-align: center;
    }
    .fasong button{
        width: 20%;
        height: 40px;
        background: #3f80fe;
        border: 0;
    }
    .fasong input{
        width: 60%;
        height: 34px
    }
</style>