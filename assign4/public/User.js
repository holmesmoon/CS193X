import apiRequest from "./api.js";

/* A small class to represent a Post */
export class Post {
  constructor(data) {
    this.user = data.user;
    this.time = new Date(data.time);
    this.text = data.text;
  }
}

export default class User {
  /* Returns an array of user IDs */
  static async listUsers() {
    let [status, data] = await apiRequest("GET", `/users`);
    if (status !== 200) throw new Error("Couldn't get list of users");
    return data.users;
  }

  /* Returns a User object, creating the user if necessary */
  static async loadOrCreate(id) {
    let users = await this.listUsers();
    let status, data;
    if (!(users.includes(id))) {
      let newUser = { id: id };
      [status, data] = await apiRequest("POST", `/users`, newUser);
    } else {
      [status, data] = await apiRequest("GET", `/users/${id}`);
    }
    return new User(data);
  }

  constructor(data) {
    Object.assign(this, data);
    this._path = `/users/${this.id}`;
  }

  async save() {
    let update = { name: this.name, avatarURL: this.avatarURL };
    let [status, data] = await apiRequest("PATCH", `${this._path}`, update) ;
    return data;
  }

  /* Returns an array of Post objects */
  async getFeed() {
    let [status, data] = await apiRequest("GET", `${this._path}/feed`);
    return data.posts;
  }

  async makePost(text) {
    let post = { text: text }
    let [status, data] = await apiRequest("POST", `${this._path}/posts`, post);
    return data;
  }

  async addFollow(id) {
    let [status, data] = await apiRequest("POST", `${this._path}/follow?target=${id}`);
    return data;
  }

  async deleteFollow(id) {
    let [status, data] = await apiRequest("DELETE", `${this._path}/follow?target=${id}`);
    return data;
  }
}
