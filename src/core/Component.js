export default class Component {
  $target;
  state;

  constructor($target) {
    this.$target = $target;
    this.setup();
    this.render();
    this.setEvent();
  }

  setup() {
    throw new Error('not implemented: setup state');
  }

  template() {
    return '';
  }

  render() {
    this.$target.innerHTML = this.template();
  }

  setEvent() {
    throw new Error('not implemented: setEvent');
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
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
