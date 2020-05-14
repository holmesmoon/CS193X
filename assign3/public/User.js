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
    let [status, data] = await apiRequest("GET", "/users");
    if (status !== 200) throw new Error("Couldn't get list of users");
    return data.users;
  }
  
  /* Returns a User object, creating hte user if necessary */
  static async loadOrCreate(id) {
    //TODO
  }

  constructor(data) {
    //TODO
  }

  async save() {
    //TODO
  }

  /* Returns an array of Post objects */
  async getFeed() {
    //TODO
  }

  async makePost(text) {
    //TODO
  }

  async addFollow(id) {
    //TODO
  }

  async deleteFollow(id) {
    //TODO
  }
}
