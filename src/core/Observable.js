export default class Observable {
  state;
  observers = [];

  constructor(state) {
    this.state = state;
    this.observers = [];
  }

  #notify() {
    this.observers.forEach((observer) => observer(this.state));
  }

  setState(updater) {
    if (typeof updater === 'function') {
      this.state = updater(this.state);
    } else {
      this.state = updater;
    }
    this.#notify();
  }

  getState() {
    return this.state;
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }
}
