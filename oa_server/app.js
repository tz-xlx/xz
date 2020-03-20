//功能：服务器端程序
//1:下载四个模块
//  express			web服务器
//  mysql				mysql驱动
//  cors				处理跨域
//  express-session	会话session对象
//  npm i mysql express express-session cors
//2:加载四个第三方模块
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const session = require("express-session");

//3:配置数据库连接池:基本效率高保证
var pool = mysql.createPool({
   host:"127.0.0.1",
   user:"root",
   password:"",
   database:"oa666",
   port:3306,
   connectionLimit:20
})
//4:创建web服务器
var server = express();
//5:配置跨域  允许程序列表
//  http://127.0.0.1:8080
//  http://localhost:8080
server.use(cors({
   origin:["http://127.0.0.1:8080","http://localhost:8080"],
   credentials:true  //每次请求验证
}))
//6:配置session环境
server.use(session({
   secret:"128位安全字符串",
   resave:true,         //请求更新数据 
   saveUninitialized:true//保存初始数据
}));
//7:配置静态目录 pubic
//8.1:创建public
server.use(express.static("public"))
//9:启动监听端口  3030
server.listen(3030);



//功能一:用户登录  http://127.0.0.1:3030/login?uname=A0002&upwd=123456
server.get("/login",(req,res)=>{
 //1:获取参数uname/upwd
 var uname = req.query.uname;
 var upwd =  req.query.upwd;
 //2:创建sql语句
 var sql = "SELECT uid FROM oa666_user WHERE uname = ? AND upwd = ?";
 //3:执行sql语句
 pool.query(sql,[uname,upwd],(err,result)=>{
   if(err)throw err;
  //4:判断执行是否成功
   if(result.length==0){
     res.send({code:-1,msg:"用户名或密码有误"});
   }else{
     //4.1:登录成功后将登录凭证id保存session对象 
     //4.2:获取当前登录用户id
     var uid = result[0].uid;
     //4.3:将用户id保存session对象
     req.session.uid = uid;
     //console.log(req.session);
     //5:将结果发送脚手架 
     res.send({code:1,msg:"登录成功"});
   }  
 })
})



// 功能二 新增出差申请工作流
server.get("/newlist",(req,res)=>{
  var uid=req.session.uid    //验证ID,是否登录
  console.log(uid+'最新')
  if(!uid){
    res.send({code:-1,msg:"请先登录"})
    return;
  }
  var uid=req.session.uid   //验证ID
  var origin=req.query.origin;          //出发地
  var destination=req.query.destination;    //目的地
  var startdate=req.query.startdate;     //开始时间
  var enddate=req.query.enddate;        //结束时间
  var start=req.query.start;         //上午or下午
  var end=req.query.end;           //上午or下午
  var expense=req.query.expense;         //费用
  var cause=req.query.cause;
  var s=req.query.s;
  var d_charge=req.query.d_charge;
  var uname=req.query.uname;
  var user_name=req.query.user_name;
  var stime=new Date().getTime();
  var timer=new Date()
  var y=timer.getFullYear()
  var m=timer.getMonth()+1
  var d=timer.getDate()
  var spyj=""
  if(m<10) m="0"+m
  if(d<10) d="0"+d
  startdate=startdate+' '+start;
  enddate=enddate+' '+end;
  
  //获取上一次提交的日期和流水号
  pool.query('select serial,stime from oa666_bt where bid=(select max(bid) from oa666_bt)',(err,result)=>{
    if(err) throw err;
    console.log(result)
    //判断获取新的流水号
    if(result.length<1){ //如果查不到说明数据库为空,则从第一个开始
       var serial=1
    }else{
      var newdate=timer.toLocaleDateString()   //获取最新日期
      //console.log(newdate)
      //console.log(result[0].serial.substr(-2))
      //console.log(new Date(result[0].stime).toLocaleDateString());
      var prevdate=new Date(result[0].stime).toLocaleDateString(); //获取数据库最后一条数据的日期
      var serial=parseInt(result[0].serial.substr(-2)) //获取数据库最后一条数据的流水号
      if(newdate==prevdate){
        serial++   //如果是同一天只加流水号
      }else{
        serial=1;  //如果不是同一天则流水号从1开始
      }  
    }//新的流水号获取结束
    console.log(serial)
    if(serial<10) serial="00"+serial
    if(serial>=10&&serial<=100) serial="0"+serial
    serial=`ccsq${y}${m}${d}${serial}`  //完整流水号格式
    //获取所有的值插入数据库
    pool.query('insert into oa666_bt values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[null,uid,uname,user_name,serial,'出差申请单',origin,destination,startdate,enddate,s,stime,d_charge,cause,stime,expense,spyj],(err,result)=>{
      if(err) throw err;
      if(result.affectedRows>0){
        res.send({code:1,msg:"提交成功"})
      }
    })
  })  
})

