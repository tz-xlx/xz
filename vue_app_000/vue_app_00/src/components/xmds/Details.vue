<template>
    <div class="bgcolor-e">
        <div class="title">
            <button @click="redraw">
                <img src="../../assets/fh.png">
            </button>
            <p>申请详情</p>
            <button @click="home">
                <img src="../../assets/home.png">
            </button>
        </div>
        <div style="height:48px"></div>
        <div class="bgcolor-f" v-for="(item,i) of list" :key="i" v-show="bid==item.bid">
            <ul>
                <li>工作流编号: {{item.serial}}</li>
                <li>单据类型: {{item.type}}</li>
                <li>出发城市: {{item.origin}}</li>
                <li>目的城市: {{item.destination}}</li>
                <li>开始时间: {{item.startdate}}</li>
                <li>结束时间: {{item.enddate}}</li>
                <li>工作流发起时间: {{item.stime | formatDate}}</li>
                <li>当前审批人: {{item.current}}</li>
                <li>摘要: {{item.remark}}</li>
                <li>工作流状态: {{item.status}}</li>
                <li>审批完成时间: {{item.ftime | formatDate}}</li>
                <li style="text-align:center">
                    <mt-button @click="printer" class="print" v-show="item.status=='审批完成'">打印</mt-button>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import { formatDate } from '../../../public/js/aaa.js'
export default {
    filters: {      //时间转换
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
    props:["bid"],
    created(){
         this.axios.get('myccsq',{params:{bid:this.bid}}).then(res=>{
            // console.log(res.data)
            // console.log(this.bid)
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
            this.$router.go(-1);
        }, 
        home(){
            this.$router.push("/Index");
        },
        printer(){
            this.$messagebox("消息","请连接打印设备");
        }
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
    .print{
        background: #2196f3;
        color: #fff;
        font-size: 14px;
        height: 35px;
        width: 25%;
        line-height: 35px;
        text-align: center;
        text-decoration: none;
        border-radius: 5px;
        letter-spacing: 4px;
    }
</style>