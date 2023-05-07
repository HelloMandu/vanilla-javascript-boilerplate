export class Observable {
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
    this.state = typeof updater === 'function' ? updater(this.state) : updater;
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
