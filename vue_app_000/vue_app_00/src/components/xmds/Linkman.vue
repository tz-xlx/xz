<template>
    <div class="linkman">
        <div class="personal">
            <span @click="go()">
                <img src="../../assets/back.png" alt="">
            </span>
            <span>信息</span>
            <span></span>
        </div>
        <div class="content">
            <div class="image">
                <img :src="list.avatar" alt="">
            </div>
            <br>
            <span>{{list.user_name}}</span>
            <br>
            <p>({{list.department}})</p>
            <div class="operation">
                <div>
                    <span><a :href="'tel:' + list.phone"><img src="../../assets/mine/phone.png" alt="">
                    </a></span>
                    <br>
                    呼叫
                </div>
                <div>
                    <span><img src="../../assets/mine/email.png" alt=""></span>
                    <br>
                    信息
                </div>
            </div>
        </div>
        <div class="text">
            <div>
                <img src="../../assets/mine/position.png" alt="">
                <span>{{list.position}}</span>
            </div>
            <div>
                <img src="../../assets/mine/phone.png" alt="">
                <span>{{list.phone}}</span>
            </div>
            <div>
                <img src="../../assets/mine/email.png" alt="">
                <span>{{list.email}}</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:["uid"],
    created() {
        this.gain()
    },
    data() {
        return {
            list:[]
        }
    },
    methods: {
        gain(){
            // console.log(this.uid)
            var url="linkman";
            var obj={uid:this.uid}
            this.axios.get(url,{params:obj}).then(res=>{
                if(res.data.code==-1){
                    this.$toast("请先登录")
                    this.$router.push("/Login")
                }
                // console.log(res)
                this.list=res.data[0];
            })
            .catch(err=>{
                console.log(err)
            })
        },
        go(){
            this.$router.go(-1)
        }
    }
}
</script>
<style scoped>
    .linkman{
        height:100vh;
    }
    .personal{
        display:flex;
        align-items: center;
        justify-content: space-between;
        width:100%;
        height:48px;
        background: #3f80fe;
        color: #fff;
    }
    .personal span{
        margin:0 10px;
    }
    .personal span img{
        width:22px;
        height:22px;
    }
    .content{
        text-align: center;
        width:100%;
        -moz-background-size:100% 100%;
        background-size:100% 100%
    }
    .content .image{
        margin-top:30px;
        display: inline-block;
        width:70px;
        height:70px;
    }
    .content img{
        width:100%;
        height:100%;
        border-radius: 50%;
    }
    .content p{
        color:#aaa
    }
    .operation>div{
        display: inline-block;
        margin:0 30px;
    }
    .operation span{
        width:45px;
        height:45px;
        display: inline-block;
    }
    .operation div img{
        width:100%;
        height: 100%;
    }
    .text div{ 
        display:flex;
        align-items: center;
        margin:15px 0;
    }
    .text div img{
        width:30px;
        height:30px;
        margin-left:5px;
    }
    .text div span{
        width: 100%;
        height:100%;
        padding:10px;
        border-bottom:1px solid #0000003d;
    }
</style>