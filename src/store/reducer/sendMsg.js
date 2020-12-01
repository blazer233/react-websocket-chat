const defaultState = {
  message: "",
};
export const sendText = (state = defaultState, action) => {
  if (action.type === "CHATLIST") {
    return {
      ...state,
      message: action.message,
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
