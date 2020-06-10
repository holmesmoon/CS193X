import apiRequest from "./api.js";

async email(event) => {
  event.preventDefault();
  const reader = new FileReader();

  let file = document.querySelector("file-input").files;
  let name = document.querySelector("name-input");
  let email = document.querySelector("email-input");
  let company = document.querySelector("company-input");
  let message = document.querySelector("message-input");

  reader.readAsDataURL(file);

  let [status] = await apiRequest("POST",'/orders',{name: name, email: email, company: company, message: message, file: reader.result})

  res.json(status)
}

const main = () => {
  let submitButton = document.querySelector("#submit-button");
  submitButton.addEventListener("click", email);
};
main();
