// 功能：多对多聊天室 
// 创建web服务器
var app = require("http").createServer();
// 创建io对象
var io = require("socket.io")(app);
// 绑定监听端口 4000
app.listen(4000);
// 创建变量保存客户端数量
var clientCount = 0;
// 为io对象绑定事件 connetction 连接
io.on("connection",(socket)=>{
    console.log("1.客户连接成功");
    // 6.让客户数量加1
    clientCount++;
    // 7.创建字符串nickname
    var nickname = "user:"+clientCount;
    // nickname += " comes in";
    // 8.广播 enter 昵称
    io.emit("enter",nickname+" comes in");
    // 10:接收客户发来的消息 message
    socket.on("message",(data)=>{
        // 11:向所有客户发广播 list
        io.emit("list",nickname+"say : "+data);
    })
    // 12接收客户离开事件 disconnect
    socket.on("disconnect",(data)=>{
        // 14发送广播消息 leave
        io.emit("leave",nickname+"leave");
    })
    
})
