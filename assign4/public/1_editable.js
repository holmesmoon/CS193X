import EditableText from "./EditableText.js";

class App {
  constructor() {
    this._text1 = new EditableText("text1");
    this._text2 = new EditableText("text2");

    this._onChange = this._onChange.bind(this);
  }

  setup() {
    this._text1.addToDOM(document.querySelector("#container1"), this._onChange);
    this._text2.addToDOM(document.querySelector("#container2"), this._onChange);

    document.querySelector("#setButton").addEventListener("click", (event) => {
      this._text1.setValue("Text set from javascript");
    });
  }

  _onChange(text) {
    alert(`${text.id} changed to ${text.value}`);
  }
}

let app = new App();
app.setup();
