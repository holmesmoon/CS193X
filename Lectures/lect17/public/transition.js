/* "async version" of setTimeout */
const sleep = async (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/* For even finer grained control, window.requestAnimationFrame */
const onClick = async (event) => {
  let [x, y] = [event.offsetX, event.offsetY];
  let box = document.querySelector(".box");
  box.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%))`;
  await sleep(1000);
  box.style.transform = "";
};


const main = () => {
  document.querySelector(".container").addEventListener("click", onClick);
};
main();

