<template>
    <div>
        <div class="title">
            <button @click="fh">
                <img src="../../assets/fh.png">
            </button>
            <div></div>
            <span>新建-出差申请单</span>
        </div>
        <div class="user">
            <div class="">
                <span>工 号:</span>
                <span>{{uname}}</span>
            </div>
            <div>
                <span>姓 名:</span>
                <span>{{user_name}}</span>
            </div>
            <div>
                <span>部 门:</span>
                <span>{{department}}</span>
            </div>
            <div>
                <span>直接主管:</span>
                <span>{{d_charge}}</span>
            </div>
        </div>
        <div class="list">
            <!-- <div>行程明细:</div> -->
            <div class="d-flex">
                <div class="dw"><span>*</span>出发城市:</div>
                <input type="text" v-model="origin"> 
            </div>
            <div class="d-flex">
                <div class="dw"><span>*</span>目的城市:</div> 
                <input type="text" v-model="destination">               
            </div>
            <div class="d-flex">
                <div class="dw"><span>*</span>开始时间:</div>
                <div class="date">
                <input type="date" v-model="startdate"> 
                <select name="starttime" id="s1" v-model="start">
                    <option value="上午">上午</option>
                    <option value="下午">下午</option>
                </select>
                </div>  
            </div>
            <div class="d-flex">
                <div class="dw"><span>*</span>结束时间:</div>
                <div class="date">
                <input type="date" v-model="enddate">
                <select name="endtime" id="s2" v-model="end">
                    <option value="上午">上午</option>
                    <option value="下午">下午</option>
                </select>
                </div>    
            </div>
            <div class="d-flex">
                <div class="dw"><span>*</span>费用预估:</div>               
                <input type="text" v-model="expense">
            </div>
            <div class="d-flex">
                <div class="dw"><span>*</span>出差事由:</div>
                <textarea name="t1" id="t1" cols="30" rows="10" v-model="cause"></textarea>
            </div>
        </div>
        <div class="btns">
            <button @click="submit">提 交</button>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            origin:"",          //出发地
            destination:"",     //目的地
            startdate:"",       //开始时间
            enddate:"",         //结束时间
            start:"上午",           //上午or下午
            end:"下午",             //上午or下午
            expense:"",         //费用
            cause:"" ,           //原因
            uname:"", //工号
            user_name:"",  //姓名
            department:"", //部门
            d_charge:"", //直接主管
            list:[]
        }
    },
    props:["bid"],
    created(){
        // console.log(this.bid)
        this.axios.get('enternewlist').then(res=>{
            //console.log(res.data)
            var {uname,user_name,department,d_charge}=res.data[0]
            this.uname=uname;
            this.user_name=user_name;
            this.department=department;
            this.d_charge=d_charge;
        }).catch(err=>{
            console.log(err)
        })
        // 获取填写的内容
        this.axios.get('modify',{params:{bid:this.bid}}).then(res=>{
            // console.log(this.bid)
            // console.log(res.data)
            this.list=res.data[0]
            // console.log(this.list)
            this.origin=this.list.origin;
            this.destination=this.list.destination;
            this.startdate=this.list.startdate;
            this.startdate=this.startdate.split(" ")[0]
            this.enddate=this.list.enddate;
            this.enddate=this.enddate.split(" ")[0]
            this.expense=this.list.expense;
            this.cause=this.list.remark;
        }).catch(err=>{
            console.log(err)
        })
    },
    methods: {
        fh(){
            this.$router.go(-1);
        },
        submit(){
            var origin=this.origin;          //出发地
            var destination=this.destination;   //目的地
            var startdate=this.startdate;     //开始时间
            var enddate=this.enddate;        //结束时间
            var start=this.start;         //上午or下午
            var end=this.end;            //上午or下午
            var expense=this.expense;        //费用
            var remark=this.cause;
            var s=s;
            var d_charge=this.d_charge;
            var uname=this.uname;
            var user_name=this.user_name;
            var bid=this.bid;
            //非空验证
            if(!origin){
                this.$toast("出发地不能为空")
                return;
            }
            if(!destination){
                this.$toast("目的地不能为空")
                return;
            }
            if(!startdate){
                this.$toast("开始时间不能为空")
                return;
            }
             if(!enddate){
                this.$toast("结束时间不能为空")
                return;
            }
            if(!expense){
                this.$toast("费用预估不能为空")
                return;
            }
            if(!remark){
                this.$toast("申请事由不能为空")
                return;
            }
            if(new Date(enddate).getTime()<new Date(startdate).getTime()){
                this.$toast("结束日期不能小于开始日期")
                return;
            }
            if(new Date(enddate).getTime()==new Date(startdate).getTime()&&start=="下午"&&end=="上午"){
                this.$toast("结束日期不能小于开始日期")
                return;
            }
            var params={origin,destination,startdate,enddate,start,end,expense,remark,s,d_charge,uname,user_name,bid};
            console.log(params)
            this.axios.get('modifylist',{params:params}).then(res=>{
                console.log(res)
                if(res.data.code==1){   
                    this.$toast("提交成功");
                    this.$router.push("/Schedule")   
                }
            }).catch(err=>{
                console.log(err)
            })      
      }
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
    .d-flex{
        display: flex;
        margin-top:10px;
        justify-content:space-around;
    }
    .list{
        padding:8px 28px;
    }
    .d-flex span{
        color:#f00;
    }
    .dw{
        width:25%;
        height:36px;
        line-height: 30px;
        color:#666;
    }
    .dw+input,.date input{
        width:70%;
        height:30px;
    }
    .date{
        width:70%;
        height:36px;
        line-height:36px;
    }
    .date select{
        width:27.7%;
        height:34px;
        border-left: 0;
    }
    textarea{
        width:70%;
        height:60px;
    }
    .user,.btns{
        padding:6px 28px;
    }
    .user div{
        margin-top:10px;
        color:#666;
        font-size:15px;
    }
    .user span{
        display: inline-block;   
    }
    .user div span:first-child{
        width:25%;
        text-align: center;
        
    }
    .user div span:last-child{
        width:70%;
        padding-left:10px;
    }
    .btns button{
        width:28%;
        height:36px;
        border-radius: 30px;
        border:0;
        outline:0;
        color:#fff;
        background:#3f80fe;
    }
    .btns{
        text-align: center;
        margin-top:10px;
    }
    .btns button+button{
        margin-left:20px;
    }
    input.bigsrk{
        height:60px;
    }
</style>
