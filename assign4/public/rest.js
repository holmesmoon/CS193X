const onSend = async (event) => {
  event.preventDefault();
  let form = document.querySelector("#form");
  let method = form.method.value.toUpperCase();
  let url = form.url.value;
  let body = form.body.value;
  let opts = { method };
  if (body) {
    opts.headers = { "Content-Type": "application/json" };
    opts.body = body;
  }
  let res = await fetch(url, opts);
  let json = await res.json();
  alert(`Status: ${res.status}\n\n${JSON.stringify(json, null, 2)}`);
};

const main = () => {
  document.querySelector("#send").addEventListener("click", onSend);
};
main();
