<template>
    <div class="bgcolor-e">
        <div class="title">
            <button @click="redraw">
                <img src="../../assets/redraw.png">
            </button>
            <p>申请状态</p>
            <button @click="home">
                <img src="../../assets/home.png">
            </button>
        </div>
        <div style="height:48px"></div>
        <div class="bgcolor-f" v-for="(item,i) of list" :key="i">
            <ul>
                <li>工作流编号: {{item.serial}}</li>
                <li>单据类型: {{item.type}}</li>
                <li>申请日期: {{item.stime | formatDate}}</li>
                <li>审核状态: {{item.status}}</li>
                <li>
                    <router-link :to="'/Submit/'+item.bid" id="modifier" v-show="item.status=='待提交'">修改</router-link>
                    <router-link :to="'/Details/'+item.bid" class="view">查看详情</router-link>
                </li>
            </ul>
        </div>
         <div v-show="list.length==0" class="nullImg">
            <img src="../../assets/null.jpg">
            <p>空空如也</p>
        </div>
    </div>
</template>
<script>
import { formatDate } from '../../../public/js/aaa.js'
export default {
    filters: {    //时间转换
        formatDate(time) {
            var date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd');
        }
    },
    data() {
        return {
            list:[],
        }
    },
    created(){
        // console.log(location.search);
        this.axios.get('myccs').then(res=>{
            // console.log(res.data)
            this.list=res.data;
           for(var i=0;i<this.list.length;i++){
               if(this.list[i].status==0){
                   this.list[i].status="待提交";
               }else if(this.list[i].status==1){
                   this.list[i].status="已提交";
               }else if(this.list[i].status==2){
                   this.list[i].status="审核中";
               }else if(this.list[i].status==3){
                   this.list[i].status="审批完成";
               }else{
                   this.list[i].status="已退回";
               }
           }
        }).catch(err=>{
            console.log(err)
        })
    },
    methods: {
        redraw(){
            this.$router.go(0);
        }, 
        home(){
            this.$router.push("/Index");
        },
        // details(){
            // eventVue.$emit("myFun",this.i)
            // this.$router.push("/Details");
        // }
    },
}
</script>
<style scoped>
    li{
        list-style: none;
    }
    .bgcolor-e{
        background: #eee;
    }
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
    /* 头部 */
    .bgcolor-f{
        display: flex;
        justify-content: center;
    }
    .bgcolor-f ul{
        background: #fff;
        width: 90%;
        padding-left: 15px;
    }
    .bgcolor-f ul li{
        padding: 15px 0;
        border-bottom: 1px solid #eee;
        color: #666;
    }
    /* 按钮li */
    .bgcolor-f ul li:last-child{
        display: flex;
        justify-content: flex-end;
    }
    /* 查看详情按钮 */
    .view{
        margin-right: 15px;
        width: 20%;
        height: 35px;
        text-align: center;
        line-height: 35px;
        text-decoration: none;
        background: #2196f3;
        color: #fff;
        font-size: 16px;
        border-radius: 5px;
        font-size: 14px;
    }
    /* 修改按钮 */
    #modifier{
        background: #2196f3;
        color: #fff;
        font-size: 14px;
        margin-right: 20px;
        height: 35px;
        width: 15%;
        line-height: 35px;
        text-align: center;
        text-decoration: none;
        border-radius: 5px;
    }
    .nullImg img{
        width: 100%;
        margin-top: 30%;
    }
    .nullImg p{
        margin-left: 40%;
        font-size: 20px;
        color: #666;
    }
</style>