import { Component } from '@core';

export default class ItemAppender extends Component {
  render() {
    return `<input type="text" class="appender" placeholder="아이템 내용 입력" />`;
  }

  setEvent() {
    this.addEvent('keyup', '.appender', (e) => {
      if (e.key !== 'Enter') {
        return;
      }
      this.props.addItem(e.target.value);
    });
  }
}
