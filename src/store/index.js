import { createStore, applyMiddleware, compose } from "./core";
import thunk from "./core/thunk";
import reducer from "./reducer";
import logger from "redux-logger";

const store = createStore(reducer, compose(applyMiddleware(thunk, logger)));
export default store;
