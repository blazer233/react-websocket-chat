import React from "react";
export const emoji = "😄 😃 😀 😊 😉 😍 😘 😚 😗 😙 😜 😝 😛 😳 😁 😔 😌 😒 😞 😣 😢 😂 😭 😪 😥 😰 😅 😓 😩 😫 😨 😱 😠 😡 😤 😖 😆 😋 😷 😎 😴 😵 😲 😟 😦 😧 😈 👿 😮 😬 😐 😕 😯 😶 😇 😏 😑 👲 👳 👮 👷 💂 👶 👦 👧 👨 👩 👴 👵 👱 👼 👸 😺 😸 😻 😽 😼 🙀 😿 😹 😾 👹 👺 🙈 🙉 🙊 💀 👽 💩 🔥 ✨ 🌟 💫 💥 💢 💦 💧 💤 💨 💛".split(
  " "
);
export const HandleChatList = ({ userName, chatList }) =>
  chatList.map((item, index) => (
    <div
      key={index}
      className={userName === item.userName ? "parentLabel" : "otherLabel"}
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
          className={userName === item.userName ? "chat_groupR" : "chat_groupL"}
        >
          <img src={item.avatar} className="chat_img" />
          <div
            className={`chat__message ${
              userName === item.userName ? "rightLabel" : "leftLabel"
            }`}
          >
            {item.msg}
          </div>
          <span
            className={
              userName === item.userName ? "span_icon_right" : "span_icon_left"
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
