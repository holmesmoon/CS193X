"use strict";

const express = require("express");
const http = require("http");
const path = require("path");

const updater = require("./lib/server/updater");

const PORT = 1930;

let app = express();
let server = http.createServer(app);

let publicPath = path.join(__dirname, "public");
app.use("/lib/client", express.static(path.join(__dirname, "lib/client")));
updater(server, publicPath);

app.use(express.static(publicPath));

const main = async () => {
  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}.`);
  });
};
main();
