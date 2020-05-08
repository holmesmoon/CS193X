"use strict";

const express = require("express");

const api = module.exports = express.Router();

api.get("/", (req, res) => {
  res.json({ message: "Hello, world!", num: 193 });
});

api.get("/bogus", (req, res) => {
  res.status(404).json({ error: "I don't know what that is" });
});

api.get("/protected", (req, res) => {
  res.status(403).json({ error: "You aren't allowed" });
});

