const defaultState = {
  ws: null,
  userName: "",
  avatar: "",
};
export default (state = defaultState, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  if (action.type === "SAVE_WS") {
    return { ...newState, ws: action.ws };
  }
  if (action.type === "SAVE_USERNAME") {
    return { ...newState, userName: action.userName };
  }
  if (action.type === "COMBINE") {
    return {
      ...newState,
      userName: action.userName,
      ws: action.ws,
      avatar: action.avatar,
    };
  }
  return defaultState;
};
