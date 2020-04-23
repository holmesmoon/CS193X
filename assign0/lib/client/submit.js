const BASE_URL = "https://web.stanford.edu/class/cs193x/cgi-bin/assign0";

/* List questions here to confirm none got added or deleted. */
const QUESTIONS = new Set([
  "sunetid", "name", "pronouns", "time", "os", "browser", "net-live", "net-video", "net-text", "net-work",
  "env-learning", "anything-else"
]);

const collectAnswers = () => {
  const QERROR_MSG = "Please check that you haven't edited the question tags.";

  let questions = document.querySelectorAll(".question");
  let needed = new Set(QUESTIONS);
  let data = {};
  for (let question of questions) {
    let key = question.dataset.q;
    if (!key) throw new Error(`There is a question without a "data-q" attribute. ${QERROR_MSG}`);
    if (!needed.has(key)) throw new Error(`Unrecognized or duplicate question "${key}". ${QERROR_MSG}`);
    needed.delete(key);
    let answers = question.querySelectorAll(".answer");
    if (!answers.length) throw new Error(`No answer to ${key}. Please uncomment one of the answers.`);
    else if (answers.length > 1) throw new Error(`Multiple answers to ${key}. Please uncomment exactly one answer.`);
    let answer = answers[0].textContent;
    if (answer.includes("[TODO]")) throw new Error(`Answer to ${key} has [TODO].`);
    data[key] = answer.split("\n").map(line => line.trim()).join("\n").trim();
  }
  if (needed.size) throw new Error(`Missing question(s): ${Array.from(needed).join(", ")}. ${QERROR_MSG}`);
  return data;
};

const sendAnswers = async data => {
  let json = JSON.stringify(data, null, 2);
  let response = await fetch(`${BASE_URL}/submit.py`, {
    method: "POST",
    credentials: "omit",
    headers: { "Content-Type": "application/json" },
    body: json
  });
  let resJson = await response.json();
  if (resJson.error) throw new Error(`The server responded with an error:\n\n${resJson.error}`);
  return json;
};

document.querySelector("#submit").addEventListener("click", async event => {
  try {
    let data = collectAnswers();
    let json = await sendAnswers(data);
    let success = document.createElement("section");
    let html = "<h1>Success</h1>\n";
    html += "<p>Thank you. Your answers have been received.</p>\n";
    html += `<p>Here is what was sent:</p><pre>${json}</pre>\n`;
    html += "<p>(You may edit the page and resend the data if you would like.)</p>";
    success.innerHTML = html;
    document.querySelector("#assign0").replaceWith(success);
  } catch (e) {
    console.error(e);
    alert(e.message);
  }
});
