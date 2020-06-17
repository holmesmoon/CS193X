"use strict";

const chokidar = require("chokidar");
const socketIo = require("socket.io");

module.exports = (server, publicPath) => {
  const io = socketIo(server);

  io.on("connection", socket => {
    console.log("New client connection");
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });

  chokidar.watch(publicPath, {
    cwd: publicPath, ignoreInitial: true
  }).on("all", (type, path) => {
    if (type.endsWith("Dir")) return;
    if (path.endsWith(".css")) {
      console.log(`CSS change: ${path}`);
      io.emit("cssChange", path);
    } else {
      console.log(`Non-CSS change: ${path}`);
      io.emit("reload");
    }
  });
};
