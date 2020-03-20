<template>
    <div class="container">
        <!-- 顶部标题 -->
        <div class="title">
            <button @click="fh">
                <img src="../../assets/fh.png">
            </button>
            <div></div>
            <span>待审核</span>
        </div>
        <div class="title2"></div>
        <!-- 待审批列表 -->
        <div class="list">
            <table></table>
            <div class="content" v-for="(item,i) of list" :key="i">
                <p>发 起 人: {{item.user_name}}</p>
                <p>单据编号: {{item.serial}}</p>
                <p>单据类型: {{item.type}}</p>
                <p>申请日期: {{new Date(item.stime).toLocaleString('chinese',{hour12:false})}}</p>
                <p>审核状态: 审核中</p>
                <p><button @click="check(i)">查看并审核</button></p>
            </div>
        </div>
        <div v-show="list.length==0" class="nullImg">
            <img src="../../assets/null.jpg">
            <p>空空如也</p>
        </div>
        <!-- 点击查看详情出现灰色遮罩层 -->
        <div class="mask" :style="dblock"></div>
        <!-- 点查看详情出现弹框审核或者退回 -->
        <div class="details" :style="dblock">
            <p>单据详情</p>
            <p>发 起 人: {{details.user_name}}</p>
            <p>单据编号: {{details.serial}}</p>
            <p>单据类型: 出差申请单</p>
            <p>出发城市: {{details.origin}}</p>
            <p>目的城市: {{details.destination}}</p>
            <p>开始时间: {{details.startdate}}</p>
            <p>结束时间: {{details.enddate}}</p>
            <p>费用预估: {{details.expense}}</p>
            <p>出差事由: {{details.remark}}</p>
            <p>审批意见:</p>
            <textarea name="spyj" cols="30" rows="10" v-model="spyj"></textarea>
            <p>
                <button @click="handle(1)">同意</button>
                <button @click="handle(0)">拒绝</button>
                <button @click="cancel">取消</button>
            </p>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            // serial:"",  //工作流编号
            // stime:"",    //单据提交时间
            // type:""
            list:[],
            details:{},
            dblock:{display:""},
            spyj:""
        }
    },
    methods:{
        fh(){
            this.$router.go(-1);
        },
        handle(bool){
            var spyj=this.spyj;
            var expense=this.details.expense;
            var serial=this.details.serial;
            var faqr=this.details.user_name  //工作流发起人
            if(!spyj&&bool==1){
                spyj="同意"
            }
            if(!spyj&&bool==0){
                spyj="拒绝"
            }
            var params={bool,spyj,expense,serial,faqr}  
            this.axios.get('handle',{params}).then(res=>{
                if(res.data.code==1){
                    this.$toast("审批成功")
                    this.loadMore()
                }else{
                    this.$toast("退回成功")
                    this.loadMore()
                }
            })
        },
        loadMore(){
            this.axios.get('waitconfirm').then(res=>{
                // console.log(res.data)
                this.list=res.data;
                this.dblock.display="none"
            }).catch(err=>{
                console.log(err)
            })
        },
        check(i){
            this.details=this.list[i]
            this.dblock.display="block"
        },
        cancel(){
            this.dblock.display="none"
        }
    },
    created(){
        this.loadMore()
    }
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
        position:fixed;
    }
    .title2{
        width:100%;
        height:58px;
    }
    .title button{
        background: transparent;
        border:0;
        outline:0;
        width:20%;
    }
    .title div{
        width:22%;
    }
    .title img{
        width:22px;
    }
    .list{
        background:#eee;
        padding: 6px;
        height:100%;
    }
    .content p:last-child{
        text-align: right;
    }
    .content p{
        margin:0;
    }
    .content p+p{
        margin-top:10px;
    }
    .content{
        background:#fff;
        padding:12px;
        color:#666;
        font-size:15px;
        margin-bottom:6px;
    }
    .content button{
        border-radius: 30px;
        color:tomato;
        border:0;
        outline:0;
        font-size:13px;
        height:30px;
        font-weight: 600;
    }
    
    .mask{
        width:100%;
        height: 1000px;
        background:rgba(0,0,0,.5);
        position:fixed;
        top:0;
        display: none;
    }
    .details{
        position:fixed;
        width:80%;
        height:550px;
        top:60px;
        left:50%;
        margin-left: -40%;
        background:#fff;
        border-radius: 30px;
        padding:10px 20px;
        box-sizing: border-box;
        display: none;
    }
    .details p:first-child{
        text-align: center;
        font-size:20px;
    }
    .details p:last-child{
        display: flex;
        justify-content:space-around;
    }
    .details button{
        background:#3f80fe;
        color:#fff;
        border-radius: 30px;
        height:30px;
        width:60px;
        border:0;
        outline: 0;
    }
    .details p{
        margin:10px 0;
    }
    .details textarea{
        height:60px;
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