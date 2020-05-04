let itemDescs = {};

class ListItem {
  constructor(summary, desc = "") {
    /* this is required when accessing i-vars */
    this._summary = summary;
    this._desc = desc;
  }

  addToList(list) {
    let listItem = document.createElement("li");
    listItem.textContent = this._summary;
    listItem.dataset.summary = this._summary;

    let delButton = document.createElement("button");
    delButton.classList.add("delButton");
    delButton.textContent = "Delete";
    delButton.addEventListener("click", onDelete);
    /* Not ideal: item isn't tabbable, can't access with keyboard */
    listItem.addEventListener("click", onSelect);
    /* Aside: capturing event handler: run before child handlers */
    //listItem.addEventListener("click", onSelect, true);
    listItem.appendChild(delButton);

    list.appendChild(listItem);
  }
}

const isDuplicate = (summary) => {
  return document.querySelector("[data-summary=" + summary + "]") !== null;
};

const onAdd = (event) => {
  event.preventDefault();
  let input = document.querySelector("#summary");
  let summary = input.value;
  let desc = document.querySelector("#description").value;
  if (isDuplicate(summary)) {
    alert(`Duplicate item ${summary}`);
    return;
  }
  let form = document.querySelector("#addForm");
  form.reset();

  itemDescs[summary] = desc;
  let listItem = new ListItem(summary, desc);
  listItem.addToList(document.querySelector("#list"));
};

const onDelete = (event) => {
  /* Prevent event bubbling to li and calling onSelect */
  event.stopPropagation();
  /* currentTarget = delete button */
  let listItem = event.currentTarget.parentNode;
  listItem.remove();
};

const onSelect = (event) => {
  for (let item of document.querySelectorAll("#list li"))
    item.classList.remove("selected");
  let listItem = event.currentTarget;
  let summary = listItem.dataset.summary;
  listItem.classList.add("selected");
  let descBox = document.querySelector("#descBox");
  descBox.textContent = itemDescs[summary];
};

const main = () => {
  let addButton = document.querySelector("#addButton");
  addButton.addEventListener("click", onAdd);
};
main();
