
const onClick = async () => {
  /* Can only await inside async function */
  let res = await fetch("myfile.txt");
  console.log(res.status);
  let text = await res.text();

  let div = document.createElement("div");
  div.textContent = text;

  let container = document.querySelector("#container");
  container.appendChild(div);

  /* fetch JSON from API */
  let res2 = await fetch("/api");
  let json = await res2.json();
  console.log(json);
};

/* Inside a class:
class Binky {
  async _onClick() {
  }
} */

const main = () => {
  document.querySelector("#button").addEventListener("click", onClick);
};
main();
