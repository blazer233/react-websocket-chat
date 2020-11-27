export const createStore = (reducer, defaultstate, enhancer) => {
  if (typeof defaultstate === "function" && typeof enhancer === "undefined") {
    enhancer = defaultstate;
    defaultstate = undefined;
  }
  if (enhancer) return enhancer(createStore)(reducer, defaultstate);
  const Listeners = [];
  const getState = () => defaultstate;
  const subscribe = listener => Listeners.push(listener);
  const dispatch = action => {
    defaultstate = reducer(defaultstate, action);
    Listeners.forEach(listener => listener());
    return action;
  };
  dispatch({});
  return {
    dispatch,
    subscribe,
    getState,
  };
};
//const store = createStore(reducer, compose(applyMiddleware(thunk, logger)));
export const compose = (...funcs) => arg =>
  funcs.reduceRight((a, b) => b(a), arg);
export const applyMiddleware = (...middlewares) => createStore => (...args) => {
  //args即reducer, defaultstate
  var store = createStore(...args);
  var dispatch = store.dispatch;
  var chain = [];
  var middlewareAPI = {
    getState: store.getState,
    dispatch: (...args) => dispatch(...args),
  };
  chain = middlewares.map(middleware => middleware(middlewareAPI));
  dispatch = compose(...chain)(store.dispatch);
  return {
    ...store,
    dispatch,
  };
};
