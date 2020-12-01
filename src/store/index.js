import { createStore, applyMiddleware } from "./core";
import combineReducers from "./core/combineReducers";
import thunk from "./core/thunk";
import combine from "./reducer/combine";
import { sendText } from "./reducer/sendMsg";
import logger from "redux-logger";
const reducer = combineReducers({
  combine,
  sendText,
});
const store = createStore(reducer, applyMiddleware(thunk, logger));
export default store;
