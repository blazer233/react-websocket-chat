export default ({ dispatch, getState }) => next => action =>
  typeof action === "function" ? action(dispatch, getState) : next(action);
//fn(store)(store.dispatch)(action)
/**
 * action 是个 function ，就故意执行 action , 而不执行 next(action) ,
 * 等于让 store.dispatch  失效了,同时将dispatch, getState传到应用action的函数中
 * 让其在函数内store.dispatch(action) 把 dispatch
 * 返回给用户，让用户自己调用，正常使则按照普通action处理
 */
