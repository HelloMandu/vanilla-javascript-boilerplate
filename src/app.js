import './style.css';
import Items from './components/Items';
import ItemAppender from './components/ItemAppender';
import ItemFilter from './components/ItemFilter';
import { Component } from '@core';

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
    console.log('mounted');
  }

  get filteredItems() {
    switch (this.state.isFilter) {
      case 0:
        return this.state.items;
      case 1:
        return this.state.items.filter(({ active }) => active);
      case 2:
        return this.state.items.filter(({ active }) => !active);
      default:
        return this.state.items;
    }
  }

  addItem(contents) {
    this.setState((prev) => ({
      ...prev,
      items: prev.items.concat({
        seq: Math.max(0, ...prev.items.map((v) => v.seq)) + 1,
        contents,
        active: false,
      }),
    }));
  }

  deleteItem(seq) {
    this.setState((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.seq !== seq),
    }));
  }

  toggleItem(seq) {
    this.setState((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.seq === seq ? { ...item, active: !item.active } : item
      ),
    }));
    this.addItem('test');
  }

  filterItem(isFilter) {
    this.setState((prev) => ({ ...prev, isFilter }));
  }
}

const app = document.getElementById('app');
new App(app);
