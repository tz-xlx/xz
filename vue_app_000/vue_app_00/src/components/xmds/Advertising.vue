<template>
    <div style="z-index:9999999">
        <div class="advertising">
            <img src="../../assets/timg.jpg">
            <a href="javascript:;" class="skip" @click="skip">
                <span>{{page}} s</span>
                <span style="margin-left:5px">跳过</span>
            </a>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
           page:5
        }
    },
    methods: {
        skip(){
            this.$router.push("/Login");
        }
    },
    created(){
        var time=setInterval(()=>{
          this.page--;
          if(this.page==0){
            this.$router.push("/Login");
            clearInterval(time);
          }
        },1000)
    },
}
</script>
<style scoped>
    .advertising{
        display: flex;
        justify-content: center;
        position: relative;
    }
    .advertising img{
        width: 100%;
        height: 100%;
    }
    .skip{
        display: flex;
        position: absolute;
        top: 5%;
        right: 7%;
        border: 1px solid #ccc;
        border-radius: 5px;
        width: 20%;
        height: 5%;
        background: rgba(238, 238, 238, 0.473);
        color: #fff;
        justify-content: center;
        align-items: center;
        text-decoration: none;
        font-size: 16px;
    }
   
</style>