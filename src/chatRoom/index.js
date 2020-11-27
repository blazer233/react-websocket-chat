import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import "./index.css";
import { connect } from "react-redux";
import { Input, message } from "antd";
const emoji = "😄 😃 😀 😊 😉 😍 😘 😚 😗 😙 😜 😝 😛 😳 😁 😔 😌 😒 😞 😣 😢 😂 😭 😪 😥 😰 😅 😓 😩 😫 😨 😱 😠 😡 😤 😖 😆 😋 😷 😎 😴 😵 😲 😟 😦 😧 😈 👿 😮 😬 😐 😕 😯 😶 😇 😏 😑 👲 👳 👮 👷 💂 👶 👦 👧 👨 👩 👴 👵 👱 👼 👸 😺 😸 😻 😽 😼 🙀 😿 😹 😾 👹 👺 🙈 🙉 🙊 💀 👽 💩 🔥 ✨ 🌟 💫 💥 💢 💦 💧 💤 💨 💛".split(
  " "
);

function ChatRoom({ ws, userName, avatar }) {
  const area = useRef();
  const [chatMsg, setChatMsg] = useState("");
  const [tip, setTip] = useState("tip");
  const [chatList, setChatList] = useState([]);
  useLayoutEffect(() => {
    area.current.scrollTop = area.current.scrollHeight;
    ws && initWs();
  }, [ws]);
  const initWs = () => {
    ws.onmessage = msg => {
      const data = JSON.parse(msg.data);
      if (data.type === "CHAT") {
        console.log(data);
        setChatList(data.message);
        return;
      }
      message.success(data.message);
    };
    ws.onerror = function (data) {
      console.log("发生了错误");
    };
  };
  const onsubmit = () => {
    console.log(area, area.current.scrollTop, area.current.scrollHeight);
    ws.send(
      JSON.stringify({
        type: "CHAT",
        userName,
        chatMsg,
      })
    );
    setChatMsg("");
    area.current.scrollTop = area.current.scrollHeight;
  };
  const handleChatList = () =>
    chatList.map((item, index) => (
      <div
        key={index}
        className={userName === item.userName ? "parentLabel" : ""}
      >
        <div>
          <div
            className={
              userName === item.userName ? "chat__userNameR" : "chat__userNameL"
            }
          >
            {item.userName}
          </div>
          <div
            className={`chat__message ${
              userName === item.userName ? "rightLabel" : "leftLabel"
            }`}
          >
            {item.msg}
          </div>
        </div>
      </div>
    ));
  return (
    <div className="chatroom__container">
      {/* 用户信息条 */}
      <div className="chatroom__userMsg">
        <img src={avatar} alt="" />
      </div>
      {/* 用户群聊条 */}
      <div className="chatroom__userchat">
        <div className="chatroom__single">
          <img src={avatar} alt="" />
          <span>{userName}</span>
        </div>
      </div>
      {/* 用户 */}
      <div className="list__content">
        <div className="list__name">
          <span>{userName}</span>
        </div>
        <div className="list__item" ref={area}>
          <div className="list__tip">{tip}</div>
          <div>{handleChatList()}</div>
        </div>
        <div className="list__input">
          <Input
            value={chatMsg}
            className="list__input--area"
            onChange={e => setChatMsg(e.target.value)}
            onPressEnter={onsubmit}
          />
        </div>
      </div>
    </div>
  );
}

export default connect(store => store, {})(ChatRoom);
