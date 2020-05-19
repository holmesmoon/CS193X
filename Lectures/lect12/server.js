"use strict";

// instead of: import http from "http";
/*const http = require("http");

let server = http.createServer();*/

/* like addEventListener from Web APIs */
/*server.on("request", (req, res) => {
  console.log(`Request for ${req.method} ${req.url}`);
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello from Node");
});

server.listen(1930, () => {
  console.log("Server listening on port 1930");
});*/

// code will run immediately


/* Web server using Express */
const express = require("express");

let app = express();

/* GET request to / */
//app.get("/", (req, res) => {
//  console.log("Got request for /");
//  /* Like res.end, but handles some internals */
//  res.send("Hello from Express");
//});

/* Serve static files from public directory, at root (/) */
app.use(express.static("public"));

/* Serve files from public under /foo */
//app.use("/foo", express.static("public"));

app.set("json spaces", 2);
/* Respond to GET requests for /api/students/____ */
app.get("/api/students/:name", (req, res) => {
  let id = req.params.name;
  if (id === "mchang") {
    let query = req.query;
    //if (query.binky === 42) ...
    res.json({ message: `You asked for ${id}`, query });
  } else {
    res.status(404).json({ error: `${id} isn't a recognized student` });
  }
});

app.listen(1930, () => {
  console.log("Server listening on port 1930");
});
