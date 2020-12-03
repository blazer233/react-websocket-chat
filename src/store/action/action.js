export const changecom = ({ message = "", userinfos = [] }) => ({
  type: "CHANGECOM",
  message,
  userinfos,
});
export const changemsg = ({ message = "" }) => ({
  type: "CHANGEMSG",
  message,
});
export const initchat = ({ message = "", chatList = [] }) => ({
  type: "INITCHAT",
  message,
  chatList,
});
export const combin = ({ userName, avatar }) => ({
  type: "COMBINE",
  userName,
  avatar,
  status: true,
});
