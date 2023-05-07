import { Component } from '@core';
import ItemAppender from './ItemAppender';
import Items from './Items';
import ItemFilter from './ItemFilter';
import CounterWithRedux from '../counter/CounterWithRedux';
import CounterWithObservable from '../counter/CounterWithObservable';

export default class ItemList extends Component {
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
      <div data-component="counter"></div>
      <div data-component="counter2"></div>
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
    this.state.isFilter === 0 &&
      new CounterWithRedux(this.$target.querySelector('[data-component="counter"]'));
    this.state.isFilter === 0 &&
      new CounterWithObservable(this.$target.querySelector('[data-component="counter2"]'));
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
  }

  filterItem(isFilter) {
    this.setState({ isFilter });
  }
}
