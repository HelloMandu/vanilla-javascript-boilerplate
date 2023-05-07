export class Component {
  $target;
  props;
  state;

  #updateQueue = [];
  #rafId = null;
  #unmounted = null;

  constructor($target, props) {
    this.$target = $target;
    this.props = props;
    this.setup();
    this.#mount();
    this.setEvent();

    this.$target.addEventListener('DOMNodeRemovedFromDocument', (e) => this.#unmounted?.(e));
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
      this.#mount();
    }
  }

  #mount() {
    this.#unmounted?.();
    this.$target.innerHTML = this.render();
    this.#unmounted = this.mounted();
  }

  setup() {}

  render() {
    return '';
  }

  mounted() {}

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
