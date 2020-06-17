const onClick = () => {
  fetch("myfile.txt").then(response => {
    response.text().then(text => {
      console.log(text);
    });
  });
};

const main = () => {
  document.querySelector("#button").addEventListener("click", onClick);
};
main();
