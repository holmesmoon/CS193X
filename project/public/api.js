/* Fill this in with the URL you get from the web page linked in the assignment spec. */
// let API_URL = "https://pointer-dev.cs.stanford.edu/cs193x_api/samanyl";

/* Uncomment this line to point requests at your local server. The server only supports a couple of
   hardcoded routes, but it should still allow you to do most of part 3 offline, if necessary. */
let API_URL = "/api";

/* Do not modify or remove this line. It allows us to redirect the API for grading */
if (window.API_URL) API_URL = window.API_URL;

/* Make an API request.
   - method is the HTTP method
   - path is the path to the resource (must start with a /)
   - body is the request body. Assume that it will only supplied if the method isn't GET.
   Returns a pair (array with two elements) [status, data]:
   - status is the HTTP status (number)
   - data is the data from the server (assumed to be JSON)
   If the request fails or is not in JSON format, alert() the Error's message and then rethrow it. No exception should
   be generated for a non-OK HTTP status, as the client may wish to handle this case themselves. */
const apiRequest = async (method, path, body) => {
  path = API_URL.concat(path);
  try {
    let res;
    if (method === "GET") {
      res = await fetch(path, {
        method: method
      });
    } else {
      res = await fetch(path, {
        method: method,
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
      });
    }
    let data = await res.json()
    return [res.status, data]
  } catch (e) {
    alert(e.message);
  }
};

/* This line exposes the apiRequest function in the console, so you can call it for testing */
window.apiRequest = apiRequest;

export default apiRequest;
