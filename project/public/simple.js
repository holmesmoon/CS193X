import apiRequest from "./api.js";

const email = async (event) => {
  event.preventDefault();
  const reader = new FileReader();
  let result;
  let status, data;

  reader.addEventListener("load", async function () {
    [status, data] = await apiRequest("POST",'/orders',{name: name, email: email, company: company, message: message, file: file.name, link: reader.result})
    if (status == 400) {
      console.log(data.error);
      alert("Sorry, our server is currently down. Please try again later.");
      return;
    } else {
      alert("Thank you! Your message has been sent!");
    }
    form.reset();
  }, false);

  let form = document.querySelector("#contact-form");
  let file = document.querySelector("#file-input").files[0];
  let name = document.querySelector("#name-input").value;
  let email = document.querySelector("#email-input").value;
  let company = document.querySelector("#company-input").value;
  let message = document.querySelector("#message-input").value;

  if (Math.round((file.size)/1024) >= 10 * 1024) {
    alert("Sorry, files must be less than 10MB! Please compress your files before uploading.");
    return;
  }

  reader.readAsDataURL(file);
}

const main = () => {
  let submitButton = document.querySelector("#submit-button");
  submitButton.addEventListener("click", email);
};
main();
