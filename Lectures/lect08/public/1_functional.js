const timesTwo = arr => arr.map(num => num * 2);
//console.log(timesTwo([1, 2, 3, 4]));

const isEven = num => num % 2 === 0;
//console.log([0, 20, 56].every(isEven));
//console.log([1, 14, 193].some(isEven));

const CS_REQS = {
  AI: [221, 229, 231],
  HCI: [147, 247, 377],
  Intro: [103, 106, 107],
  Systems: [140, 143, 240]
};
const gradCourses = Object.fromEntries(
  Object.entries(CS_REQS)
    .map(([track, courses]) => 
         [track, courses.filter(course => course > 200)])
    .filter(([track, courses]) => courses.length > 0)
);
//console.log(gradCourses);

/*** Closures ***/

/* Too complicated to show */
const meetsReqs = student => true;

const graduating = (applied, units) => {
  const canGraduate = student => units[student] >= 180 && meetsReqs(student);
  return applied.filter(canGraduate);
};
console.log(graduating(["Jessica", "Kashif"], {
  Jessica: 185,
  Kashif: 181, /* Better double check that math... */
  Raul: 100
}));

/*** Simulating a class ***/
const Counter = (start = 0) => {
  let count = start;
  const value = () => count;
  const add = (n = 1) => { count += n; };
  return { value, add };
};
//let c = Counter();
//console.log(c.value());
//c.add(5);
//console.log(c.value());
