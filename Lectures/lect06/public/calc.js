/* Reference to the result input */
let resultElem;
/* The accumulator, which stores the last complete number entered */
let accum = 0;
/* The last operator we clicked */
let lastOp = null;
/* Whether the next key clears the result window (after = or op) */
let nextClear = false;

/* Handle the clear button. Reset to initial state */
const onClear = (event) => {
  accum = 0;
  lastOp = null;
  nextClear = false;
  resultElem.value = "0";
};

/* Handle the = button. The plan here is:
   - Update the accumulator with accum <op> <current value>
   - Display the result
   - Reset lastOp and set nextClear */
const onEquals = (event) => {
  let arg = Number.parseInt(resultElem.value);
  switch (lastOp) {
    case "add": accum += arg; break;
    case "sub": accum -= arg; break;
    case "mul": accum *= arg; break;
    case "div": accum /= arg; break;
    default: accum = arg; break; /* Repeated = */
  }
  resultElem.value = accum;
  lastOp = null;
  nextClear = true;
};

/* Add the digit to the result window, unless nextClear is true, 
   where we discard the current value */
const onNumber = (event) => {
  let curValue = Number.parseInt(resultElem.value);
  let digit = Number.parseInt(event.currentTarget.textContent);
  if (nextClear) {
    resultElem.value = digit;
    nextClear = false;
  } else resultElem.value = curValue * 10 + digit;
};

/* Handle operator key. A bit subtle: operators mostly act like
   the = key, except they also set lastOp */
const onOperator = (event) => {
  onEquals();
  let op = event.currentTarget.dataset.op;
  lastOp = op;
};

/* Set up event handlers */
const main = () => {
  resultElem = document.querySelector("#result");
  document.querySelector("#clear").addEventListener("click", onClear);

  let numButtons = document.querySelectorAll("#numbers button");
  for (let button of numButtons) {
    let handler = onNumber;
    if (button.id === "equals") handler = onEquals;
    button.addEventListener("click", handler);
  }
  let opButtons = document.querySelectorAll("#ops button");
  for (let button of opButtons) {
    button.addEventListener("click", onOperator);
  }
};
main();
