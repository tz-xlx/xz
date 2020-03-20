 // 接收聊天服务器
 var cio = io("ws://127.0.0.1:3000");
 // 2.绑定事件enter 有新人进入
 cio.on("enter",(data)=>{
     // 2.1创建div元素
     var div = document.createElement("div");
     console.log(div)
     // 2.2将服务器数据保存div中
     div.innerHTML = data;
     // 2.3添加样式红色字
     div.style.color = "#f00";
     // 2.4将div追加到msg最后一个子元素
     var inputRs = document.getElementById("inputRs");
     inputRs.appendChild(div);
 })
 // 3.发送聊天内容给聊天器
 // 获取输入框
 var inputMsg = document.getElementById("inputMsg");
 // 获取发送按钮
  var inputBtn = document.getElementById("inputBtn");
 // 为发送按钮绑定点击事件
 inputBtn.onclick = function(){
     // 将输入框内容发送服务器
     cio.emit("message",inputMsg.value);
 }
 // 接收服务器广播它的聊天内容
cio.on("list",(data)=>{
    // 创建div
    var div = document.createElement("div");
    // 将聊天内容保存div
    div.innerHTML = data;
    // 添加样式 蓝色
    div.style.color = "#00f";
    // 将div添加msg元素
    var msg = document.getElementById("inputRs");
    msg.appendChild(div);
 })
// 5.绑定用户离开事件
cio.on("leave",(data)=>{
    // 创建div
    var div = document.createElement("div");
    // 将返回数据data保存div中间
    div.innerHTML = data;
    // 添加样式 #0f0
    div.style.color = "#0f0";
    // 将div追加inputRs
    var msg = document.getElementById("inputRs");
    msg.appendChild(div);
})