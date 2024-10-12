import firebase from 'firebase';

const db = firebase.database();

// Create a new session
export const createSession = (sessionData) => {
  const newSessionRef = db.ref('sessions').push();
  return newSessionRef.set(sessionData).then(() => newSessionRef.key);
};

// Get a session by ID
export const getSessionById = (sessionId) => db
  .ref(`sessions/${sessionId}`)
  .once('value')
  .then((snapshot) => snapshot.val());

// Get all sessions
export const getAllSessions = () => db
  .ref('sessions')
  .once('value')
  .then((snapshot) => snapshot.val());

// Update a session
export const updateSession = (sessionId, sessionData) => db.ref(`sessions/${sessionId}`).update(sessionData);

// Delete a session
export const deleteSession = (sessionId) => db.ref(`sessions/${sessionId}`).remove();
