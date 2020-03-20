// 功能：socket.io服务器
// 创建web服务器
var app = require("http").createServer();
// 创建socket.io对象
var io = require("socket.io")(app);
// 监听端口 4000
app.listen(4000);
// 为io对象事件绑定事件connection
io.on("connection",(socket)=>{
    console.log("有客户连接到服务器了...");
    // 绑定事件
    // 获取客户端数据
    socket.on("abc",(data)=>{
        console.log("客户发来的数据："+data);
    })



    // 向客户端发送数据
    // 触发事件cba
    socket.emit("cba","只是因为在人群中都看了你一眼，再也没能忘掉你容颜")

    // 功能三：服务器发送广播消息
    // 客户端绑定 nba
    // 服务器触发 nba 不同
    io.emit("nba","大家好这里是-我也不知道这是哪");
}); 