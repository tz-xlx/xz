<template>
    <div class="container">
        <!-- 顶部标题 -->
        <div class="title">
            <button @click="fh">
                <img src="http://127.0.0.1:3030/fh.png">
            </button>
            <div></div>
            <span>考勤打卡</span>
        </div>
        <div class="user">
                <img :src="img" alt="">
            <div class="info">
                <span>{{user_name}}</span>
                <span>{{department}}</span>
            </div>
        </div>
        <!-- 定位信息 -->
        <div class="location">
            <img src="http://127.0.0.1:3030/dw.png" alt="">
            <span v-if="address3">{{address2}}</span>
            <span v-else>{{address1}}</span>
        </div>
        <!-- 地图 -->
        <div id="map"></div>
        <!-- 上班打卡 -->
        <div class="dk">
            <div class="d1">
                <div>上</div>
                <span>上班时间 9:00</span>
            </div>
            <button class="d2" @click="sbdk" :disabled="!address3">
                <p>上班打卡</p>
                <span>{{t}}</span>
            </button>
            <div class="d3">
                <span v-if="address3">{{msg}}</span>
            </div>
            <div class="d1">
                <div>下</div>
                <span>下班时间 18:00</span>
            </div>
        </div>
    </div>
</template>
<script>
import AMap from 'AMap' // 引入高德地图
export default {
methods:{
        //调用高德地图获取当前位置经纬度
        getPosition(){
        return new Promise((resolve,reject)=>{
            var address,lat,lng;
            var map = new AMap.Map('map', {
            zoom:11,//级别
            //center: [112.993614,28.168861],//中心点坐标
            viewMode:'3D'//使用3D视图
        });
        AMap.plugin('AMap.Geolocation', function() {
        var geolocation = new AMap.Geolocation({
            // 是否使用高精度定位，默认：true
            enableHighAccuracy: true,
            // 设置定位超时时间，默认：无穷大
            timeout: 10000,
            // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
            buttonOffset: new AMap.Pixel(10, 20),
            //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            zoomToAccuracy: true,     
            //  定位按钮的排放位置,  RB表示右下
            buttonPosition: 'RB'
        })
        geolocation.getCurrentPosition()
        AMap.event.addListener(geolocation, 'complete', onComplete)
        AMap.event.addListener(geolocation, 'error', onError)
        function onComplete(data){
            // console.log(data)
            address=data.formattedAddress
            lat=data.position.lat
            lng=data.position.lng
            //计算两点间的距离  112.993614,28.168861
            var p1=[112.99361,28.16886]
            var p2=[lng,lat]
            var dis = AMap.GeometryUtil.distance(p1, p2);
            var obj={address,dis}
            resolve(obj) 
        }
        function onError (data) {
            // 定位出错
        }
            })
        })
        },//此函数结束
        //上班打卡
        sbdk(){
            var t1=new Date().getHours()
            // console.log(t1)
            if(t1>9){
                this.$toast('已过上班打卡时间')
                return
            }
            if(this.dis>500){
                this.$toast('未到wifi考勤范围内,无法打卡')
            }
        },
        //获取当前时间
        getTime(){
            var time=new Date().toLocaleTimeString('chinese',{hour12:false})
                //console.log(time) 
                this.t=time;
        },
        //计算距离是否在打卡范围内 
            getDistance(){
                var dis=this.dis
                if(dis<500){
                    this.msg='已进入wifi考勤范围,请按时打卡'
                    // console.log(this.msg)
                }else{
                    this.msg='还未进入考勤范围,无法打卡'
                    // console.log(this.msg)
                }
        }, 
        fh(){
            this.$router.go(-1)
        },
    },
    data(){
        return {
            user_name:'',
            department:'',
            img:'',
            address1:'定位中...',
            address2:"",
            address3:false,
            msg:'已进入wifi考勤范围,请按时打卡',
            dis:0,
            t:''
        }
    },
    watch:{
        address(){
            // console.log(2)
        }
    },
    created(){
        setInterval(()=>{
            this.getTime();
        },1000)
        this.getTime();
        this.axios.get('/me').then(res=>{
            // console.log(res.data)
            var data=res.data[0];
            this.user_name=data.user_name;
            this.department=data.department;
            this.img=data.avatar;
        }).catch(err=>{
            console.log(err)
        })  
    },
    mounted(){
        this.getPosition().then(res=>{
            console.log(res)
            this.address2=res.address
            this.dis=res.dis;
            this.address3=true;
            this.getDistance()
        })   
    }, 
}
</script>
<style scoped>
    .d3{
        padding:10px 20px;
        color:#f00; 
        text-align: center;  
    }
    .d2{
        display: block;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width:120px;
        height:120px;
        background: #3f80fe;
        border-radius: 50%;
        margin:15px auto;
        border: 0;
        outline: 0;
        color:#fff;
    }
    .d2 p{
        font-size: 20px;
        margin-top: 0;
    }
    .d1{
        display: flex;
        align-items: center;
        height:50px;
        padding:5px 10px;
    }
    .d1 div{
        background:#3f80fe;
        border-radius: 50%;
        color:#fff;
        margin-right: 10px;
        width:30px;
        height:30px;
        text-align: center;
        padding-top: 5px;
        box-sizing: border-box;
    }
    .location{
        display: flex;
        align-items: center;
        height:50px;
        font-size: 14px;
        padding:5px 10px;
        border-bottom: 1px solid #aaa;
    }
    .location img{
        margin-right: 10px;
    }
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
    .user{
        width:100%;
        height:60px;
        display: flex;
        border-top:1px solid #aaa;
        border-bottom:1px solid #aaa;
        padding:5px 10px;
        align-items: center;
    }
    .user div{
        height:100%;
    }
    .user img{
        height:80%;
        border-radius: 50%;
    }
    .user span{
        color:black
    }
    .info{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin-left: 10px;
    }
    .info span:first-child{
        font-size: 18px;
        font-weight: 600;
    }
    .info span:last-child{
        color:#666;
    }
</style>