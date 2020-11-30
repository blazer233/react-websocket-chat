const defaultState = {
  type: "CHAT",
  userName: "",
  avatar: "",
  chatMsg: "",
};
export const sendText = (state = defaultState, action) => {
  if (action.type === "sendText") {
    return {
      ...state,
      userName: action.userName,
      chatMsg: action.chatMsg,
      avatar: action.avatar,
    };
  } else if (action.type === "sendImg") {
    return {
      ...state,
      userName: action.userName,
      chatMsg: action.chatMsg,
      avatar: action.avatar,
    };
  }
  return defaultState;
};
