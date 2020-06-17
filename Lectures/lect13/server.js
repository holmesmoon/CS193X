"use strict";

const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");

let app = express();

/* Serve static files from public directory, at root (/) */
app.use(express.static("public"));

app.set("json spaces", 2);

/* REST API for students and courses */
/* Store students in global variable for now */
const STUDENTS = {
  raul: { id: "raul", firstName: "Raul", lastName: "Altosaar", courses: [] },
  cole: { id: "cole", firstName: "Cole", lastName: "DePasquale", courses: [] },
  jessica: { id: "jessica", firstName: "Jessica", lastName: "Guo", courses: [] },
  kashif: { id: "kashif", firstName: "Kashif", lastName: "Nazir", courses: [] },
  michael: { id: "michael", firstName: "Michael", lastName: "Chang", courses: [] }
};

const COURSES = {
  cs106a: { code: "CS106A", units: 5 },
  cs106b: { code: "CS106B", units: 5 },
  cs140: { code: "CS140", units: 4 },
  cs193x: { code: "CS193X", units: 3 }
};

/* Allow requests from any origin */
app.use(cors());

/* Parse request bodies as JSON */
app.use(bodyParser.json());

let api = express.Router();
app.use("/api", api);

/* List students */
api.get("/students", (req, res) => {
  let students = Object.keys(STUDENTS);
  res.json({ students });
});

/* List courses */
api.get("/courses", (req, res) => {
  res.json({ courses: COURSES });
});

/* A middleware function */
const lookupStudent = (req, res, next) => {
  let id = req.params.id;
  let student = STUDENTS[id];
  if (!student) {
    res.status(404).json({ error: "Student doesn't exist" } );
    return;
  }

  /* Can't use global variable because we handle multiple requests simulgtaneously */
  //curStudent = student;

  /* res.locals: object you can use to store info about the rquest */
  res.locals.student = student;
  next();
};
api.use("/students/:id", lookupStudent);

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
api.post("/students/:id/courses", (req, res) => {
  let student = res.locals.student;
  let course = req.query.course;
  //TODO: check if course exists, check if student already enrolled
  student.courses.push(course);
  res.json({ courses: student.courses });
});

/* Update a student */
api.patch("/students/:id", (req, res) => {
  let student = res.locals.student;
  /* Read name from request body */
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  student.firstName = firstName;
  student.lastName = lastName;
  res.json({ id: student.id, firstName, lastName });
});

const PORT = 1930;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});
