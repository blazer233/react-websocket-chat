import { initchat, changecom } from "./action";
export const initChat = () => (dispatch, getState) => {
  const { ws } = getState().combine;
  ws.send(
    JSON.stringify({
      type: "JOININ",
    })
  );
  ws.onmessage = ({ data }) => {
    const { type, message, chatMessage, userinfo: userinfos } = JSON.parse(
      data
    );
    switch (type) {
      case "CHAT":
        dispatch(initchat({ message, chatList: chatMessage }));
        break;
      case "JOININ":
        dispatch(changecom({ message, userinfos }));
        break;
      default:
        break;
    }
  };
};
