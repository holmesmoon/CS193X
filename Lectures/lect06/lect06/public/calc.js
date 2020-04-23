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
};

/* Add the digit to the result window, unless nextClear is true, 
   where we discard the current value */
const onNumber = (event) => {
};

/* Handle operator key. A bit subtle: operators mostly act like
   the = key, except they also set lastOp */
const onOperator = (event) => {
}

/* Set up event handlers */
const main = () => {
  resultElem = document.querySelector("#result");
  document.querySelector("#clear").addEventListener("click", onClear);
};
main();
