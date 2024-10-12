import firebase from 'firebase';

const db = firebase.database();

// Create a new session character
export const createSessionCharacter = (sessionCharacterData) => {
  const newSessionCharRef = db.ref('session_characters').push();
  return newSessionCharRef.set(sessionCharacterData).then(() => newSessionCharRef.key);
};

// Get session characters by session ID
export const getSessionCharactersBySessionId = (sessionId) => db
  .ref('session_characters')
  .orderByChild('session_id')
  .equalTo(sessionId)
  .once('value')
  .then((snapshot) => snapshot.val());

// Get a session character by ID
export const getSessionCharacterById = (sessionCharacterId) => db
  .ref(`session_characters/${sessionCharacterId}`)
  .once('value')
  .then((snapshot) => snapshot.val());

// Update a session character
export const updateSessionCharacter = (sessionCharacterId, data) => db.ref(`session_characters/${sessionCharacterId}`).update(data);

// Delete a session character
export const deleteSessionCharacter = (sessionCharacterId) => db.ref(`session_characters/${sessionCharacterId}`).remove();
