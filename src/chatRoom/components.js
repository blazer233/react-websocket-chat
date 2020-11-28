import React from "react";
export const emoji = "😄 😃 😀 😊 😉 😍 😘 😚 😗 😙 😜 😝 😛 😳 😁 😔 😌 😒 😞 😣 😢 😂 😭 😪 😥 😰 😅 😓 😩 😫 😨 😱 😠 😡 😤 😖 😆 😋 😷 😎 😴 😵 😲 😟 😦 😧 😈 👿 😮 😬 😐 😕 😯 😶 😇 😏 😑 👲 👳 👮 👷 💂 👶 👦 👧 👨 👩 👴 👵 👱 👼 👸 😺 😸 😻 😽 😼 🙀 😿 😹 😾 👹 👺 🙈 🙉 🙊 💀 👽 💩 🔥 ✨ 🌟 💫 💥 💢 💦 💧 💤 💨 💛".split(
  " "
);
export const HandleChatList = ({ userName, chatList }) =>
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
