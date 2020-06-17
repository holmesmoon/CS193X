"use strict";

const express = require("express");
const http = require("http");
const path = require("path");

const { api } = require("./api");
const updater = require("./lib/server/updater");

const PORT = 1930;

const app = express();
const server = http.createServer(app);

const publicPath = path.join(__dirname, "public");
app.use("/lib/client", express.static(path.join(__dirname, "lib/client")));
app.use(express.static(publicPath));
updater(server, publicPath);

app.set("json spaces", 2);
app.use("/api", api);

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});
