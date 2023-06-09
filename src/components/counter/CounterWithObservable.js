import { Component } from '@core';
import { counter } from './store/CounterObserver';

export default class CounterWithObservable extends Component {
  render() {
    return `
      <div data-component="count"></div>
      <div data-component="buttons"></div>
    `;
  }

  mounted() {
    new Count(this.$target.querySelector('[data-component="count"]'));
    new Button(this.$target.querySelector('[data-component="buttons"]'));
  }
}

class Count extends Component {
  setup() {
    this.state = counter.getState();
  }

  mounted() {
    const updateFromCounter = (state) => this.setState(state);

    counter.subscribe(updateFromCounter);
    return () => counter.unsubscribe(updateFromCounter);
  }

  render() {
    return `
      <div>
        <span>${this.state.count}</span>
      </div>
    `;
  }
}

class Button extends Component {
  render() {
    return `
      <button class="increase">
        증가
      </button>
      <button class="decrease">
        감소
      </button>
    `;
  }

  setEvent() {
    this.addEvent('click', '.increase', () =>
      counter.setState((prevState) => ({ count: prevState.count + 1 }))
    );
    this.addEvent('click', '.decrease', () =>
      counter.setState((prevState) => ({ count: prevState.count - 1 }))
    );
  }
}
