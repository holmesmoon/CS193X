import Item from "./Item.js";

console.log("Loaded App module");

export default class App {
  constructor() {
    this._items = {};
    this._list = null;

    this._onAdd = this._onAdd.bind(this);
    this._onItemDelete = this._onItemDelete.bind(this);
    this._updateDoneCount = this._updateDoneCount.bind(this);
  }

  setup() {
    this._list = document.querySelector("#list");
    let addButton = document.querySelector("#addButton");
    addButton.addEventListener("click", this._onAdd);
    this._updateDoneCount();
  }

  _onAdd(event) {
    event.preventDefault();
    let form = document.querySelector("#addForm");
    let summary = form.summary.value;
    if (summary in this._items) {
      alert(`Duplicate item ${summary}`);
      return;
    }
    form.reset();

    let item = new Item(summary);
    item.addToList(this._list, this._onItemDelete, this._updateDoneCount);
    this._items[summary] = item;
    this._updateDoneCount();
  }

  _onItemDelete(item) {
    delete this._items[item.summary];
    this._updateDoneCount();
  }

  _updateDoneCount() {
    let items = Object.values(this._items);
    let done = items.filter(item => item.done).length;
    let total = items.length;
    document.querySelector("#doneCount").textContent = `${done} of ${total} items done`;
  }
}
