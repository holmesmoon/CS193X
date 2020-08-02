const main = () => {
  let name = null;
  while (!name) name = prompt("Your name:");
  document.querySelector("#nameLabel").textContent = name;

  let socket = io();
  socket.emit("join", { name });
  document.querySelector("#chatform").addEventListener("submit", (event) => {
    event.preventDefault();
    let input = document.querySelector("#message");
    socket.emit("message", { text: input.value });
    input.value = "";
  });

  socket.on("message", message => {
    let elem = document.createElement("div");
    if (message.name) {
      let label = document.createElement("strong");
      label.textContent = `${message.name}:`;
      elem.appendChild(label);
    }
    let text = document.createElement("span");
    text.textContent = message.text;
    elem.appendChild(text);
    document.querySelector("#chatarea").appendChild(elem);
  });
};

main();
