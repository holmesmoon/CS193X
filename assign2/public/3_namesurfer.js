const NUM_COLORS = 5;
let NAME_DATA;
let YEARS;
let NAMES;
let colorsUsed = [];
let labelTemp = "labelColor";
let barTemp = "barColor";

const setColYear = (data) => {
  for (let yr of data) {
    let divYr = document.createElement("div");
    divYr.textContent = yr;
    document.querySelector("#xaxis").appendChild(divYr);

    let divCol = document.createElement("div");
    divCol.classList.add("column");
    document.querySelector("#columns").appendChild(divCol);
  }
};

const toNameCase = (input) => {
  let str1 = (input.slice(0,1)).toUpperCase();
  let str2 = (input.slice(1)).toLowerCase();
  return str1.concat(str2);
};

const addColor = () => {
  for (let i = 1; i < 6; i++) {
    if (!(colorsUsed.includes(i))) {
      colorsUsed.push(i);
      return i.toString();
    }
  }
};

const addName = (name,color) => {
  let list = document.querySelector("#nameList");

  let item = document.createElement("li");
  item.color = parseInt(color);

  let divName = document.createElement("div");
  divName.classList.add("colorSquare");
  divName.classList.add(barTemp.concat(color));

  let spanName = document.createElement("span");
  spanName.classList.add("nameLabel");
  spanName.classList.add(labelTemp.concat(color));
  spanName.textContent = name;

  let button = document.createElement("button");
  button.classList.add("deleteButton");
  button.textContent = "x";
  button.addEventListener("click",deleteName);

  item.appendChild(divName);
  item.appendChild(spanName);
  item.appendChild(button);
  list.appendChild(item);
};

const addBar = (input,color) => {
  let values = NAMES[input];
  let columns = document.querySelectorAll(".column");
  let i = 0;
  let heightTemp = "height: "
  for (let col of columns) {
    let bar = document.createElement("div");
    bar.classList.add("bar");
    bar.classList.add(barTemp.concat(color));
    if (values[i] == null) {
      rank = 0;
      count = "Unranked";
    } else {
      rank = (1000 - values[i].rank) / 10;
      count = values[i].count;
    }
    bar.style = heightTemp.concat(rank.toString(),"%");
    bar.title = input.concat(": ", count.toString());
    col.appendChild(bar);
    i++;
  }
};

const graph = (event) => {
  // prevents the list from disappearing when name is "submitted"
  event.preventDefault();

  let input = document.querySelector("#nameInput");
  let inputFixed = toNameCase(input.value);
  let form = document.querySelector("#graphForm");
  form.reset();
  if (inputFixed == "") {
    alert('Please enter a valid name');
    return;
  } else if (!Object.keys(NAMES).includes(inputFixed)) {
    alert('No data for ' + inputFixed);
    return;
  }

  let color = addColor();
  if (color == null) {
    alert("No more colors to choose from. Please delete a name.");
    return;
  }

  addName(inputFixed, color);
  addBar(inputFixed, color);
};

const removeColor = (color) => {
  for (let i = 0; i < colorsUsed.length; i++) {
    if (colorsUsed[i] === color) {
      colorsUsed.splice(i,1);
      return barTemp.concat(color);
    }
  }
}

const removeBars = (barColor) => {
  let prefix = ".";
  let bars = document.querySelectorAll(prefix.concat(barColor));
  for (let bar of bars) {
    bar.remove();
  }
}

const deleteName = (event) => {
  let parent = event.currentTarget.parentNode;
  let barColor = removeColor(parent.color);
  removeBars(barColor);
  parent.remove();
}

const main = () => {
  NAME_DATA = processNames(RAW_NAME_DATA);
  YEARS = NAME_DATA.years;
  NAMES = NAME_DATA.names;
  setColYear(YEARS);
  let graphButt = document.querySelector("#graphButton");
  graphButt.addEventListener("click",graph);
};
main();
