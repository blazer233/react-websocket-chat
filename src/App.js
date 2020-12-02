import React, { useState, useEffect } from "react";
import { initSocket, enterSocket } from "./store/action/EnterAction";
import { connect } from "react-redux";
import "./App.css";
import "antd/dist/antd.css";
import { message } from "antd";
import { HandleDomShow, NextButton, StepsDom } from "./components";
const App = ({ history, status, initSocket, messageAlert, enterSocket }) => {
  const [current, setCurrent] = useState(0);
  const [userName, setUserName] = useState("");
  const [avatar, setAvatar] = useState("");
  useEffect(() => {
    initSocket();
    messageAlert && message.info(messageAlert);
    status && history.push({ pathname: "/chatRoom" });
  }, [messageAlert, status]);
  const handleClick = current => {
    if (current == 0) {
      if (!userName) return message.error("请输入用户名！");
      setCurrent(current + 1);
    } else if (current == 2) {
      enterSocket(userName, avatar);
    }
  };

  return (
    <div className="App">
      <div className="app__step">
        <StepsDom current={current} />
      </div>
      <div className="app__input">
        <div className="AItem">
          <HandleDomShow
            current={current}
            avatar={avatar}
            userName={userName}
            setUserName={setUserName}
            setAvatar={setAvatar}
            setCurrent={setCurrent}
          />
        </div>
        <NextButton
          current={current}
          setCurrent={setCurrent}
          handleClick={handleClick}
        />
      </div>
    </div>
  );
};

export default connect(store => store.combine, {
  initSocket,
  enterSocket,
})(App);
