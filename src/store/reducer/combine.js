import ReconnectingWebsocket from "reconnectingwebsocket";
const defaultState = {
  ws: new ReconnectingWebsocket("ws:localhost:8081"),
  userName: "",
  avatar: "",
  userinfos: [],
  messageAlert: "",
  status: null,
};
export default (state = defaultState, action) => {
  if (action.type === "CHANGESTATUS") {
    return { ...state, messageAlert: action.message, status: action.status };
  }
  if (action.type === "GROUP") {
    return { ...state, userinfos: action.userinfos };
  }
  if (action.type === "COMBINE") {
    return {
      ...state,
      userName: action.userName,
      avatar: action.avatar,
      status: action.status,
      messageAlert: action.message,
    };
  }
  return defaultState;
};
