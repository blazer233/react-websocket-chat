const io = require("socket.io-client");

export default () => {
  const socket = io.connect("http://localhost:3800");
  const join = user => socket.on("join", user);
  const off = () => socket.off("message");
  const login = (name, cb) => socket.emit("register", name, cb);
  const message = (msg, cb) => socket.emit("message", msg, cb);
  const leave = cb => socket.emit("leave", cb);

  socket.on("error", err => {
    console.log("received socket error:");
    console.log(err);
  });

  return {
    off,
    join,
    leave,
    message,
    login,
  };
};
