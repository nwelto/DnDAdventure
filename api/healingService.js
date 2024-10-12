// api/healingService.js
import firebase from 'firebase';

const db = firebase.database();

// Get all healing records
export const getAllHealing = () => db
  .ref('healing')
  .once('value')
  .then((snapshot) => snapshot.val());

// Get healing records by target_id
export const getHealingByTargetId = (targetId) => db
  .ref('healing')
  .orderByChild('target_id')
  .equalTo(targetId)
  .once('value')
  .then((snapshot) => snapshot.val());

// Get a healing record by ID
export const getHealingById = (healingId) => db
  .ref(`healing/${healingId}`)
  .once('value')
  .then((snapshot) => snapshot.val());

// Create a new healing record (if healing events are recorded dynamically)
export const createHealing = (healingData) => {
  const newHealingRef = db.ref('healing').push();
  return newHealingRef.set(healingData).then(() => newHealingRef.key);
};
