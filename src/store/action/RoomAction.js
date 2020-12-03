import { initchat, changecom } from "./action";
export const initChat = () => (dispatch, getState) => {
  const { ws } = getState().combine;
  console.log(ws);
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

export const exitChat = () => (dispatch, getState) => {
  const { ws } = getState().combine;
  ws.send(
    JSON.stringify({
      type: "LOGINOUT",
    })
  );
  ws.onmessage = ({ data }) => {
    const { type, message, userinfo: userinfos } = JSON.parse(data);
    switch (type) {
      case "LOGINOUT":
        dispatch(changecom({ message, userinfos }));
        break;
      default:
        break;
    }
  };
};
