"use strict";

const express = require("express");
const http = require("http");
const path = require("path");
const socketIo = require("socket.io");

//const updater = require("./lib/server/updater");

const PORT = 1930;

let app = express();
let server = http.createServer(app);

let publicPath = path.join(__dirname, "public");
//app.use("/lib/client", express.static(path.join(__dirname, "lib/client")));
//updater(server, publicPath);

app.use(express.static(publicPath));
let io = socketIo(server);
io.on("connection", (socket) => {
  let name = null;
  socket.on("join", (data) => {
    name = data.name;
    io.emit("message", { text: name + " has joined." });
  });

  socket.on("disconnect", () => {
    if (!name) return;
    io.emit("message", { text: name + " has left." });
  });

  socket.on("message", (message) => {
    if (!name) return;
    io.emit("message", { name, text: message.text });
  });
});

const main = async () => {
  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}.`);
  });
};
main();
