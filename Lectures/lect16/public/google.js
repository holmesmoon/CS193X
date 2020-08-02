import GoogleSignin from "./GoogleSignin.js";

/* Make sure to get your own client ID. This one will be deleted soon */
const CLIENT_ID = "723067440195-8unb39sobjavlo60d873s74mufgsdfr7.apps.googleusercontent.com";

class App {
  constructor() {
    this._gs = null;

    this._onError = this._onError.bind(this);
    this._onSignIn = this._onSignIn.bind(this);
    this._onSignOut = this._onSignOut.bind(this);
  }

  async setup() {
    this._gs = await GoogleSignin.init(CLIENT_ID);

    document.querySelector("#signout").addEventListener("click", this._onSignOut);
    this._gs.renderSignIn("signin", { longtitle: true, theme: "dark", onsuccess: this._onSignIn, onfailure: this._onError });
  }

  async _loadProfile() {
    document.querySelector("#loginForm").classList.add("hidden");
    document.querySelector("#profile").classList.remove("hidden");

    let { name, email } = this._gs.getProfile();
    document.querySelector("#email").textContent = email;
    document.querySelector("#name").textContent = name;

    let authInfo = this._gs.getAuthInfo();
    let res = await fetch("/api/google", {
      headers: { "Authorization": `Google ${authInfo.idToken}` }
    });
    let json = await res.json();
    console.log(json);
  }

  _onError() {
    alert("Error while signing in");
  }

  _onSignIn() {
    this._loadProfile();
  }

  async _onSignOut() {
    await this._gs.signOut();
    document.querySelector("#loginForm").classList.remove("hidden");
    document.querySelector("#profile").classList.add("hidden");
  }
}

let app = new App();
app.setup();
