import apiRequest from "./api.js";

const email = async (event) => {
  event.preventDefault();
  const reader = new FileReader();
  let form = document.querySelector("#contact-form");

  let file = document.querySelector("#file-input").files;
  let name = document.querySelector("#name-input").value;
  let email = document.querySelector("#email-input").value;
  let company = document.querySelector("#company-input").value;
  let message = document.querySelector("#message-input").value;

  reader.addEventListener("load", function () {
  // convert image file to base64 string
    preview.src = reader.result;
  }, false);
  reader.readAsDataURL(file);

  let [status, data] = await apiRequest("POST",'/orders',{name: name, email: email, company: company, message: message})
  form.reset();

  alert("Message sent!");
}

const main = () => {
  let submitButton = document.querySelector("#submit-button");
  submitButton.addEventListener("click", email);
};
main();
