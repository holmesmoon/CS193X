"use strict";

const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const { MongoClient } = require("mongodb");

const DATABASE_NAME = "students_db";

let api = express.Router();
let conn;
let db;
let Students, Courses;

module.exports = async (app) => {
  app.set("json spaces", 2);

  /* Connect to MongoDB */
  conn = await MongoClient.connect("mongodb://localhost", { useUnifiedTopology: true });
  db = conn.db(DATABASE_NAME);
  Students = db.collection("students");
  Courses = db.collection("courses");

  /* Handle requests taht start with /api using the api Router */
  app.use("/api", api);
};

/* Allow requests from any origin */
api.use(cors());

/* Parse request bodies as JSON */
api.use(bodyParser.json());

/* List students */
api.get("/students", async (req, res) => {
  let students = await Students.find().toArray();
  res.json({ students: students.map(student => student.id) });
});

/* List courses */
api.get("/courses", async (req, res) => {
  let courses = await Courses.find().toArray();
  for (let course of courses) delete course._id;
  res.json({ courses });
});

/* Middleware to lookup student */
api.use("/students/:id", async (req, res, next) => {
  let id = req.params.id;
  let student = await Students.findOne({ id });
  if (!student) {
    res.status(404).json({ error: "Student doesn't exist" } );
    return;
  }

  res.locals.student = student;
  next();
});

/* Get a student's info */
api.get("/students/:id", (req, res) => {
  let student = res.locals.student;
  let { id, firstName, lastName } = student;
  res.json({ id, firstName, lastName });
});

/* Get a student's courses */
api.get("/students/:id/courses", (req, res) => {
  let student = res.locals.student;
  res.json({ courses: student.courses });
});

/* Enroll in a course */
api.post("/students/:id/courses", async (req, res) => {
  let student = res.locals.student;
  let course = req.query.course.toLowerCase();
  if (!(await Courses.findOne({ id: course }))) {
    res.status(400).json({ error: "Course doesn't exist" });
    return;
  }
  if (student.courses.includes(course)) {
    res.status(400).json({ error: "Already enrolled" });
    return;
  }
  student.courses.push(course);
  await Students.replaceOne({ id: student.id }, student);
  res.json({ courses: student.courses });
});

/* Update a student */
api.patch("/students/:id", async (req, res) => {
  let student = res.locals.student;
  /* Read name from request body */
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  student.firstName = firstName;
  student.lastName = lastName;
  await Students.replaceOne({ id: student.id }, student);
  /* Update each field directly */
  //await Students.updateOne({ id: student.id }, {
  //  $set: { firstName, lastName }
  //});
  res.json({ id: student.id, firstName, lastName });
});

