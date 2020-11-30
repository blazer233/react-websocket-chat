import React, { useState, useRef, useLayoutEffect } from "react";
import "./index.css";
import { HandleChatList, Avatars } from "./components";
import { sendText } from "../store/reducer/sendMsg";
import { connect } from "react-redux";
import { Input, message } from "antd";

function ChatRoom({ ws: wws, userName, avatar, userinfos, sendText }) {
  const area = useRef();
  const [chatMsg, setChatMsg] = useState("");
  const [tip, setTip] = useState(new Date().toLocaleDateString());
  const [ws, setws] = useState({});
  const [chatList, setChatList] = useState([]);
  useLayoutEffect(() => {
    wws && initWs();
    area.current.scrollTop = area.current.scrollHeight;
  }, [JSON.stringify(ws)]);
  const initWs = () => {
    wws.onmessage = msg => {
      setws(wws);
      const data = JSON.parse(msg.data);
      if (data.type === "CHAT") {
        setChatList(data.message);
        return;
      }
      message.success(data.message);
    };
    ws.onerror = error => console.log(error);
  };
  const onsubmit = () => {
    // sendText(
    //   JSON.stringify({
    //     type: "CHAT",
    //     userName,
    //     chatMsg,
    //     avatar,
    //   })
    // );
    ws.send(
      JSON.stringify({
        type: "CHAT",
        userName,
        chatMsg,
        avatar,
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

export default connect(store => store.combine, { sendText })(ChatRoom);
