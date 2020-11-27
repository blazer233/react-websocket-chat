import React, { useState, useEffect } from "react";
import ReconnectingWebsocket from "reconnectingwebsocket";
import { combin_action } from "./store/action";
import { connect } from "react-redux";
import "./App.css";
import "antd/dist/antd.css";
import { Steps, Input, Button, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
const { Step } = Steps;
const statusLINK = {
  type: "CONNECTION",
  data: "link",
};
// E:\websocket-react\my-app\src\img\1.jpg
let imgArr = [
  require("./assets/img/1.jpg"),
  require("./assets/img/2.jpg"),
  require("./assets/img/3.jpg"),
  require("./assets/img/4.jpg"),
  require("./assets/img/5.jpg"),
];
function App({ history, combin_action }) {
  const [current, setCurrent] = useState(0);
  const [userName, setUserName] = useState("");
  const [avatar, setAvatar] = useState("");
  let ws = null;
  const handleClick = current => {
    if (current == 0) {
      if (!userName) return message.error("请输入用户名！");
      setCurrent(current + 1);
    } else if (current == 2) {
      initWs();
    }
  };
  const initWs = () => {
    ws = new ReconnectingWebsocket("ws:localhost:8081");
    ws.onopen = () => {
      ws.send(JSON.stringify(statusLINK));
      ws.onmessage = ({ data }) =>
        showMessage(JSON.parse(data).type, JSON.parse(data).message);
      ws.send(JSON.stringify({ type: "LOGIN", userName }));
      ws.onerror = error => console.log(error);
    };
  };
  const showMessage = (type, msg) => {
    if (type === "LOGIN_SUCCESS") {
      history.push({ pathname: "/chatRoom" });
      combin_action({ ws, userName, avatar });
      ws.send(
        JSON.stringify({
          type: "JOININ",
          userName,
        })
      );
    }
    if (type !== "LOGIN_SUCCESS") {
      type.includes("FAIL") && message.error(msg);
      message.info(msg);
    }
  };
  const handleDomShow = () => {
    switch (current) {
      case 0:
        return (
          <Input
            placeholder="请输入用户名"
            prefix={<UserOutlined />}
            onChange={e => {
              setUserName(e.target.value);
            }}
          />
        );
      case 1:
        return imgArr.map((i, index) => (
          <img
            src={i}
            onClick={() => {
              setAvatar(i);
              setCurrent(current + 1);
            }}
            alt="头像"
            key={index}
            className="img_Avatar"
          />
        ));
      case 2:
        return (
          <div className="AItem_fin">
            <img src={avatar} className="img_Avatar" />
            <div style={{ fontSize: "40px" }}>{userName}</div>
          </div>
        );
      default:
        break;
    }
  };
  return (
    <div className="App">
      <div className="app__step">
        <Steps size="small" current={current}>
          <Step title="输入用户名" />
          <Step title="点击头像下一步" />
          <Step title="确认信息" />
        </Steps>
      </div>
      <div className="app__input">
        <div className="AItem">{handleDomShow()}</div>
        <div>
          {current != 1 && (
            <Button className="app_btn" onClick={() => handleClick(current)}>
              {current == 0 ? "下一步" : "开始聊天"}
            </Button>
          )}
          {current == 1 || current == 2 ? (
            <Button
              className="app_btn"
              onClick={() => {
                setCurrent(current - 1);
              }}
            >
              上一步
            </Button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default connect(store => store, {
  combin_action,
})(App);
