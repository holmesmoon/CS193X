/* Declaring variables */
let x = 42;
let str = "193X";

/* Recommend: use const for constants */
const MY_CONSTANT = 5;
/* Can't change value */
//MY_CONSTANT = 17; // throws Error

/* Best practice: don't use var */
//var y = 17;

/* Best practice: don't do this; it's global */
//foo = "bar";

/* null vs. undefined */
x = null;
let z;
console.log(x, z);

/* falsy: 0, "", NaN, null, and undefined */
if (x) console.log("x is truthy");
else console.log("x is falsy");

/* Equality */
/* Best practice: don't use == and != */
console.log(0 === "0");
console.log(1 !== "1");
/* Exception: check if null or undefined */
console.log(x == null);

const sum = (x, y) => {
  let localVar = x + y;
  return localVar;
  /* No return or explicit "return;" returns undefined */
  //return; // turns undefined
};
console.log(sum(10, 103));
//console.log(localVar); // throws ReferenceError
