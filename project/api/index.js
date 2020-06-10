"use strict";

const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const { MongoClient } = require("mongodb");
const nodemailer = require('nodemailer');

let DATABASE_NAME = "cs193x_project";

let api = express.Router();
let conn;
let db;
let Orders;

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'liu.samantha.y@gmail.com',
    pass: 'SamLiu7265!'
  }
});

module.exports = async (app) => {
  app.set("json spaces", 2);

  conn = await MongoClient.connect("mongodb://localhost", { useUnifiedTopology: true });
  db = conn.db(DATABASE_NAME);
  Orders = db.collection("orders");

  app.use("/api", api);
};

api.use(cors());
api.use(bodyParser.json());

api.get("/", (req, res) => {
  res.json({ success: true });
});

api.get("/orders", async (req, res) => {
  let orders = await Orders.find().toArray();
  res.json(orders);
});

api.post("/orders", async (req, res) => {
  await Orders.insertOne({ name: name, email: email, company: company, message: message, file: file });
  let order = await Orders.findOne(req.body.id);

  let mailOptions = {
    from: 'liu.samantha.y@gmail.com',
    to: 'liu.samantha.y@gmail.com',
    subject: `Request from ${req.body.company}`,
    text: "You have a new request!"
  }

  if (error) {
    console.log(error);
    res.status(404);
  } else {
    console.log("Message sent: " + response.message);
    res.json(order);
  }
});

/* This is a catch-all route that logs any requests that weren't handled above.
   Useful for seeing whether POSTs are coming through correctly */
api.all("/*", (req, res) => {
  let data = {
    method: req.method,
    path: req.url,
    query: req.query,
    body: req.body
  };
  console.log(data);
  res.status(404).json({ error: `Not implemented` });
});
