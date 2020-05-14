
/* Student model */
class Student {
  /* DOES NOT WORK! constructors cannot be async
  async constructor(id) {
    await fetch(...);
    this.firstNam = data.firstname;
  }*/

  static async load(id) {
    let res = await fetch(`/api/students/${id}`);
    let data = await res.json();
    return new Student(data);
  }

  constructor(data) {
    /*this.id = data.id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;*/
    /* shortcut for above */
    Object.assign(this, data);
    this._path = `/api/students/${this.id}`;
  }

  async enroll(course) {
    let data = { course };
    let opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    };
    let res = await fetch(`${this._path}/enroll`, opts);
    let json = await res.json();
    return json.success;
  }

  toJSON() {
    // equivalent to: let id = this.id; let firstName = this.firstName; let lastName = this.lastname;
    let { id, firstName, lastName } = this;
    // equivalent to: return { id: id, firstName: firstName, lastName: lastName };
    return { id, firstName, lastName };
    // could have also written
    //return { id: this.id, firstName: this.firstName, lastName: this.lastName };
  }
}

const testStudent = () => {
  let s = await Student.load("jessica");
  await s.enroll("cs193x");
  /* need to reload; in practice we probably want to update our instance viarables or do this in .enroll() */
  s = await Student.load("jessica");
  console.log(s);
};

const throwException = () => {
  try {
    console.log("before error");
    throw new Error("boom");
    console.log("after exception");
  } catch (e) {
    /* Check type of error inside catch block. Can "throw e" to rethrow the exception */
    console.log("Got an error", e);
    alert(e.message);
  }
};

const onClick = async () => {
  /* fetch failures:
  let res = await fetch("http://bogus.example.com");
  non-json response
  let res = await fetch("/api/nonexist");
  console.log(res.status);
  let json = await res.json();
  console.log(json);
  */

  /* Get list of students
  let res = await fetch("/api/students");
  console.log(await res.json()); */

  /* Get info about a student
  let res = await fetch("/api/students/kashif");
  console.log(await res.json()); */

  /* Route: POST /students/:id/enroll
     Parameters: course: the course to enroll in
     Enrolls a student in a course */
  /*let res = await fetch("/api/students/kashif/enroll?course=cs140", {
    method: "POST"
  });*/
  /*let data = { course: "cs106a" };
  let opts = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  };
  let res = await fetch("/api/students/kashif/enroll", opts);
  console.log(await res.json());*/
};

const main = () => {
  document.querySelector("#button").addEventListener("click", onClick);
};
main();
