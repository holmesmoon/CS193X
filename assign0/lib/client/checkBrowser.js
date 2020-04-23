import TestClass from "./TestClass.js";

const BASE_URL = "https://web.stanford.edu/class/cs193x/cgi-bin/assign0";

const testFetch = async () => {
  let response = await fetch(`${BASE_URL}/test.json`);
  let json = await response.json();
  if (!json.success) {
    throw new Error("There was a problem reading the test file from the CS193X website. Please check your internet connection.");
  }
};

const main = async () => {
  let test = new TestClass();
  if (!test || !test.success) {
    console.log(test)
    throw new Error("Problem creating a TestClass object");
  }
  console.log("TestClass success");

  await testFetch();
  console.log("Test fetch success");

  if (!updateSocket) {
    console.warn("It seems the updater script didn't load. The page won't refresh automatically when you change the file.");
    console.log(io)
    console.log(updateSocket)
  }

  console.log("Revmoing load error and showing the assignment");
  document.querySelector("#load-error").remove();
  document.querySelector("#assign0").style.display = "";
};
main();

