import ReconnectingWebsocket from "reconnectingwebsocket";
export const default_init = {
  ws: new ReconnectingWebsocket("ws:localhost:8081"),
  userName: "",
  avatar: "",
  status: null,
};
export const default_info = {
  message: "",
  userinfos: [],
};
export const default_chat = {
  message: "",
  chatList: [],
};
