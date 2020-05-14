import User from "./User.js";

class App {
  constructor() {
    this._user = null;

    this._loginForm = null;
    this._postForm = null;

    this._onListUsers = this._onListUsers.bind(this);
    this._onLogin = this._onLogin.bind(this);

    //TODO: Add instance variables, bind event handlers, etc.
  }

  setup() {
    this._loginForm = document.querySelector("#loginForm");
    this._loginForm.login.addEventListener("click", this._onLogin);
    this._loginForm.listUsers.addEventListener("click", this._onListUsers);

    this._postForm = document.querySelector("#postForm");

    //TODO: Complete the setup of remaining components
  }

  _getAvatar(user) {
    let url = user.avatarURL;
    if (!url) url = "images/default.png";
    return url;
  }

  _displayPost(post) {
    let node = document.querySelector("#templatePost").cloneNode(true);
    node.id = "";

    let avatar = node.querySelector(".avatar");
    avatar.src = this._getAvatar(post.user);
    avatar.alt = `${post.user.name}'s avatar`;

    node.querySelector(".name").textContent = post.user.name;
    node.querySelector(".userid").textContent = post.user.id;
    node.querySelector(".time").textContent = post.time.toLocaleString();
    node.querySelector(".text").textContent = post.text;

    document.querySelector("#feed").appendChild(node);
  }

  async _loadProfile() {
    document.querySelector("#welcome").classList.add("hidden");
    document.querySelector("#main").classList.remove("hidden");
    document.querySelector("#idContainer").textContent = this._user.id;
    /* Reset the feed */
    document.querySelector("#feed").textContent = "";

    /* Update the avatar, name, and user ID in the new post form */
    this._postForm.querySelector(".avatar").src = this._getAvatar(this._user);
    this._postForm.querySelector(".name").textContent = this._user.name;
    this._postForm.querySelector(".userid").textContent = this._user.id;

    //TODO: Update the sidebar and load the feed
  }

  /*** Event Handlers ***/

  async _onListUsers() {
    let users = await User.listUsers();
    let usersStr = users.join("\n");
    alert(`List of users:\n\n${usersStr}`);
  }

  async _onLogin(event) {
    event.preventDefault();
    //TODO: Complete this function. You should set this._user and call loadProfile
  }
}

let app = new App();
app.setup();
