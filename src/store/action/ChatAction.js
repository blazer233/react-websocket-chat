export const sendText = arg => (dispatch, getState) => {
  const { ws } = getState().combine;
  ws.send(JSON.stringify(arg));
};
