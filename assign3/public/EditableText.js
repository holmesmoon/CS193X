/* A DOM component that displays text and allows the user to edit it, turning into an input. */
export default class EditableText {
  constructor(id) {
    this.id = id;
    this.value = "";
    //TODO: Add instance variables, bind event handlers, etc.
  }

  /* Add the component (in display state) to the DOM under parent. When the value changes, onChange
     is called with a reference to this object. */
  addToDOM(parent, onChange) {
    //TODO
  }

  /* Set the value of the component and switch to display state if necessary. Does not call onChange */
  setValue(value) {
    //TODO
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
    //TODO: Add event handler to edit button
    container.appendChild(button);

    return container;
  }

  _createInput() {
    let input = document.createElement("input");
    input.classList.add("editableInput");
    input.type = "text";
    input.id = this.id;
    input.value = this.value;
    //TODO: Add event handler to input

    return input;
  }
}
