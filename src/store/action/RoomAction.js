export const sendText = arg => (dispatch, getState) => {
  console.log(getState());
  const { ws } = getState().combine;
  ws.send(JSON.stringify(arg));
};
export const initChat = () => (dispatch, getState) => {
  const { ws } = getState().combine;
  console.log(getState());
  ws.onmessage = ({ data }) => {
    console.log(data);
    const { type, chatMessage: ChatList } = JSON.parse(data);
    if (type === "CHAT") {
      dispatch({
        type: "INITCHAT",
        ChatList,
      });
      return;
    }
  };
};
