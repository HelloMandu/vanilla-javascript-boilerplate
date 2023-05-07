import Observable from '@core/Observable';

export const createStore = (reducer, middlewares = []) => {
  const store = new Observable(reducer(undefined, {}));

  const dispatch = Array.from(middlewares)
    .reverse()
    .reduce(
      (next, middleware) => middleware(store)(next),
      (action) => store.setState(reducer(store.getState(), action))
    );

  const getState = () => store.getState();

  const subscribe = (handler) => store.subscribe(handler);

  const unsubscribe = (handler) => store.unsubscribe(handler);

  return { dispatch, getState, subscribe, unsubscribe };
};
