export const createStore = (reducer, middlewares = []) => {
  let store;
  const handler = [];

  const dispatch = (action) => {
    store = reducer(store, action);
    handler.forEach((listener) => listener());
  };

  const getState = () => store;

  const subscribe = (listener) => handler.push(listener);

  let lastDispatch = dispatch;

  Array.from(middlewares)
    .reverse()
    .forEach((middleware) => {
      lastDispatch = middleware(store)(lastDispatch);
    });

  return {
    dispatch: lastDispatch,
    getState,
    subscribe,
  };
};
