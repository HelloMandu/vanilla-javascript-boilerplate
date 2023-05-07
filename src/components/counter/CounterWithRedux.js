import { Component } from '@core';
import { counterStore, decrement, increment } from './store/Counter';

export default class CounterWithRedux extends Component {
  template() {
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
    this.state = counterStore.getState();
  }

  mounted() {
    const updateFromCounter = (state) => this.setState(state);
    counterStore.subscribe(updateFromCounter);
    return () => counterStore.unsubscribe(updateFromCounter);
  }

  template() {
    return `
      <div>
        <span>${this.state.count}</span>
      </div>
    `;
  }
}

class Button extends Component {
  template() {
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
    this.addEvent('click', '.increase', () => counterStore.dispatch(increment()));
    this.addEvent('click', '.decrease', () => counterStore.dispatch(decrement()));
  }
}
