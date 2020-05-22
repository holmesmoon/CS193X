import User from "./User.js";
import EditableText from "./EditableText.js";
import DynamicList from "./DynamicList.js";

class App {
  constructor() {
    this._user = null;

    this._loginForm = null;
    this._postForm = null;
    this._sidebar = null;

    this._onListUsers = this._onListUsers.bind(this);
    this._onLogin = this._onLogin.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onAdd = this._onAdd.bind(this);
    this._onDelete = this._onDelete.bind(this);
    this._makePost = this._makePost.bind(this);

    this._displayName = new EditableText("displayName");
    this._avatarURL = new EditableText("avatarURL");
    this._following = new DynamicList("Follower ID");
  }

  setup() {
    this._loginForm = document.querySelector("#loginForm");
    this._loginForm.login.addEventListener("click", this._onLogin);
    this._loginForm.listUsers.addEventListener("click", this._onListUsers);

    this._postForm = document.querySelector("#postForm");
    this._postForm.postButton.addEventListener("click", this._makePost);

    this._displayName.addToDOM(document.querySelector("#nameContainer"), this._onChange);
    this._avatarURL.addToDOM(document.querySelector("#avatarContainer"), this._onChange);
    this._following.addToDOM(document.querySelector("#followContainer"), this._onAdd, this._onDelete);
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

    this._displayName.setValue(this._user.name);
    this._avatarURL.setValue(this._user.avatarURL);
    this._following.setList(this._user.following);

    let posts = await this._user.getFeed();
    for (let post of posts) {
      this._displayPost(post);
    }
  }

  /*** Event Handlers ***/

  async _onListUsers() {
    let users = await User.listUsers();
    let usersStr = users.join("\n");
    alert(`List of users:\n\n${usersStr}`);
  }

  async _onLogin(event) {
    event.preventDefault();
    let id = document.querySelector("input").value;
    this._user = await User.loadOrCreate(id);
    await this._loadProfile();
  }

  async _onChange(text) {
    if (text.id === "displayName") {
      this._user.name = text.value;
    } else {
      this._user.avatarURL = text.value;
    }
    await this._user.save();
    await this._loadProfile();
  }

  async _onAdd(id) {
    await this._user.addFollow(id);
    let [status, data] = await apiRequest("GET", `/users/${this._user.id}`);
    this._user.following = data.following;
    await this._loadProfile();
  }

  async _onDelete(id) {
    let list = await this._user.deleteFollow(id);
    let [status, data] = await apiRequest("GET", `/users/${this._user.id}`);
    this._user.following = data.following;
    await this._loadProfile();
  }

  async _makePost(event) {
    event.preventDefault();
    let form = document.querySelector("#postForm");
    await this._user.makePost(this._postForm.newPost.value);
    form.reset();
    await this._loadProfile();
  }
}

let app = new App();
app.setup();
