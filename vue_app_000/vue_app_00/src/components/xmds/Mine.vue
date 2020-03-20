<template>
    <div class="mine">
        <div class="personal">
            <span>个人信息</span>
        </div>
        <div class="portrait">
            <div @click="amend">
                <img :src="list.avatar" alt="+" >
            </div>
            <br>
            <span>{{list.user_name}}</span>
        </div>
        <div class="personage">
            <div>
                <img src="../../assets/mine/serial.png" alt="">
                <span>{{list.uname}}</span>
            </div>
            <div>
                <img src="../../assets/mine/section.png" alt="">
                <span>{{list.department}}</span>
            </div>
            <div>
                <img src="../../assets/mine/position.png" alt="">
                <span>{{list.position}}</span>
            </div>
            <div class="revisability" @click="amend">
                <p>
                    <img src="../../assets/mine/phone.png" alt="">
                    <span>{{list.phone}}</span>
                </p>
                <img src="../../assets/left_arrow.png" alt="">
            </div>
            <div class="revisability" @click="amend">
                <p>
                    <img src="../../assets/mine/email.png" alt="">
                    <span>{{list.email}}</span>
                </p>
                <img src="../../assets/left_arrow.png" alt="">
            </div>
        </div>
        <mt-button size="large" @click="signout">退出登录</mt-button>
    </div>
</template>
<script>
export default {
    created(){
        this.gain()
    },
    data() {
        return {
            list:[],
        }
    },
    methods: {
        gain(){
            var url="me";
            this.axios.get(url).then(res=>{
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
        amend(){
            this.$router.push("/Amend")
        },
        signout(){
            var url="signout";
            this.axios.get(url).then(res=>{
                if(res.data.code==-1){
                    this.$toast("退出成功")
                    this.$router.push("/Login")
                }
            })
            .catch(err=>{
                // console.log(err)
            })
        }
    },
}
</script>
<style scoped>
    .mine{
        display:flex;
        flex-wrap:wrap;
        justify-content: space-between;
        background: #ddd;
    }
    .personal{
        display:flex;
        align-items: center;
        justify-content: center;
        width:100%;
        height:48px;
        background: #3f80fe;
        color: #fff;
    }
    .portrait{
        text-align: center;
        width:100%;
        height:150px;
        background-image: url("../../assets/1.png");
        -moz-background-size:100% 100%;
        background-size:100% 100%
    }
    .portrait div{
        margin-top:30px;
        display: inline-block;
        width:70px;
        height:70px;
    }
    .portrait div img{
        border-radius: 50%;
        width:100%;
        height:100%;
    }
    .portrait span{
        color: #fff;
    }
    .personage p{
        display: flex;
        align-items: center;
        margin: 0;
    }
    .personage{
        margin-top:15px;
        width: 100%;
        background:#fff;
    }
    .personage div{
        display: flex;
        align-items: center;
        margin:0 15px;
        height: 50px;
    }
    .personage div:not(:last-child){
        border-bottom:1px solid #0000003d;
    }
    .personage .revisability{
        justify-content: space-between;
    }
    .personage img{
        width:30px;
        height:30px;
    }
    .personage .revisability>img{
        width:20px;
        height:20px;
    }
    .personage span{
        margin-left: 15px;
    }
    button{
        margin-top:15px;
        background:#fb2d3e;
        color:#fff;
    }
</style>
