import firebase from 'firebase';

const db = firebase.database();

// Get all characters
export const getAllCharacters = () => db
  .ref('characters')
  .once('value')
  .then((snapshot) => snapshot.val());

// Get a character by ID
export const getCharacterById = (characterId) => db
  .ref(`characters/${characterId}`)
  .once('value')
  .then((snapshot) => snapshot.val());