//功能三 通讯录列表 http://127.0.0.1:3030/address_list
server.get('/address_list',(req,res)=>{
  //查询通讯录
  
  // var uid=req.session.uid    //验证ID
  // if(!uid){
  //   res.send({code:-1,msg:"请先登录"})
  //   return;
  // }
  pool.query("select * from oa666_user order by first_char asc",(err,result)=>{
    if(err) throw err;
    res.send(result)
  })
})

//功能四 我的  http://127.0.0.1:3030/me

server.get('/me',(req,res)=>{
  //查询通讯录
  var uid=req.session.uid    //验证ID
  if(!uid){
    res.send({code:-1,msg:"请先登录"})
    return;
  }
  pool.query("select uname,user_name,department,position,phone,email,avatar from oa666_user where uid= ? ",[uid],(err,result)=>{
    if(err) throw err;
    res.send(result)
  })
})


server.get('/all',(req,res)=>{
  //查询通讯录
  var uid=req.session.uid    //验证ID
  if(!uid){
    res.send({code:-1,msg:"请先登录"})
    return;
  }
  pool.query("select * from oa666_user",(err,result)=>{
    if(err) throw err;
    res.send(result)
  })
})

server.get('/odd',(req,res)=>{
  //查询通讯录
  var uid=req.session.uid    //验证ID
  if(!uid){
    res.send({code:-1,msg:"请先登录"})
    return;
  }
  pool.query("select uid from oa666_user where uid=?",[uid],(err,result)=>{
    if(err) throw err;
    res.send(result)
  })
})


  //http://127.0.0.1:3030/linkman?uid=1
  server.get('/linkman',(req,res)=>{
    console.log(123)
    var uid=req.session.uid;
  console.log(uid)
    if(!uid){
      res.send({code:-1,msg:"请先登录"})
      return;
    }
  console.log(3)
    var uid1=req.query.uid;
  console.log(uid1)
  //var sql=`select * from oa666_user where uid= ${uid1}`
    pool.query('select*from oa666_user where uid=?',[uid1],(err,result)=>{
      if(err) throw err;
      res.send(result)
    })
  })

//功能五 新增出差申请单页面用户信息显示
server.get('/enternewlist',(req,res)=>{
  //查询通讯录
  var uid=req.session.uid    //验证ID
  if(!uid){
    res.send({code:-1,msg:"请先登录"})
    return;
  }
  pool.query("select uname,user_name,department,d_charge from oa666_user where uid= ? ",[uid],(err,result)=>{
    if(err) throw err;
    res.send(result)
  })
})

//功能六 个人信息修改

server.get('/amend',(req,res)=>{
    var uid=req.session.uid;    //验证ID
    var phone=req.query.phone;
    var email=req.query.email;
    var avatar=req.query.avatar;
  console.log(phone,email,avatar)
    if(!uid){
      res.send({code:-1,msg:"请先登录"})
      return;
    }
    //var sql="UPDATE oa666_user SET phone=?,email=?,avatar=? WHERE uid=?"
    pool.query("UPDATE oa666_user SET phone=?,email=? WHERE uid=?",[phone,email,uid],(err,result)=>{
      if(err) throw err;
      res.send({code:1,msg:result})
    })
  })

//个人信息修改2
server.get('/update',(req,res)=>{
  var uid=req.session.uid; 
  var phone=req.query.phone;
  var email=req.query.email;
  var avatar=req.query.avatar;
  console.log(avatar)
  if(!uid){
        res.send({code:-1,msg:"请先登录"})
        return;
      }
  pool.query('update oa666_user set phone=?,email=?,avatar=? where uid=?',[phone,email,avatar,uid],(err,result)=>{
    if(err) throw err;
    if(result.affectedRows>0){
      res.send({code:1,msg:"修改成功"})
    }
  })
})

//功能七 出差申请单详情查看
server.get('/myccsq',(req,res)=>{
  var uid=req.session.uid    
  if(!uid){
    res.send({code:-1,msg:"请先登录"})
    return;
  }
  pool.query("select * from oa666_bt where uid= ? ",[uid],(err,result)=>{
    if(err) throw err;
    res.send(result)
  })
})

