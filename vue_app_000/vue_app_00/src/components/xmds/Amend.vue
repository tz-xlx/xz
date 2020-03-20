<template>
    <div class="modification">
        <div class="head">
            <div @click="btn">
                <img src="../../assets/back.png" alt="">
            </div>
            <div>修改</div>
            <mt-button @click="finish()">完成</mt-button>
        </div>
        <div class="body">
            <div class="portrait">
                <span>头像</span>
                <span>
                    <div class="item_bock head_p">
                    <div class="head_img">
                        <img :src="userInfo.avatar" @click.stop="uploadHeadImg"/>
                    </div>
                    <input type="file" accept="image/*" @change="handleFile" class="hiddenInput"/>
                    </div>
                </span>
            </div>
            <div class="phone" @click="phonefocus">
                <span>电话</span>
                <input ref="inputphone" name="phone" type="text" v-model="phone">
                <i @click="empty1()"><img src="../../assets/delete.png" alt=""></i>
            </div>
            <div class="email" @click="emailfocus">
                <span>邮箱</span>
                <input ref="inputemail" name="email" type="text" v-model="email">
                <i @click="empty2()"><img src="../../assets/delete.png" alt=""></i>
            </div>
        </div>
        <img src="" />
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
            phone:"",
            email:"",
            userInfo: {
                avatar: ""
            }
        }
    },
    methods: {
        btn(){
            this.$router.go(-1)
        },
        empty1(){
            this.phone="";
        },
        empty2(){
            this.email="";
        },
        phonefocus(){
            this.$refs.inputphone.focus()
        },
        emailfocus(){
            this.$refs.inputemail.focus()
        },
        uploadHeadImg(){
            this.$el.querySelector('.hiddenInput').click()
        },
        handleFile(e){
            let $target = e.target || e.srcElement
            let file = $target.files[0]
            var reader = new FileReader()
            reader.onload = (data) => {
                let res = data.target || data.srcElement
                this.userInfo.avatar = res.result
            }
            reader.readAsDataURL(file)
        },
        gain(){
            var url="me";
            this.axios.get(url).then(res=>{
                if(res.data.code==-1){
                    this.$router.push("/")
                }
                // console.log(res)
                this.list=res.data[0];
                this.phone=this.list.phone;
                this.email=this.list.email;
                this.userInfo.avatar=this.list.avatar;
                // console.log(this.userInfo.avatar)
            })
            .catch(err=>{
                console.log(err)
            })
        },
        finish(){
            // console.log(this.userInfo.avatar)
            var reg=/^1[3-9]\d{9}$/i;
            var reg1=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9]+(\.[a-zA-Z0-9_-]+)$/
            var p=this.phone;
            var e=this.email;
            // console.log(p);
            // console.log(e);
            if(!reg.test(p)||p===""){
                this.$messagebox("消息","号码格式不正确");
                return;
            }
            if(!reg1.test(e)||e===""){
                this.$messagebox("消息","邮箱格式不正确");
                return;
            }
            var url="update";
            var obj={phone:p,email:e,avatar:this.userInfo.avatar};
            this.axios.get(url,{params:obj}).then(res=>{
                if(res.data.code==1){
                    this.$messagebox("消息","修改成功");
                    this.$router.push("index")
                }
            })
            .catch(err=>{
                this.$messagebox("消息","图片不能大于20KB");
            })
        }
    },
}
</script>
<style scoped>
    .modification{
        display: flex;
        flex-wrap:wrap;
        justify-content: space-between;
        background:#ddd;

    }
    .head{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width:100%;
        background:#3f80fe;
        height:58px;
        color:#fff;
        letter-spacing:6px;
        padding:0 10px;
    }
    .head img{
        width:20px;
        height:20px;
    }
    .head button{
        height:34px;
        font-size:16px;
        border: 0;
    }
    .body{
        width:100%;
        background:#fff;
    }
    .body>div{
        height:70px;
        margin:0 15px;
        padding:0 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .body>div:not(:last-child){
        border-bottom:1px solid #0000003d;
    }
    .portrait span img{
        width:50px;
        height:50px;
    }
    input{
        width:80%;
        height:27px;
        border:0;
    }
    input:focus{
        outline:0;
    }
    .item_bock {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height:50px;
    width: 50px;
    background: #fff;
    }
    .head_p {
    height:50px;
    }
    .head_img{
    height: 50px;
    }
    .head_img img{
    width:50px;
    height:50px;
    border-radius:50px
    }
    .hiddenInput{
    display: none;
    }
    i>img{
        width:20px;
        height:20px;
    }
</style>
