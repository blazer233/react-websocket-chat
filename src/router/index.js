import React from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import App from "../App";
import chatRoom from "../chatRoom";
import { connect } from "react-redux";
const myRouter = ({ ws, userName }) => {
  console.log(ws, userName);
  return (
    <BrowserRouter>
      <Route component={App} path="/App"></Route>
      <Route component={chatRoom} path="/chatRoom"></Route>
      <Redirect path="/" to="/App" exact />
    </BrowserRouter>
  );
};
// 懒加载路由

export default connect(store => store, {})(myRouter);
