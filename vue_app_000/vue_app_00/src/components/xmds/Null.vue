<template>
    <div>
        <div class="title">
            <button @click="fh">
                <img src="../../assets/fh.png">
            </button>
            <div></div>
            <span>通知公告</span>
        </div>
        <div class="nullImg">
            <img src="../../assets/null.jpg">
            <p>功能维护中...</p>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return { 
        }
    },
    methods: {
        fh(){
            this.$router.go(-1)
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
    .nullImg img{
        width: 100%;
        margin-top: 30%;
    }
    .nullImg p{
        margin-left: 35%;
        font-size: 20px;
        color: #666;
    }
</style>