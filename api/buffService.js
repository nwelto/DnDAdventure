// api/buffService.js
import firebase from 'firebase';

const db = firebase.database();

// Get all buffs
export const getAllBuffs = () => db
  .ref('buffs')
  .once('value')
  .then((snapshot) => snapshot.val());

// Get buffs by target_id
export const getBuffsByTargetId = (targetId) => db
  .ref('buffs')
  .orderByChild('target_id')
  .equalTo(targetId)
  .once('value')
  .then((snapshot) => snapshot.val());

// Get a buff by ID
export const getBuffById = (buffId) => db
  .ref(`buffs/${buffId}`)
  .once('value')
  .then((snapshot) => snapshot.val());

// Create a new buff (if buffs are dynamic during gameplay)
export const createBuff = (buffData) => {
  const newBuffRef = db.ref('buffs').push();
  return newBuffRef.set(buffData).then(() => newBuffRef.key);
};
