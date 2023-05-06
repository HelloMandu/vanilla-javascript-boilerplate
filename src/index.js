import './style.css';
import Component from './core/Component';

class App extends Component {
  setup() {
    this.state = { items: ['item1', 'item2'] };
  }

  template() {
    const { items } = this.state;

    const toItem = (item, key) => `
          <li>
            ${item}
            <button class="deleteBtn" data-index="${key}">삭제</button>
          </li>
          `;

    return `
        <ul>
          ${items.map(toItem).join('')}
        </ul>
        <button class="addBtn">추가</button>
    `;
  }

  setEvent() {
    this.addEvent('click', '.addBtn', () => {
      const { items } = this.state;
      this.setState({ items: [...items, `item${items.length + 1}`] });
    });

    this.addEvent('click', '.deleteBtn', ({ target }) => {
      const items = [...this.state.items];
      items.splice(target.dataset.index, 1);
      this.setState({ items });
    });
  }
}

const app = document.getElementById('app');
new App(app);
