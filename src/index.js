import './style.css';
import Component from './core/Component';
import Items from './components/Items';
import ItemAppender from './components/ItemAppender';
import ItemFilter from './components/ItemFilter';

class App extends Component {
  setup() {
    this.state = {
      isFilter: 0,
      items: [
        {
          seq: 1,
          contents: 'item1',
          active: false,
        },
        {
          seq: 2,
          contents: 'item2',
          active: true,
        },
      ],
    };
  }

  template() {
    return `
      <header data-component="item-appender"></header>
      <main data-component="items"></main>
      <footer data-component="item-filter"></footer>
    `;
  }

  mounted() {
    new ItemAppender(this.$target.querySelector('[data-component="item-appender"]'), {
      addItem: (value) => this.addItem(value),
    });
    new Items(this.$target.querySelector('[data-component="items"]'), {
      filteredItems: this.filteredItems,
      deleteItem: (seq) => this.deleteItem(seq),
      toggleItem: (seq) => this.toggleItem(seq),
    });
    new ItemFilter(this.$target.querySelector('[data-component="item-filter"]'), {
      filterItem: (isFilter) => this.filterItem(isFilter),
    });
  }

  get filteredItems() {
    return this.state.items.filter(
      ({ active }) =>
        (this.state.isFilter === 1 && active) ||
        (this.state.isFilter === 2 && !active) ||
        this.state.isFilter === 0
    );
  }

  addItem(contents) {
    const newItem = {
      seq: Math.max(0, ...this.state.items.map((v) => v.seq)) + 1,
      contents,
      active: false,
    };
    this.setState({ items: [...this.state.items, newItem] });
  }

  deleteItem(seq) {
    this.setState({ items: this.state.items.filter((item) => item.seq !== seq) });
  }

  toggleItem(seq) {
    this.setState({
      items: this.state.items.map((item) =>
        item.seq === seq ? { ...item, active: !item.active } : item
      ),
    });
  }

  filterItem(isFilter) {
    this.setState({ isFilter });
  }
}

const app = document.getElementById('app');
new App(app);
