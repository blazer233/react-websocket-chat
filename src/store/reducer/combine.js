const defaultState = {
  ws: {},
  userName: "",
  avatar: "",
  userinfos: [],
};
export default (state = defaultState, action) => {
  if (action.type === "SAVE_WS") {
    return { ...state, ws: action.ws };
  }
  if (action.type === "GROUP") {
    return { ...state, userinfos: action.userinfos };
  }
  if (action.type === "COMBINE") {
    return {
      ...state,
      userName: action.userName,
      ws: action.ws,
      avatar: action.avatar,
    };
  }
  return defaultState;
};
