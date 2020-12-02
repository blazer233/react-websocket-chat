const express = require("express");
const app = express();
const webSocket = require("ws");
const SocketServer = require("ws").Server;
const server = app.listen(8081, () => console.log(`Listening on ${8081}`));
const wss = new SocketServer({ server });
// 定义用户的数组
const user = [];
const userinfo = [];
const chatMessage = [];
let userName = "";
wss.on("connection", connection => {
  connection.on("message", data => {
    try {
      const wsData = JSON.parse(data);
      console.log(wsData, "wsData");
      switch (wsData.type) {
        case "CONNECTION":
          connection.send(
            JSON.stringify({
              type: "CONNECTION_SUCCESS",
              message: "连接成功",
            })
          );
          break;
        case "LOGIN":
          // 循环当前用户数组，判断是否有这个用户
          let isReply = user.filter(item => item == wsData.userName);
          if (!isReply || isReply.length) {
            connection.send(
              JSON.stringify({
                type: "LOGIN_FAIL",
                message: "用户名发生重复，请重新尝试！",
              })
            );
          } else if (user.length == 12) {
            connection.send(
              JSON.stringify({
                type: "LOGIN_full",
                message: "连接数已满",
              })
            );
          } else {
            console.log(wsData, "userName");
            user.push(wsData.userName);
            userinfo.push(wsData);
            userName = wsData.userName;
            connection.send(
              JSON.stringify({
                type: "LOGIN_SUCCESS",
                message: "登陆成功",
                userinfo,
              })
            );
          }
          break;
        case "LOGINOUT":
          // user.splice(user.find(wsData.userName));
          connection.send(
            JSON.stringify({
              type: "LOGINOUT",
              message: `${userName}退出群聊`,
            })
          );
          break;
        case "JOININ":
          wss.clients.forEach(client => {
            if (client.readyState === webSocket.OPEN) {
              client.send(
                JSON.stringify({
                  type: "JOININ",
                  message: `${userName}加入群聊`,
                  user,
                })
              );
            }
          });
          // 每个用户登陆的时候，向他推送当前的聊天记录
          connection.send(
            JSON.stringify({ type: "CHAT", message: chatMessage })
          );
          break;
        case "CHAT":
          // chatMessage.push({
          //   userName: wsData.userName,
          //   msg: wsData.chatMsg,
          //   avatar: wsData.avatar,
          // });
          chatMessage.push({
            userName: wsData.userName,
            msg: wsData.chatMsg,
            avatar: wsData.avatar,
          });
          console.log(chatMessage);
          wss.clients.forEach(client => {
            if (client.readyState === webSocket.OPEN) {
              client.send(
                JSON.stringify({
                  type: "CHAT",
                  chatMessage,
                })
              );
            }
          });
      }
    } catch (err) {
      console.log(err);
    }
  });
});
