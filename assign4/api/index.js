"use strict";

const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const { MongoClient } = require("mongodb");

let DATABASE_NAME = "cs193x_assign4";

/* Do not modify or remove this line. It allows us to change the database for grading */
if (process.env.DATABASE_NAME) DATABASE_NAME = process.env.DATABASE_NAME;

let api = express.Router();
let conn;
let db;
let Users, Posts;

module.exports = async (app) => {
  app.set("json spaces", 2);

  conn = await MongoClient.connect("mongodb://localhost", { useUnifiedTopology: true });
  db = conn.db(DATABASE_NAME);
  Users = db.collection("users");
  Posts = db.collection("posts");

  app.use("/api", api);
};

api.use(bodyParser.json());
api.use(cors());

api.get("/", (req, res) => {
  res.json({ message: "API running" });
});

api.get("/users", async (req, res) => {
  let users = await Users.find().toArray();
  res.json({ users: users.map(user => user.id) });
});

api.use("/users/:id", async (req, res, next) => {
  let id = req.params.id;
  let user = await Users.findOne({ id });
  if (!user) {
    res.status(404).json({ error: "User doesn't exist" });
    return;
  }

  res.locals.user = user;
  next();
})

api.get("/users/:id", async (req, res) => {
  let user = res.locals.user;
  let { id, name, avatarURL, following } = user;
  res.json({ id, name, avatarURL, following });
});

api.post("/users", async (req, res) => {
  await Users.insertOne({ id: req.body.id, name: req.body.id , avatarURL: "", following: [] });
  let { id, name, avatarURL, following } = await Users.findOne(req.body.id);
  res.json({ id, name, avatarURL, following });
});

api.patch("/users/:id", async (req, res) => {
  let user = res.locals.user;
  if (req.body.name) {
    user.name = req.body.name;
  }
  if (req.body.avatarURL) {
    user.avatarURL = req.body.avatarURL;
  }

  let { id, name, avatarURL, following } = user;
  await Users.replaceOne({ id: user.id }, user);
  res.json({ id, name, avatarURL, following });
});

api.get("/users/:id/feed", async (req, res) => {
  let user = res.locals.user;
  let posts = [];
  let post = await Posts.find({ userId: user.id }).toArray();

  for (let p of post) {
    posts.push({ user: {id: user.id, name: user.name, avatarURL: user.avatarURL}, time: p.time, text: p.text});
  }


  for (let id of user.following) {
    let u = await Users.findOne({ id });
    let psts = await Posts.find({ userId: id }).toArray();
    for (let p of psts) {
      posts.push({ user: {id: u.id, name: u.name, avatarURL: u.avatarURL}, time: p.time, text: p.text});
    }
  };

  posts = posts.sort( function(a,b) {
      if (a.time < b.time) {
        return 1;
      } else if (a.time > b.time){
        return -1;
      }
      return 0;
  });

  res.json({ posts: posts });
});

api.post("/users/:id/posts", async (req, res) => {
  let user = res.locals.user;
  if (!req.body.text) {
      res.json({ error: "Text is empty" });
      return;
  };

  await Posts.insertOne({ userId: user.id, time: new Date(), text: req.body.text });
  res.json({ success: true });
});

api.post("/users/:id/follow", async (req, res) => {
  let user = res.locals.user;
  let targetId = req.query.target;
  if (!targetId) {
      res.json({ error: "Target ID is missing" });
      return;
  };

  if (!(await Users.findOne({ id: targetId }))) {
    res.status(400).json({ error: `${targetId} does not exist` });
    return;
  } else if (user.id === targetId) {
    res.json({ error: `Target is the same as user` });
    return;
  } else if (user.following.includes(targetId)) {
    res.json({ error: `${targetId} is already following ${user.id}` })
    return;
  };

  user.following.push(targetId)
  await Users.replaceOne({ id: user.id }, user);
  res.json({ success: true });
});

api.delete("/users/:id/follow", async (req, res) => {
  let user = res.locals.user;
  let targetId = req.query.target;
  if (!targetId) {
      res.json({ error: "Target ID is missing" });
      return;
  };

  if (!(user.following.includes(targetId))) {
    res.json({ error: `${targetId} is not following ${user.id}` })
  }

  let index = user.following.indexOf(targetId);
  user.following.splice(index, 1);
  await Users.replaceOne({ id: user.id }, user);
  res.json({ success: true });
});

/* Catch-all route to return a JSON error if endpoint not defined */
api.all("/*", (req, res) => {
  res.status(404).json({ error: `Not found: ${req.method} ${req.url}` });
});
