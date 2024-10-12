// api/userService.js
import firebase from 'firebase';

const db = firebase.database();

// Get all users
export const getAllUsers = () => db
  .ref('users')
  .once('value')
  .then((snapshot) => snapshot.val());

// Get a user by ID
export const getUserById = (userId) => db
  .ref(`users/${userId}`)
  .once('value')
  .then((snapshot) => snapshot.val());
