// auth.js

import { firebase, clientCredentials } from './client';

const checkUser = (uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/users/${uid}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((resp) => resp.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const registerUser = (userInfo) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/users/${userInfo.uid}.json`, {
    method: 'PUT',
    body: JSON.stringify(userInfo),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(() => resolve(userInfo))
    .catch(reject);
});

const signIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

const signOut = () => {
  firebase.auth().signOut();
};

export {
  signIn,
  signOut,
  checkUser,
  registerUser,
};
