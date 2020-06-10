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
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "0873940cd84a17",
    pass: "f9af01269cde3b"
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
  await Orders.insertOne({ name: req.body.name, email: req.body.email, company: req.body.company, message: req.body.message});
  let order = await Orders.findOne({ name: req.body.name });

  let mailOptions1 = {
    from: req.body.email,
    to: 'kitswitch@gmail.com',
    subject: `KIT SWITCH ORDER #${order._id}`,
    html: `<p>You have a new order request from ${req.body.company}!</p><p>"${req.body.message}"</p>`
  }

  transporter.sendMail(mailOptions1, function(err) {
    if (err) {
      res.status(404);
      res.json({ error: "Message failed to send, please try again" })
    }
  });

  let mailOptions2 = {
    from: 'kitswitch@gmail.com',
    to: req.body.email,
    subject: `KIT SWITCH ORDER CONFIRMATION`,
    html: `<p>Dear ${req.body.name},</p><p>Thank you for your order request, please keep this email for your records.</p><p>Your order number is: #${order._id}</p>`
  }

  transporter.sendMail(mailOptions2, function(err) {
    if (err) {
      res.status(404);
      res.json({ error: "Message failed to send, please try again" })
    }
  });


  res.json({ success: true })
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
