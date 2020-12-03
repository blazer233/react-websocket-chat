import { changemsg, combin, changecom } from "./action";
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
      dispatch(changemsg({ message }));
    };
  };
};
export const enterSocket = (userName, avatar) => (dispatch, getState) => {
  const { ws } = getState().combine;
  ws.send(
    JSON.stringify({
      type: "LOGIN",
      userName,
      avatar,
    })
  );
  ws.onmessage = ({ data }) => {
    const { type, message, userinfo: userinfos } = JSON.parse(data);
    if (type == "LOGIN_SUCCESS") {
      dispatch(combin({ userName, avatar }));
      dispatch(changecom({ message, userinfos }));
      return;
    } else {
      dispatch(changemsg({ message }));
    }
  };
};
