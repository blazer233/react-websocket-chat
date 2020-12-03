import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import { HandleChatList, Avatars } from "../components";
import { initChat } from "../store/action/RoomAction";
import { sendText } from "../store/action/ChatAction";
import { connect } from "react-redux";
import { Input, message } from "antd";
import "./index.css";

function ChatRoom({
  userName,
  avatar,
  userinfos,
  initChat,
  message: messageAlert,
  chatList,
  sendText,
}) {
  const area = useRef();
  const [chatMsg, setChatMsg] = useState("");
  const [tip, setTip] = useState(new Date().toLocaleDateString());
  useLayoutEffect(() => {
    initChat();
    area.current.scrollTop = area.current.scrollHeight;
  }, [initChat]);
  useEffect(() => {
    messageAlert && message.info(messageAlert);
  }, [messageAlert]);
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
export default connect(
  store => ({
    chatList: store.sendmsg.chatList,
    avatar: store.combine.avatar,
    userName: store.combine.userName,
    userinfos: store.message.userinfos,
    message: store.message.message,
  }),
  {
    initChat,
    sendText,
  }
)(ChatRoom);
