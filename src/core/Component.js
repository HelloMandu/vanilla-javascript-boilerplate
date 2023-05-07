export class Component {
  $target;
  props;
  state;

  #updateQueue = [];
  #rafId = null;

  constructor($target, props) {
    this.$target = $target;
    this.props = props;
    this.setup();
    this.render();
    this.setEvent();
  }

  #batchUpdate() {
    for (const updater of this.#updateQueue) {
      if (typeof updater === 'function') {
        this.state = updater(this.state);
      } else {
        this.state = { ...this.state, ...updater };
      }
    }
    this.#updateQueue = [];
  }

  setup() {}

  mounted() {}

  template() {
    return '';
  }

  render() {
    this.$target.innerHTML = this.template();
    this.mounted();
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
      this.render();
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
