<template>
    <div class="bgcolor-e">
        <!-- 首页头 -->
        <div class="homepage">
            <span>主页</span>
        </div>
        <div style="height:48px"></div>
        <!-- 首页图标 -->
        <div class="tzggimg">
            <span class="Applications">常用应用</span>
            <ul id="bgul">
                <li>
                    <img src="../../assets/zxxx.jpg">
                    <p>通知公告</p>
                </li>
                <li>
                    <img src="../../assets/jps.jpg">
                    <p>打卡中心</p>
                </li>
                <li>
                    <img src="../../assets/wdkh.jpg">
                    <p>最新线索</p>
                </li>
                <li>
                    <img src="../../assets/zgrz.jpg">
                    <p>工作日志</p>
                </li>
                <li>
                    <img src="../../assets/fwtx.jpg">
                    <p>待办事项</p>
                </li>
                <li>
                    <img src="../../assets/fwtx1.jpg">
                    <p>申请状态</p>
                </li>
                  <li>
                    <img src="../../assets/qj.jpg">
                    <p>请假申请</p>
                </li>
                 <li>
                    <img src="../../assets/jiab.jpg">
                    <p>加班申请</p>
                </li>
                <li>
                    <img src="../../assets/bd.jpg">
                    <p>出差申请</p>
                </li>
            </ul>
        </div>
        <div class="tzggimg">
            <span class="Applications">其他应用</span>
            <ul id="bgu2">
                <li>
                    <img src="../../assets/lts.jpg">
                    <p>聊天室</p>
                </li>
                <li>
                    <img src="../../assets/sp.jpg">
                    <p>视频会议</p>
                </li>
                <li>
                    <img src="../../assets/huiyi.jpg">
                    <p>电话会议</p>
                </li>
            </ul>
        </div>
        <div style="height:50px;"></div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            timer:""
        }
    },
    methods: {
        evection(){
            this.$router.push("/Newlist");
        },
        evection1(){
            this.$router.push("/Waitconfirm");
        },
        txt1(){
            this.$router.push("/Schedule");
        },
        lts(){
            this.$router.push("/Room")
        },
        tz(){
            this.$router.push("/Notice")
        },
        dk(){
            this.$router.push("/Signed")
        },
        null(){
            this.$router.push("/Null")
        }
    },
    mounted(){
       var ul=document.getElementById("bgul");
       var ul2=document.getElementById("bgu2");
       var lis=ul.querySelectorAll("ul>li");
       var lis2=ul2.querySelectorAll("ul>li");
       var div=document.getElementById("txt");
       var divs=ul.querySelectorAll("div>div");
       for(let i=0;i<lis.length;i++){
           lis[i].onclick=()=>{
               lis[i].style.background="#eee"
               if(i==8){
                this.timer=setTimeout(this.evection,200);
               }
               if(i==4){
                this.timer=setTimeout(this.evection1,200);
               }
               if(i==5){
                this.timer=setTimeout(this.txt1,200);
               }
               if(i==0){
                   this.timer=setTimeout(this.tz,200);
               }
               if(i==1){
                   this.timer=setTimeout(this.dk,200);
               }
               if(i==2){
                   this.timer=setTimeout(this.null,200);
               }
               if(i==3){
                   this.timer=setTimeout(this.null,200);
               }
               if(i==6){
                   this.timer=setTimeout(this.null,200);
               }
               if(i==7){
                   this.timer=setTimeout(this.null,200);
               }
           }
       }; 
       for(let i=0;i<lis2.length;i++){
           lis2[i].onclick=()=>{
                lis2[i].style.background="#eee";
                if(i==0){
                    this.timer=setTimeout(this.lts,200)
                }
                if(i==1){
                   this.timer=setTimeout(this.null,200);
               }
                if(i==2){
                   this.timer=setTimeout(this.null,200);
               }
           }
       }
    }
}
</script>
<style scoped>
    li{
        list-style: none
    }
    .bgcolor-e{
        background: #eee;
        font-size: 16px;
        /* font-size: 100% 100% */
        height: 100vh
    }
    /* 首页头 */
    .homepage{
        display: flex;
        justify-content: center;
        width:100%;
        height: 48px;
        background:#3f80fe;
        color: #fff;
        /* font-size: 18px; */
        letter-spacing:6px;
        position: fixed;
        align-items: center
    }
    .Applications{
        display: block;
        background: #fff;
        width: 100px;
        text-align: center;
        line-height: 40px;
        color: #666;
    }
    /* 首页图标 */
    .tzggimg ul li img{
        width: 45%;
    }
    .tzggimg ul{
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        padding: 0;
        background: #fff;
        margin-top: 0;
    }
    .tzggimg ul li{
        padding:1.8% 0;
        width: 30%;
        text-align: center;
    }
    .tzggimg ul li p{
        font-size: .4rem;
    }
</style>