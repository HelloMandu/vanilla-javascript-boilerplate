import { createStore } from '@core';

// const middleware = () => (next) => (action) => {
//   setTimeout(() => {
//     console.log(1);
//     next(action);
//   }, 1000);
// };
//
// const middleware2 = () => (next) => (action) => {
//   setTimeout(() => {
//     console.log(2);
//     next(action);
//   }, 1000);
// };

const INCREMENT = 'counter/increment';
const DECREMENT = 'counter/decrement';

export const increment = () => ({ type: INCREMENT });
export const decrement = () => ({ type: DECREMENT });

const reducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case INCREMENT:
      return { ...state, count: state.count + 1 };
    case DECREMENT:
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
};

export const counterStore = createStore(reducer);
