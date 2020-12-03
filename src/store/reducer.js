import combineReducers from "./core/combineReducers";
import { default_init, default_info, default_chat } from "./defaultState";
const combine = (state = default_init, action) => {
  if (action.type == "COMBINE") {
    return {
      ...state,
      userName: action.userName,
      avatar: action.avatar,
      status: action.status,
    };
  }
  return state;
};

const message = (state = default_info, action) => {
  if (action.type == "CHANGECOM") {
    return { ...state, message: action.message, userinfos: action.userinfos };
  }
  if (action.type == "CHANGEMSG") {
    return { ...state, message: action.message };
  }
  return state;
};

const sendmsg = (state = default_chat, action) => {
  if (action.type == "chatList") {
    return {
      ...state,
      message: action.message,
    };
  } else if (action.type == "INITCHAT") {
    return {
      ...state,
      chatList: action.chatList,
    };
  }
  return state;
};
export default combineReducers({
  combine,
  sendmsg,
  message,
});
