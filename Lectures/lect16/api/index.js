"use strict";

const bodyParser = require("body-parser");
const cors = require("cors");
const crypto = require("crypto");
const express = require("express");
const jwt = require("jsonwebtoken");
const { MongoClient } = require("mongodb");
const { OAuth2Client } = require("google-auth-library");

const SECRET = "my secret string";

/* Make sure to get your own client ID. This one will be deleted soon */
const CLIENT_ID = "723067440195-8unb39sobjavlo60d873s74mufgsdfr7.apps.googleusercontent.com";

let conn;
let db;
let Users;

let api = express.Router();
module.exports = async (app) => {
  app.set("json spaces", 2);
  /* Handle requests taht start with /api using the api Router */
  app.use("/api", api);

  conn = await MongoClient.connect("mongodb://localhost", { useUnifiedTopology: true });
  db = conn.db("users_example");
  Users = db.collection("users");
};

/* Allow requests from any origin */
api.use(cors());

/* Parse request bodies as JSON */
api.use(bodyParser.json());

function isCorrectPassword(user, password) {
  let hash = crypto.createHash("sha256");
  hash.update(user.salt);
  hash.update(password);
  return hash.digest("base64") === user.hashedPassword;
}

api.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let user = await Users.findOne({ email });
  if (!user) {
    let hash = crypto.createHash("sha256");
    let salt = crypto.randomBytes(8).toString("base64");
    hash.update(salt).update(password);
    let hashedPassword = hash.digest("base64");
    await Users.insertOne({ email, salt, hashedPassword });
    user = await Users.findOne({ email });
  } else if (!isCorrectPassword(user, password)) {
    res.status(400).json({ error: "Wrong password" });
    return;
  }
  let apiKey = jwt.sign({ email: user.email }, SECRET, { expiresIn: "1h" });
  res.json({ user, apiKey });
});

async function checkAuth(req, res, next) {
  let auth = req.header("Authorization");
  if (auth) {
    let [type, key] = auth.split(" ");
    if (type === "API-Key") {
      try {
        let { email } = jwt.verify(key, SECRET);
        let user = await Users.findOne({ email });
        if (user) {
          res.locals.user = user;
          next();
          return;
        }
      } catch (e) {
        console.warn(e);
      }
    }
  }
  res.status(403).json({ error: "Access denied" });
}

api.get("/protected", checkAuth, async (req, res) => {
  let user = res.locals.user;
  res.json({ user });
});

api.get("/google", async (req, res) => {
  let [type, token] = req.header("Authorization").split(" ");
  let client = new OAuth2Client();
  /* "audience" is the client ID the token was created for. A mismatch would mean the user is
     trying to use an ID token from a different app */
  let login = await client.verifyIdToken({ idToken: token, audience: CLIENT_ID });
  /* Contains a bunch of profile info */
  res.json(login.getPayload());
});

/* Catch-all route to return a JSON error if endpoint not defined */
api.all("/*", (req, res) => {
  res.status(404).json({ error: `Not found: ${req.method} ${req.url}` });
});
