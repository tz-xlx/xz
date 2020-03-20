<template>
    <div class="app-login">
        <h2 class="wel-login">欢迎登录OA办公系统</h2>
        <div class="cover">
            <div class="loginimg">
                <img src="../../assets/login.png">
            </div>
            <div class="l-form">
                <div>
                    <span>工号：</span>
                    <input v-model="uname" type="text" placeholder="请输入管理工号">
                </div>
                <div>
                    <span>密码：</span>
                    <input type="password" v-model="upwd" placeholder="请输入管理密码">
                </div>
                <mt-button class="btn" @click="login">登录</mt-button>
            </div>
       </div>
    </div>
</template>
<script>
export default {
    // 1.保存两个数据 uname upwd
     data() {
        return {
            uname:"", //用户名
            upwd:""   //密码
        }
    },
    // 2.添加函数login 完成登录
    methods: {
       login(){
        // 功能:完成用户登录操作
        // 1.创建正则表达式 3~12
        var reg = /^[a-z0-9]{3,12}$/i;
        // 2.获取用户输入 用户名/密码
        var u = this.uname;
        var p = this.upwd;
        // console.log(u+"_"+p);
        // 3.验证用户名如果不匹配 提示框
        if(!reg.test(u)){
            this.$messagebox("消息","工号格式不正确");
            return;
        }
        // 4.验证密码如不匹配 提示框
        if(!reg.test(p)){
             this.$messagebox("消息","密码格式不正确");
            return;
        }
        // 5.发送ajax请求完成登录验证
        var url = "login";
        var obj = {uname:u,upwd:p};
        this.axios.get(url,{params:obj}).then(res=>{//成功回调
            // console.log(res)
            if(res.data.code==1){
                this.$toast("登录成功")
                this.$router.push("/Index")
            }else{
                this.$toast("工号或密码有误")
            }
        })
        .catch(err=>{//失败回调
            console.log(err)
        })
       }
    },
}
</script>
<style scoped>
    .app-login{
        overflow: hidden;
        height:100vh;
        background-size:100% 100%;
        background: url(../../assets/login.jpg) no-repeat;
        text-align: center;
        width: 100%
    }
    /* 欢迎登录 */
    .wel-login{
        color: #fff;
        margin-top: 30%;
        font-weight: inherit;
        font-size: 24px
    }
    .cover{
        width: 70%;
        background: rgba(0, 0, 0, 0.3);
        margin:  0 auto;
        color: #fff;
        padding: 45px 0;
    }
    .l-form input{
        border: 0;
        background: 0;
        outline: none;/*输入框点击去边框*/
        color: #fff;
        width: 60%;
    }
    .l-form div{
        border-bottom: 1px solid #333; 
        margin: 30px 0;
    }
    .l-form{
        width: 80%;
        margin: 0 auto
    }
    .btn{
       width: 50%;
       background: #18a8f1;
       color: #fff;
    }
    input::-webkit-input-placeholder {
        color: rgba(238, 238, 238, 0.788);
      }
</style>