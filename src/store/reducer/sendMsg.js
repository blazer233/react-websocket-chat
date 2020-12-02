const defaultState = {
  message: "",
  ChatList: [],
};
export default (state = defaultState, action) => {
  if (action.type === "CHATLIST") {
    return {
      ...state,
      message: action.message,
    };
  } else if (action.type === "INITCHAT") {
    return {
      ...state,
      ChatList: action.ChatList,
    };
  }
  return defaultState;
};
