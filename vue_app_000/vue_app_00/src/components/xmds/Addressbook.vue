<template>
    <div>
        <div class="addressbook">
            <div class="address">
                <span>通讯录</span>
            </div>
            <div style="height:48px;"></div>
            <mt-navbar v-model="selected" class="entire">
                <mt-tab-item id="1" class="qb">全部</mt-tab-item>
                <mt-tab-item id="2" class="qb">消息</mt-tab-item>
                <mt-tab-item id="3" class="qb">分组</mt-tab-item>
            </mt-navbar>
        <!-- tab-container -->
        <div style="height:49px"></div>
        <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
            <div>
                <div class="fixed">
                    <span v-for="(item,i) of abc" :key="i" @click="anchor" :data-id="item">{{item}}</span>
                </div>
                <div>
                    <div class="row">
                        <div v-show="w.indexOf(item) != -1 " v-for="(item,i) of abc" :key="i">
                            <div class="target" :id="item">{{item}}</div>
                            <div class="content" v-for="(a,i) of list" :key="i" v-show="a.first_char==item&&a.uid!=id" @click="detail" :data-uid="a.uid">
                                <img :src="a.avatar" alt="" :data-uid="a.uid">
                                <span class="uname" :data-uid="a.uid">{{a.user_name}}</span>
                                <span class="phone" :data-uid="a.uid">{{a.phone}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </mt-tab-container-item>
            </mt-tab-container>
        </div>
    </div>
</template>
<script>
export default {
    created(){
        this.odd()
        this.all()
        this.motion()
    },
    data() {
        return {
            w:"",
            id:-1,
            selected: '1',
            list:[],
            abc:["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
        }
    },
    methods: {
        detail(event){
            var uid=event.target.dataset.uid;
            // console.log(uid)
            this.$router.push("Linkman/"+uid);
        },
        all(){
            var url="all";
            this.axios.get(url).then(res=>{
                if(res.data.code==-1){
                    this.$toast("请先登录")
                    this.$router.push("/Login")
                    // console.log(res.data.code)
                }
                // console.log(res)
                this.list=res.data;
                // console.log(this.list)
                for(var i=0;i<this.list.length;i++){
                this.w+=this.list[i].first_char
                // console.log(this.w)
                }
            })
            .catch(err=>{
                console.log(err)
            })
        },
        odd(){
            var url="odd";
            this.axios.get(url).then(res=>{
                if(res.data.code==-1){
                    this.$toast("请先登录")
                    this.$router.push("/Login")
                    // console.log(res.data.code)
                }
                // console.log(res)
                this.id=res.data[0].uid
                // console.log(this.id)
            })
            .catch(err=>{
                console.log(err)
            })
        },
        anchor(event){
            var detaID=event.target.dataset.id;
            this.$toast(detaID)
            // var obj=document.querySelectorAll("#"+detaID);
            var obj=document.getElementById(detaID);
            // console.log(obj)
            var o;
            function offsetDis(obj) {
            var l = 0, t = 0;
            // console.log(obj)
            while(obj) {
            l = l + obj.offsetLeft + obj.clientLeft;
            t = t + obj.offsetTop + obj.clientTop;
            obj = obj.offsetParent;
            }
            o=t;
            return t;
            }
            offsetDis(obj)
            // console.log(o)
            scrollTo(0,o-100);
         },
        motion(event){
            for(var a of this.abc){
                var pid=document.querySelectorAll("#"+a)
            }
        }
    }
}
</script>
<style scoped>
    .address{
        display: flex;
        align-items: center;
        justify-content: center;
        width:100%;
        height:48px;
        background: #3f80fe;
        color: #fff;
        position: fixed;
        z-index: 9999;
    }
    .fixed{
        position: fixed;
        right: 5px;
        top:120px;
    }
    .entire{
        position: fixed;
        z-index:999999;
        width:100%; 
    }
    .qb>>>.mint-tab-item-label{
        font-size: 16px
    }
    .fixed span{
        margin-right:-5px;
        width:20px;
        display: block;
        color:rgba(0,0,0,0.5)
    }
    .row{
        margin-top:3px;
    }
    .row .target{
        height:20px;
        background:#eee;
    }
    .row img{
        width:45px;
        height:45px;
        border-radius: 50%;
        border:1px solid #333;
    }
    .row .content{
        display: flex;
        align-items: center;
        height:50px;
        border:1px solid #0000003d;
    }
    .row .content .uname{
        margin-left: 20px;
    }
    .row .content .phone{
        margin-left:auto;
        margin-right: 20%;
    }
    .row .content img{
        margin:0 10px;
    }
</style>