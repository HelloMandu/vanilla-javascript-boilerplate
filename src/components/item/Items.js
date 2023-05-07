import { Component } from '@core';

export default class Items extends Component {
  render() {
    return `
      <ul>
        ${this.props.filteredItems.map(this.toItem).join('')}
      </ul>
    `;
  }

  toItem({ contents, active, seq }) {
    return `
      <li data-seq="${seq}">
        ${contents}
        <button class="toggleBtn" style="color: ${active ? '#09F' : '#F09'}">
          ${active ? '활성' : '비활성'}
        </button>
        <button class="deleteBtn">삭제</button>
      </li>
    `;
  }

  setEvent() {
    this.addEvent('click', '.deleteBtn', (e) => {
      this.props.deleteItem(Number(e.target.closest('[data-seq]').dataset.seq));
    });

    this.addEvent('click', '.toggleBtn', (e) => {
      this.props.toggleItem(Number(e.target.closest('[data-seq]').dataset.seq));
    });
  }
}
