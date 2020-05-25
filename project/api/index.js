"use strict";

const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");

let api = express.Router();

module.exports = (app) => {
  app.set("json spaces", 2);
  app.use("/api", api);
};

api.use(cors());
api.use(bodyParser.json());

api.get("/", (req, res) => {
  res.json({ success: true });
});
