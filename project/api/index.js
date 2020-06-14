"use strict";

const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const { MongoClient } = require("mongodb");
const nodemailer = require('nodemailer');

let DATABASE_NAME = "cs193x_project";

// input your own username and password
let USER;
const MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost";
let PASS;

let api = express.Router();
let conn;
let db;
let Orders, Files;

// let transporter = nodemailer.createTransport({
//   host: "smtp.mailtrap.io",
//   port: 2525,
//   auth: {
//     user: "0873940cd84a17",
//     pass: "f9af01269cde3b"
//   }
// });

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: USER,
    pass: PASS
  }
});

module.exports = async (app) => {
  app.set("json spaces", 2);

  // conn = await MongoClient.connect("mongodb://localhost", { useUnifiedTopology: true });
  conn = await MongoClient.connect(MONGODB_URL, { useUnifiedTopology: true })
  db = conn.db(DATABASE_NAME);
  Orders = db.collection("orders");
  Files = db.collection("files");

  app.use("/api", api);
};

api.use(cors());
api.use(bodyParser.json({ limit: '10mb' }));
api.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

api.get("/", (req, res) => {
  res.json({ success: true });
});

api.get("/orders", async (req, res) => {
  let orders = await Orders.find().toArray();
  res.json(orders);
});

api.get("/files", async (req, res) => {
  let files = await Files.find().toArray();
  res.json(files);
});

api.post("/orders", async (req, res) => {
  await Orders.insertOne({ name: req.body.name, email: req.body.email, company: req.body.company, message: req.body.message});
  let order = await Orders.findOne({ name: req.body.name });
  await Files.insertOne({ orderID: order._id, name: req.body.file, link: req.body.link});

  let mailOptions1 = {
    from: req.body.email,
    to: 'kitswitch@gmail.com',
    subject: `KIT SWITCH ORDER #${order._id}`,
    html: `<p>You have a new order request from ${req.body.company}!</p>\n<p>"${req.body.message}"</p>`,
    attachments: [{
      filename: req.body.file,
      href: req.body.link
    }]
  }

  let mailOptions2 = {
    from: 'kitswitch@gmail.com',
    to: req.body.email,
    subject: `KIT SWITCH ORDER CONFIRMATION`,
    html: `<p>Dear ${req.body.name},</p>\n<p>Thank you for your order request with Kit Switch, please keep this email for your records.</p>\n<p>Your order number is: #${order._id}</p>`
  }

  try {
    await transporter.sendMail(mailOptions1);
    await transporter.sendMail(mailOptions2);
    res.json({ success: true });
  } catch (e) {
    res.status(400);
    console.log(e.message);
    res.json({ error: e.message });
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
