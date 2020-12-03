import React from "react";
import { Input, Button, Steps } from "antd";
import { UserOutlined } from "@ant-design/icons";
const { Step } = Steps;
let imgArr = [
  require("./assets/img/1.jpg"),
  require("./assets/img/2.jpg"),
  require("./assets/img/3.jpg"),
  require("./assets/img/4.jpg"),
  require("./assets/img/5.jpg"),
];
export const comthings = () => {};
export const emoji = "😄 😃 😀 😊 😉 😍 😘 😚 😗 😙 😜 😝 😛 😳 😁 😔 😌 😒 😞 😣 😢 😂 😭 😪 😥 😰 😅 😓 😩 😫 😨 😱 😠 😡 😤 😖 😆 😋 😷 😎 😴 😵 😲 😟 😦 😧 😈 👿 😮 😬 😐 😕 😯 😶 😇 😏 😑 👲 👳 👮 👷 💂 👶 👦 👧 👨 👩 👴 👵 👱 👼 👸 😺 😸 😻 😽 😼 🙀 😿 😹 😾 👹 👺 🙈 🙉 🙊 💀 👽 💩 🔥 ✨ 🌟 💫 💥 💢 💦 💧 💤 💨 💛".split(
  " "
);
export const HandleChatList = ({ userName, chatList, area }) =>
  chatList.map((item, index) => (
    <div
      key={index}
      ref={area}
      className={userName == item.userName ? "parentLabel" : "otherLabel"}
    >
      <div>
        <div
          className={
            userName == item.userName ? "chat__userNameR" : "chat__userNameL"
          }
        >
          {item.userName}
        </div>
        <div
          className={userName == item.userName ? "chat_groupR" : "chat_groupL"}
        >
          <img src={item.avatar} className="chat_img" />
          <div
            className={`chat__message ${
              userName == item.userName ? "rightLabel" : "leftLabel"
            }`}
          >
            {item.msg.startsWith("blob:http://localhost") ? (
              <img src={item.msg} className="img-src" />
            ) : (
              item.msg
            )}
          </div>
          <span
            className={
              userName == item.userName ? "span_icon_right" : "span_icon_left"
            }
          ></span>
        </div>
      </div>
    </div>
  ));

export const Avatars = ({ userinfos }) => (
  <div className="chatroom__userchat">
    <div className="chatroom__single">
      {userinfos.map((i, index) => (
        <div key={index}>
          <img src={i.avatar} />
          <span>{i.userName}</span>
        </div>
      ))}
    </div>
  </div>
);

export const HandleDomShow = ({
  current,
  setUserName,
  avatar,
  userName,
  setAvatar,
  setCurrent,
}) => {
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
export const NextButton = ({ setCurrent, handleClick, current }) => (
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
);
export const StepsDom = ({ current }) => (
  <Steps size="small" current={current}>
    <Step title="输入用户名" />
    <Step title="点击头像下一步" />
    <Step title="确认信息" />
  </Steps>
);
