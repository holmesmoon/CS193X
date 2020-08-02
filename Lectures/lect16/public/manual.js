let API_KEY = null;

const onLogin = async (event) => {
  event.preventDefault();
  let email = document.querySelector("#email").value;
  let password = document.querySelector("#password").value;
  let opts = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  };
  let res = await fetch("/api/login", opts);
  let json = await res.json();
  if (res.status === 200) {
    API_KEY = json.apiKey;
    document.querySelector("#loginForm").style.display = "none";
  }
  console.log(json);
};

const onProtected = async (event) => {
  let res = await fetch("/api/protected", {
    headers: { "Authorization": `API-Key ${API_KEY}` }
  });
  let json = await res.json();
  console.log(json);
};

const main = () => {
  document.querySelector("#loginForm").addEventListener("submit", onLogin);
  document.querySelector("#protected").addEventListener("click", onProtected);
};
main();
