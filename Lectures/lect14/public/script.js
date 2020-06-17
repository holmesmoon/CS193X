const fetchAndLog = async (path, opts) => {
  let res = await fetch(`/api${path}`, opts);
  let json = await res.json();
  console.log(res.status, json);
  return json;
};

const main = () => {
  let form = document.querySelector("#form");
  /* Object mapping element IDs to functions. Not a class, but can use method syntax */
  let buttons = {
    async listStudents() {
      await fetchAndLog("/students");
    },
    async listCourses() {
      await fetchAndLog("/courses");
    },
    async getStudent() {
      let student = form.student.value;
      await fetchAndLog(`/students/${student}`);
    },
    async getStudentCourses() {
      let student = form.student.value;
      await fetchAndLog(`/students/${student}/courses`);
    },
    async enroll() {
      let student = form.student.value;
      let course = form.course.value;
      await fetchAndLog(`/students/${student}/courses?course=${course}`, { method: "POST" });
    },
    async update() {
      let student = form.student.value;
      let info = await fetchAndLog(`/students/${student}`);
      /* Quick way to get user input; not aesthetically pleasing but gets the job done... */
      info.firstName = prompt("First Name:", info.firstName);
      info.lastName = prompt("Last Name:", info.lastName);
      await fetchAndLog(`/students/${student}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(info)
      });
    }
  };

  for (let [id, callback] of Object.entries(buttons)) {
    document.querySelector(`#${id}`).addEventListener("click", callback);
  }
};
main();
