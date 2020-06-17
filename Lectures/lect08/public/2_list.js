class Item {
  /* constructor is special keyword */
  constructor(summary) {
    this.summary = summary;
    this._checkbox = null;
    this._node = null;

    /* Bind event handlers */
    this._onDelete = this._onDelete.bind(this);
  }

  get done() {
    return this._checkbox && this._checkbox.checked;
  }

  addToList(list, delCallback, doneCallback) {
    this._delCallback = delCallback;
    let node = this._node = document.createElement("li");

    let checkbox = this._checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", doneCallback);
    node.appendChild(checkbox);

    let label = document.createElement("span");
    label.textContent = this.summary;
    node.appendChild(label);

    let delButton = document.createElement("button");
    delButton.classList.add("delButton");
    delButton.textContent = "Delete";
    delButton.addEventListener("click", this._onDelete);
    node.appendChild(delButton);

    list.appendChild(node);
  }

  _onDelete(event) {
    event.stopPropagation();
    this._node.remove();
    this._delCallback(this.summary);
  }
}

class App {
  constructor() {
    this._items = {};

    this._onAdd = this._onAdd.bind(this);
    this._onItemDelete = this._onItemDelete.bind(this);
    this._updateDoneCount = this._updateDoneCount.bind(this);
  }

  setup() {
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
    item.addToList(document.querySelector("#list"), this._onItemDelete, this._updateDoneCount);
    this._items[summary] = item;
    this._updateDoneCount();
  }

  _onItemDelete(summary) {
    delete this._items[summary];
    this._updateDoneCount();
  }

  _updateDoneCount() {
    let count = Object.values(this._items).filter(item => item.done).length;
    let total = Object.values(this._items).length;
    document.querySelector("#doneCount").textContent = `${count} of ${total} items done`;
  }
}

let app = new App();
app.setup();
