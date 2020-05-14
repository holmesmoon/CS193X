/* A DOM component that displays text and allows the user to edit it, turning into an input. */
export default class EditableText {
  constructor(id) {
    this.id = id;
    this.value = "";
    //TODO: Add instance variables, bind event handlers, etc.
    this._node = null;
    // this._callbacks = {onChange:null};

    this._edit = this._edit.bind(this);
    this.setValue = this.setValue.bind(this);
  }

  /* Add the component (in display state) to the DOM under parent. When the value changes, onChange
     is called with a reference to this object. */
  addToDOM(parent, onChange) {
    this._node = this._createDisplay();
    parent.appendChild(this._node);
    onChange(this);
    // this._callbacks = {onChange};
    // this._callbacks.onChange(this);
  }

  /* Set the value of the component and switch to display state if necessary. Does not call onChange */
  setValue(value) {
    this.value = value;
    let node = this._createDisplay();
    this._node.replaceWith(node);
    this._node = node;
    // this._callbacks.onChange(this);
  }

  _createDisplay() {
    let container = document.createElement("div");
    container.id = this.id;
    container.classList.add("editableText");

    let text = document.createElement("span");
    text.textContent = this.value;
    container.appendChild(text);

    let button = document.createElement("button");
    button.type = "button";
    button.textContent = "Edit";
    container.appendChild(button);

    button.addEventListener("click",this._edit);

    return container;
  }

  _createInput() {
    let input = document.createElement("input");
    input.classList.add("editableInput");
    input.type = "text";
    input.id = this.id;
    input.value = this.value;
    // TODO add event handlers
    document.querySelector("#setButton").addEventListener("click", (event) => {
      this._text1.setValue(input.value);
    });

    return input;
  }

  _edit(event) {
    let node = this._createInput();
    this._node.replaceWith(node);
  }

}
