import React, { useState, useRef, useLayoutEffect } from "react";
import { HandleChatList, Avatars } from "../components";
import { sendText } from "../store/action/RoomAction";
import { connect } from "react-redux";
import { Input, message } from "antd";
import "./index.css";

function ChatRoom({ ws, userName, avatar, userinfos, sendText }) {
  const area = useRef();
  const [chatMsg, setChatMsg] = useState("");
  const [tip, setTip] = useState(new Date().toLocaleDateString());
  const [chatList, setChatList] = useState([]);
  useLayoutEffect(() => {
    ws && initWs();
    area.current.scrollTop = area.current.scrollHeight;
  }, []);
  const initWs = () => {
    ws.onmessage = ({ data }) => {
      const { type, chatMessage } = JSON.parse(data);
      if (type === "CHAT") {
        setChatList(chatMessage);
        return;
      }
    };
    ws.onerror = error => console.log(error);
  };
  const onsubmit = () => {
    sendText({
      type: "CHAT",
      userName,
      chatMsg,
      avatar,
    });
    setChatMsg("");
    area.current.scrollTop = area.current.scrollHeight;
  };

  return (
    <div className="chatroom__container">
      <div className="chatroom__userMsg">
        <img src={avatar} alt="" />
      </div>
      <Avatars userinfos={userinfos} />
      <div className="list__content">
        <div className="list__name">
          <span>{userName}</span>
        </div>
        <div className="list__item" ref={area}>
          <div className="list__tip">{tip}</div>
          <div>
            <HandleChatList chatList={chatList} userName={userName} />
          </div>
        </div>
        <div className="list__input">
          <Input
            value={chatMsg}
            className="list__input--area"
            onChange={e => setChatMsg(e.target.value)}
            onPressEnter={chatMsg && onsubmit}
          />
        </div>
      </div>
    </div>
  );
}

export default connect(store => store.combine, { sendText })(ChatRoom);