// 详情
server.get('/myccs',(req,res)=>{
  var uid=req.session.uid    
  if(!uid){
    res.send({code:-1,msg:"请先登录"})
    return;
  }
  pool.query("select * from oa666_bt where uid= ?",[uid],(err,result)=>{
    if(err) throw err;
    res.send(result)
  })
})

//功能八 出差申请单审批

server.get('/waitconfirm',(req,res)=>{
  var uid=req.session.uid    //验证ID
  if(!uid){
    res.send({code:-1,msg:"请先登录"})
    return;
  }
  pool.query("select user_name from oa666_user where uid= ? ",[uid],(err,result)=>{
    if(err) throw err;
    var user_name=result[0].user_name;
    pool.query("select*from oa666_bt where current= ? and (status=1 or status=2)",[user_name],(err,result)=>{
      if(err) throw err;
      res.send(result)
    })
  })
})

//功能九 同意 or 退回
server.get('/handle',(req,res)=>{
  var uid=req.session.uid    //验证ID
  if(!uid){
    res.send({code:-1,msg:"请先登录"})
    return;
  }
  var bool=req.query.bool;
  var spyj=req.query.spyj;
  var expense=req.query.expense;
  var serial=req.query.serial;
  var faqr=req.query.faqr; //获取发起人
  var ftime=new Date().getTime();
  pool.query('select isLeader,d_charge,position from oa666_user where uid=?',[uid],(err,result)=>{
    if(err) throw err;
    var isLeader=result[0].isLeader;
    var current=result[0].d_charge;
    var position=result[0].position;
    if(bool==1){
      // 审核同意
      if((expense<2000&&isLeader==1) || position=="总经理" ){
        pool.query('update oa666_bt set status=3,spyj=?,ftime=?,current=? where serial=?',[spyj,ftime,current,serial],(err,result)=>{
          if(err) throw err;
          res.send({code:1,msg:"审核成功"})
          return;
        })
      }else{
        pool.query('update oa666_bt set status=2,spyj=?,ftime=?,current=? where serial=?',[spyj,ftime,current,serial],(err,result)=>{
          if(err) throw err;
          res.send({code:1,msg:"审核成功"})
          return;
        })
      }
    }
    //审批退回  当前处理人变为发起人
    if(bool==0){
      pool.query('update oa666_bt set status=4,spyj=?,ftime=?,current=? where serial=?',[spyj,ftime,faqr,serial],(err,result)=>{
        if(err) throw err;
        res.send({code:0,msg:"退回成功"})
        return;
      })
    }  
  })
})

//功能十 退回工作流修改
//查看被退回的工作流
server.get('/modify',(req,res)=>{
  var uid=req.session.uid    //验证ID
  if(!uid){
    res.send({code:-1,msg:"请先登录"})
    return;
  }
  var bid=req.query.bid;
  pool.query('select * from oa666_bt where bid=?',[bid],(err,result)=>{
    if(err) throw err;
    res.send(result)
  })
})
//提交修改后的信息列表
server.get("/modifylist",(req,res)=>{
  var uid=req.session.uid    //验证ID,是否登录
  console.log(uid+'最新')
  if(!uid){
    res.send({code:-1,msg:"请先登录"})
    return;
  }
  var origin=req.query.origin;              //出发地
  var destination=req.query.destination;    //目的地
  var startdate=req.query.startdate;        //开始时间
  var enddate=req.query.enddate;            //结束时间
  // var start=req.query.start;                //上午or下午
  // var end=req.query.end;                    //上午or下午
  var expense=req.query.expense;            //费用
  // var cause=req.query.cause;                //事由
  var remark=req.query.remark;
  var bid=req.query.bid;
  // var d_charge=req.query.d_charge;          //当前审批人 (直接主管)
  // var stime=new Date().getTime();           //提交时间 和 最后更改时间
  // startdate=startdate+' '+start;
  // enddate=enddate+' '+end;  
    //获取所有的值插入数据库
    //提交时状态码改为1    出发地 目的地 开始时间 结束时间  状态 提交时间 当前审批人(直接主管) 事由  最后处理时间  费用 审批意见为 空
    pool.query('update oa666_bt set origin=?,destination=?,startdate=?,enddate=?,status=?,expense=?,remark=? where bid=?',[origin,destination,startdate,enddate,1,expense,remark,bid],(err,result)=>{
      if(err) throw err;
      if(result.affectedRows>0){
        res.send({code:1,msg:"修改成功"}) 
    }
  })  
})




//功能十 退回工作流修改
//退出登录
server.get('/signout',(req,res)=>{
      delete req.session.uid;
      res.send({code:-1,msg:"退出登录"});
    })
  










