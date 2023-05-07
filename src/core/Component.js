export class Component {
  $target;
  props;
  state;

  #updateQueue = [];
  #rafId = null;
  #unmount = null;

  constructor($target, props) {
    this.$target = $target;
    this.props = props;
    this.setup();
    this.render();
    this.setEvent();

    this.$target.addEventListener('DOMNodeRemovedFromDocument', (e) => this.#unmount?.(e));
  }

  #updateFromQueue() {
    return this.#updateQueue.reduce(
      (acc, updater) => (typeof updater === 'function' ? updater(acc) : { ...acc, ...updater }),
      this.state
    );
  }

  #batchUpdate() {
    const updatedState = this.#updateFromQueue();
    this.#updateQueue = [];
    const isEqual = JSON.stringify(this.state) === JSON.stringify(updatedState);
    if (!isEqual) {
      this.state = updatedState;
      this.render();
    }
  }

  setup() {}

  mounted() {}

  template() {
    return '';
  }

  render() {
    this.#unmount?.();
    this.$target.innerHTML = this.template();
    this.#unmount = this.mounted();
  }

  setEvent() {}

  setState(updater) {
    this.#updateQueue.push(updater);
    if (this.#rafId) {
      return;
    }
    this.#rafId = requestAnimationFrame(() => {
      this.#rafId = null;
      this.#batchUpdate();
    });
  }

  addEvent(eventType, selector, callback) {
    this.$target.addEventListener(eventType, (event) => {
      if (!event.target.closest(selector)) {
        return false;
      }
      callback(event);
    });
  }
}
