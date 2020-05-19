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
    let [status, data] = await apiRequest("GET", `/api/users`);
    if (status !== 200) throw new Error("Couldn't get list of users");
    return data.users;
  }

  /* Returns a User object, creating the user if necessary */
  static async loadOrCreate(id) {
    let users = listUsers();
    let status, data;
    if (!users.includes(id)) {
      [status, data] = await apiRequest("POST", `/api/users/`, id);
    } else {
      [status, data] = await apiRequest("GET", `/api/users/${id}`);
    }
    return new User(data);
  }

  constructor(data) {
    Object.assign(this, data);
    this._path = `/api/users/${this.id}`;
  }

  async save() {
    let [status, data] = await apiRequest("PATCH", `${this._path}`) ;
    return data;
  }

  /* Returns an array of Post objects */
  async getFeed() {
    let [status, data] = await apiRequest("GET", `${this._path}/feed`);
    return data;
  }

  async makePost(text) {
    let [status, data] = await apiRequest("POST", `${this._path}/posts`,text);
    return data.success;
  }

  async addFollow(id) {
    try {
      let [status, data] = await apiRequest("POST", `${this._path}/follow?target=${id}`);
      return data.success;
    } catch {
      alert(e.message);
    }
  }

  async deleteFollow(id) {
    try {
      let [status, data] = await apiRequest("DELETE", `${this._path}/follow?target=${id}`);
      return data.success;
    } catch {
      alert(e.message);
    }
  }
}
