import { createStore, applyMiddleware } from "./core";
import reducer from "./reducer";
import logger from "redux-logger";
const store = createStore(reducer, applyMiddleware(logger));
export default store;
