import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import "./index.css";
import { HandleChatList, Avatars } from "./components";
import { connect } from "react-redux";
import { Input, message } from "antd";

function ChatRoom({ ws, userName, avatar, userinfos }) {
  const area = useRef();
  const [chatMsg, setChatMsg] = useState("");
  const [tip, setTip] = useState("tip");
  const [chatList, setChatList] = useState([]);
  useLayoutEffect(() => {
    ws && initWs();
    area.current.scrollTop = area.current.scrollHeight;
  }, [ws]);
  const initWs = () => {
    ws.onmessage = msg => {
      const data = JSON.parse(msg.data);
      if (data.type === "CHAT") {
        console.log(data, `ws.onmessage`);
        setChatList(data.message);
        return;
      }
      message.success(data.message);
    };
    ws.onerror = error => console.log(error);
  };
  const onsubmit = () => {
    console.log(ws);
    ws.send &&
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

  return (
    <div className="chatroom__container">
      {/* 用户信息条 */}
      <div className="chatroom__userMsg">
        <img src={avatar} alt="" />
      </div>
      {/* 用户群聊条 */}
      <Avatars userinfos={userinfos} />
      {/* 用户 */}
      <div className="list__content">
        <div className="list__name">
          <span>{userName}</span>
        </div>
        <div className="list__item" ref={area}>
          <div className="list__tip">{tip}</div>
          <div>
            {/* 内容列表 */}
            <HandleChatList chatList={chatList} userName={userName} />
          </div>
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
