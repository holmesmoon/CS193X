console.log("Loaded Item module");

/* Named export: import { findItem } */
export const findItem = (summary) => {
  console.log("findItem");
};

export default class Item {
  constructor(summary) {
    this.summary = summary;

    // "private" instance variables
    this._callbacks = {
      onDelete: null, onUpdate: null
    };
    // declare upfront
    this._checkbox = null;
    this._node = null;

    /* Bind event handlers */
    this._onDelete = this._onDelete.bind(this);
    this._onUpdate = this._onUpdate.bind(this);

    this._createNode();
  }

  get done() {
    return this._checkbox && this._checkbox.checked;
  }

  addToList(list, onDelete, onUpdate) {
    // shorthand for { onDelete: onDelete, onUpdate: onUpdate }
    this._callbacks = { onDelete, onUpdate };
    list.appendChild(this._node);
  }

  _createNode() {
    let node = this._node = document.createElement("li");
    let label = document.createElement("label");

    let checkbox = this._checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    // use change for inputs instead of click
    checkbox.addEventListener("change", this._onUpdate);
    label.appendChild(checkbox);

    let text = document.createElement("span");
    text.textContent = this.summary;
    label.appendChild(text);
    node.appendChild(label);

    let delButton = document.createElement("button");
    delButton.classList.add("delButton");
    delButton.textContent = "X";
    delButton.addEventListener("click", this._onDelete);
    node.appendChild(delButton);
  }

  _onDelete(event) {
    this._node.remove();
    if (this._callbacks.onDelete)
      this._callbacks.onDelete(this);
  }

  _onUpdate(event) {
    if (this._callbacks.onUpdate)
      this._callbacks.onUpdate(this);
  }
}
