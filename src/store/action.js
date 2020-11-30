export const combin_action = ({ ws, userName, avatar }) => ({
  type: "COMBINE",
  ws,
  userName,
  avatar,
});

export const group_action = userinfos => ({
  type: "GROUP",
  userinfos,
});

export const sendText = ({ userName, avatar, chatMsg }) => ({
  type: "CHAT",
  userName,
  avatar,
  chatMsg,
});
