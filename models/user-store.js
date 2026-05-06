'use strict';

import JsonStore from './json-store.js';
import logger from '../utils/logger.js';

const userStore = {

  store: new JsonStore('./models/user-store.json', { users: [] }),
  collection: 'users',

  getAllUsers() {
    return this.store.findAll(this.collection);
  },

  getUser(id) {
    return this.store.findOneBy(this.collection, (user => user.id === id));
  },

  getUserByEmail(email) {
    return this.store.findOneBy(this.collection, (user => user.email === email));
  },

  async addUser(user, file, response) {
    try {
      user.picture = await this.store.addToCloudinary(file);
      this.store.addCollection(this.collection, user);
      response();
    } catch (error) {
      logger.error("Error processing user:", error);
      response(error);
    }
  },

  removeUser(id) {
    const user = this.getUser(id);
    this.store.removeCollection(this.collection, user);
  },

};

export default userStore;