import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import { HandleChatList, Avatars, comthings } from "../components";
import { initChat, exitChat } from "../store/action/RoomAction";
import { sendText } from "../store/action/ChatAction";
import { connect } from "react-redux";
import { FileImageOutlined } from "@ant-design/icons";
import { Input, message, Button } from "antd";
import "./index.css";

function ChatRoom({
  userName,
  avatar,
  userinfos,
  initChat,
  message: messageAlert,
  chatList,
  sendText,
  exitChat,
}) {
  const area = useRef();
  const chooseimg = useRef();
  const [chatMsg, setChatMsg] = useState("");
  const [tip, setTip] = useState(new Date().toLocaleDateString());
  useLayoutEffect(() => {
    initChat();
    messageAlert && message.info(messageAlert);
    console.log(area);

    area.current && area.current.scrollIntoView();
  }, [initChat, messageAlert]);
  useEffect(() => {
    const listener = ev => {
      ev.preventDefault();
      exitChat();
      window.localStorage.setItem(1, 2);
      ev.returnValue = "";
    };
    window.addEventListener("beforeunload", listener);
    return () => {
      window.removeEventListener("beforeunload", listener);
    };
  }, []);

  const onsubmit = () => {
    sendText({
      type: "CHAT",
      userName,
      chatMsg,
      avatar,
    });
    setChatMsg("");
    area.current.scrollIntoView();
  };
  const setImage = e => {
    const file = e.target.files[0];
    if (!file.type.includes("image/")) return;
    sendText({
      type: "CHAT",
      chatMsg: window.URL.createObjectURL(file),
      userName,
      avatar,
    });
    area.current.scrollIntoView();
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
        <div className="list__item">
          <button onClick={() => exitChat()}>退出</button>
          <div className="list__tip">{tip}</div>
          <div>
            <HandleChatList
              chatList={chatList}
              userName={userName}
              area={area}
            />
          </div>
        </div>
        <div className="list__input">
          <div className="things-content">
            <FileImageOutlined
              className="icon-img"
              onClick={() =>
                chooseimg.current.dispatchEvent(new MouseEvent("click"))
              }
            />
            <input
              className="crop-input"
              ref={chooseimg}
              type="file"
              name="image"
              accept="image/*"
              onChange={setImage}
            />
          </div>

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
    exitChat,
  }
)(ChatRoom);
