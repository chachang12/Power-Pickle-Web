import { collection, doc, getDoc, getDocs, query, where, addDoc, updateDoc, increment } from 'firebase/firestore';
import { db } from './firebase';

export const searchUsers = async (username) => {
    const q = query(collection(db, 'users'), where('username', '==', username));
    const querySnapshot = await getDocs(q);
  
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

export async function getUserFriendsIds(user) {
    const userDocRef = doc(db, 'users', user.uid);
    const userDocSnap = await getDoc(userDocRef);
  
    if (userDocSnap.exists()) {
      const friendsIds = userDocSnap.data().friends;
      console.log("Friend IDs:", friendsIds);
      return friendsIds;
    } else {
      console.log("No such user!");
      return null;
    }
  }

export async function getUserFriends(user) {
  const userDocRef = doc(db, 'users', user.uid);
  const userDocSnap = await getDoc(userDocRef);

  if (userDocSnap.exists()) {
    const friendsIds = userDocSnap.data().friends;
    console.log("Friend IDs:", friendsIds);
    
    const friends = [];
    for (let id of friendsIds) {
      const friendDocRef = doc(db, 'users', id);
      const friendDocSnap = await getDoc(friendDocRef);
      if (friendDocSnap.exists()) {
        friends.push({ id: friendDocSnap.id, ...friendDocSnap.data() });
      }
    }
    return friends;
  } else {
    console.log("No such user!");
    return null;
  }
}

export async function createMatch(match) {
  try {
    const docRef = await addDoc(collection(db, "matches"), match);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function fetchMatchesForUser(userId) {
  const matchesRef = collection(db, 'matches');
  const q1 = query(matchesRef, where('team1PlayerIds', 'array-contains', userId));
  const q2 = query(matchesRef, where('team2PlayerIds', 'array-contains', userId));

  const matches = [];

  const querySnapshot1 = await getDocs(q1);
  querySnapshot1.forEach((doc) => {
    matches.push({ id: doc.id, ...doc.data() });
  });

  const querySnapshot2 = await getDocs(q2);
  querySnapshot2.forEach((doc) => {
    matches.push({ id: doc.id, ...doc.data() });
  });

  return matches;
}

export async function fetchUserFromId(id) {
  const userDocRef = doc(db, 'users', id);
  const userDocSnap = await getDoc(userDocRef);

  if (userDocSnap.exists()) {
    return { id: userDocSnap.id, ...userDocSnap.data() };
  } else {
    console.log("No such user!");
    return null;
  }
}

export async function fetchUserFromUsername(username) {
  const q = query(collection(db, 'users'), where('username', '==', username));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.docs.length > 0) {
    return { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() };
  } else {
    console.log("No such user!");
    return null;
  }
}

export async function updateUserMMR(userId, mmrChange) {
  const userRef = doc(db, 'users', userId);

  // Atomically increment the user's MMR.
  await updateDoc(userRef, {
    mmr: increment(mmrChange)
  });
}

export async function incrementUserWins(userId) {
  const userRef = doc(db, 'users', userId);

  // Atomically increment the user's wins.
  await updateDoc(userRef, {
    wins: increment(1)
  });
}