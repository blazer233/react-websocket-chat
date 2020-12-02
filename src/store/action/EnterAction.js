export const group_action = userinfos => ({
  type: "GROUP",
  userinfos,
});
export const initSocket = () => (dispatch, getState) => {
  const { ws } = getState().combine;
  ws.onopen = () => {
    ws.send(
      JSON.stringify({
        type: "CONNECTION",
        data: "link",
      })
    );
    ws.onmessage = ({ data }) => {
      const { message } = JSON.parse(data);
      dispatch({
        type: "CHANGESTATUS",
        message,
        status: false,
      });
    };
  };
};
export const enterSocket = (userName, avatar) => (dispatch, getState) => {
  console.log(getState());
  const { ws } = getState().combine;
  ws.send(
    JSON.stringify({
      type: "LOGIN",
      userName,
      avatar,
    })
  );
  ws.onmessage = ({ data }) => {
    const { type, message, userinfo } = JSON.parse(data);
    console.log(JSON.parse(data));
    console.log(type);
    userinfo && Array.isArray(userinfo) && dispatch(group_action(userinfo));
    if (type == "LOGIN_SUCCESS") {
      dispatch({
        type: "COMBINE",
        userName,
        avatar,
        message,
        status: true,
      });
      return;
    } else {
      dispatch({
        type: "CHANGESTATUS",
        message,
        status: false,
      });
    }
  };
};
export const initRoom = () => (dispatch, getState) => {
  console.log(getState());
  const { ws } = getState().combine;
  ws.onmessage = msg => {
    console.log(JSON.parse(msg.data));
    const { type, message: chatList } = JSON.parse(msg.data);
    if (type === "CHAT") {
      dispatch({
        type: "CHATROOM",
        chatList,
      });
      return;
    }
  };
  ws.onerror = error => console.log(error);
};
