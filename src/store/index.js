import { createStore, applyMiddleware } from "./core";
import combineReducers from "./core/combineReducers";
import combine from "./reducer/combine";
import sendmsg from "./reducer/combine";
import logger from "redux-logger";
const reducer = combineReducers({
  combine,
  sendmsg,
});
const store = createStore(reducer, applyMiddleware(logger));
export default store;
