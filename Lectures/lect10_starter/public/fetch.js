const onClick = () => {
  fetch("myfile.txt").then(response => {
    console.log(response.status);
    response.text().then(text => {
      let div = document.createElement("div");
      div.textContent = text;

      let container = document.querySelector("#container");
      container.appendChild(div);
    });
  });
};

const main = () => {
  document.querySelector("#button").addEventListener("click", onClick);
};
main();
