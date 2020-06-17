"use strict";

const bodyParser = require("body-parser");
const express = require("express");

const api = express.Router();
api.use(bodyParser.json());

api.get("/", (req, res) => {
  res.json({ message: "Hello, world!", num: 193 });
});

/*** Enrollment example ***/

const STUDENTS = {
  raul: { id: "raul", firstName: "Raul", lastName: "Altosaar" },
  cole: { id: "cole", firstName: "Cole", lastName: "DePasquale" },
  jessica: { id: "jessica", firstName: "Jessica", lastName: "Guo" },
  kashif: { id: "kashif", firstName: "Kashif", lastName: "Nazir" }
};

const COURSES = {
  cs106a: { code: "CS106A", units: 5 },
  cs106b: { code: "CS106B", units: 5 },
  cs140: { code: "CS140", units: 4 },
  cs193x: { code: "CS193X", units: 3 }
};

const ENROLLMENT = {
  raul: [], cole: [], jessica: [], kashif: ["cs193x"]
};

api.get("/students", (req, res) => {
  let students = Object.values(STUDENTS);
  let query = req.query.q;
  if (query) {
    query = query.toLowerCase();
    students = students.filter(s => `${s.firstName} ${s.lastName}`.toLowerCase().includes(query));
  }
  res.json({ students });
});

api.get("/students/:id", (req, res) => {
  let id = req.params.id;
  let student = STUDENTS[id];
  if (!student) {
    res.status(404).json({ error: `Can't find student ${id}` });
    return;
  }
  /* Clone student object */
  student = Object.assign({}, student);
  student.courses = ENROLLMENT[id];
  let units = 0;
  for (let course of student.courses) units += COURSES[course].units;
  student.units = units;
  res.json(student);
});

api.post("/students/:id/enroll", (req, res) => {
  let id = req.params.id;
  let student = STUDENTS[id];
  if (!student) {
    res.status(404).json({ error: `Can't find student ${id}` });
    return;
  }
  let course = req.body.course || req.query.course;
  if (!COURSES[course]) {
    res.status(404).json({ error: `Invalid course ${course}` });
    return;
  }
  if (!ENROLLMENT[id].includes(course)) ENROLLMENT[id].push(course);
  res.json({ success: true });
});

api.get("/courses", (req, res) => {
  res.json(COURSES);
});

/*** Error examples ***/

api.get("/protected", (req, res) => {
  res.status(403).json({ error: "You aren't allowed" });
});

api.post("/*", (req, res) => {
  let data = {
    method: req.method,
    path: req.url,
    query: req.query,
    body: req.body
  };
  console.log(data);
  res.json(data);
});

api.get("/*", (req, res) => {
  res.status(404).json({ error: `Not found: ${req.url}` });
});

module.exports.api = api;
