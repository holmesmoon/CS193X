const handleClick = (event) => {
  console.log("Button clicked");
  let box = document.querySelector(".box");
  box.textContent = "This box has changed";
  /* The element that with the handler */
  let button = event.currentTarget;
  button.textContent = "I was clicked!";
};

const main = () => {
  let button = document.querySelector("button");
  button.addEventListener("click", handleClick);
};
main();
