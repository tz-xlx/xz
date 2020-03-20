<template>
    <div>
        <div class="title">
            <button @click="fh">
                <img src="http://127.0.0.1:3030/fh.png">
            </button>
            <div></div>
            <span>通知公告</span>
        </div>
        <div class="content">
            <div>
                <div class="date">
                    <span>{{nowTime}}</span>
                </div>
                <div class="contentTop">
                    <span>{{top}}</span>
                </div>
                <div class="contentBody">
                    <span v-html="string"></span>
                </div>
            </div>
        </div>
    </div>    
</template>
<script>
export default {
    created() {
        this.str()
    },
    data() {
        return {
            a:[12,1,23,4],
            nowTime:"20xx/xx/xx 下午8:24:49",
            top:`中秋节活动通知`,
            string:`中秋节是我国的重大传统节日之一，为弘扬中华民族的传统文化，丰富居民的精神文化生活，拉近同事距离，建构熟人社会,本公司将在中秋节来临之际开展20xx年度中秋节活动。
                活动时间：20xx年x月x日下午13:00-23:00   
                活动地点：xx食堂二楼
                活动内容：文艺表演、猜灯谜、抽奖、互动游戏
                在活动当天，为大家准备了精彩的表演和丰富的奖品，欢迎大家踊跃参加!`
        }
    },
    methods: {
         fh(){
            this.$router.go(-1);
        },
        str(){
            // var nr=document.getElementById("nr")
            // console.log(nr)
            this.string = this.string.replace(/\r\n/g,"<br>")
            this.string = this.string.replace(/\n/g,"<br>");
            var now = new Date();
            this.nowTime = now.toLocaleString();
            this.a.push(18);
            // console.log(this.a)
        }
    },
}
</script>
<style scoped>
     .title{
        width:100%;
        height:58px;
        background:#3f80fe;
        color:#fff;
        text-align: center;
        line-height: 58px;
        font-size: 18px;
        letter-spacing: 3px;
        display: flex;
    }
    .title button{
        background: transparent;
        border:0;
        outline:0;
        width:20%;
    }
    .title div{
        width:13%;
    }
    .title img{
        width:22px;
    }
    .date{
        margin-left:10px;
    }
    .content{
        margin-top:10px;
        background: #eee;
    }
    .contentTop{
        display: flex;
        align-items: center;
        height:40px;
        border:1px solid #aaa;
        border-bottom:0;
        box-shadow: 0 0 1px #aaa;
        padding-left:10px;
        background:#fff;
    }
    .contentBody{
        border:1px solid #aaa;
        box-shadow: 0 0 1px #aaa;
        text-indent:2em;
        padding: 10px;
        background:#fff;
    }
</style>
