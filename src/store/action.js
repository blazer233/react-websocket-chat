const setChatList = message => ({
  type: "CHATLIST",
  message,
});

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

export const sendText = arg => async getState => {
  const { ws } = getState().combine;
  ws.send(JSON.stringify(arg));
};
