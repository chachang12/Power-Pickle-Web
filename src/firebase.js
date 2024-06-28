import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc, arrayUnion, writeBatch, arrayRemove } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import imageCompression from 'browser-image-compression';



// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5-XS6OPRWQRo69Eqg-X1Cx0aai0HOpRo",
  authDomain: "power-pickle-2.firebaseapp.com",
  projectId: "power-pickle-2",
  storageBucket: "power-pickle-2.appspot.com",
  messagingSenderId: "198482397266",
  appId: "1:198482397266:web:56fb7bf629c5ab5c4cb78b",
  measurementId: "G-VMX8R3DX6M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Authentication
const auth = getAuth(app);

// Initialize Storage
const storage = getStorage();

const signUp = async (email, password, username, firstName, lastName, phoneNumber, mmr, profilePicture, matchesPlayed, wins, friends) => {
    try {
      // Create a new user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Create a new document in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        username,
        firstName,
        lastName,
        email,
        phoneNumber,
        mmr,
        profilePicture,
        matchesPlayed,
        wins,
        friends
      });
  
      return user;
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  };

const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return user;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

const logout = async () => {
  try {
    await signOut(auth); // sign the user out
    console.log('User signed out');
  } catch (error) {
    console.error('Error signing out', error);
  }
};

const uploadImageAndGetURL = async (imageFile) => {
  try {
    // Compress the image
    const options = {
      maxSizeMB: 1, // (default: Number.POSITIVE_INFINITY)
      maxWidthOrHeight: 1920, // compressedFile will scale down by ratio to a point that width or height is smaller than maxWidthOrHeight (default: undefined)
      useWebWorker: true, // optional, use multi-thread web worker, fallback to run in main-thread (default: true)
    };
    const compressedFile = await imageCompression(imageFile, options);

    // Generate a unique filename based on the current time and the original file name
    const filename = `${Date.now()}_${imageFile.name}`;

    // Upload the image to Firebase Storage
    const storageRef = ref(storage, `images/${filename}`);
    const uploadTask = uploadBytesResumable(storageRef, compressedFile);

    // Attach a state observer to handle state changes
    return new Promise((resolve, reject) => {
      uploadTask.on('state_changed', (snapshot) => {
        // Handle state changes
      }, (error) => {
        // Handle unsuccessful uploads
        console.error('Error uploading image:', error);
        reject(error);
      }, async () => {
        // Handle successful uploads on complete
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        } catch (error) {
          console.error('Error getting download URL:', error);
          reject(error);
        }
      });
    });
  } catch (error) {
    console.error('Error compressing image:', error);
    throw error;
  }
};

const updateUserData = async (imageUrl) => {
  const user = auth.currentUser;
  const userRef = doc(db, 'users', user.uid);
  await updateDoc(userRef, {
    profilePicture: imageUrl
  });
};

const getUserData = async () => {
  const user = auth.currentUser;

  if (user) {
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();
      const { username, wins, matchesPlayed, mmr, profilePicture, friends, firstName } = userData;

      return { id: user.uid, username, wins, matchesPlayed, mmr, profilePicture, friends, firstName};
    } else {
      console.log('No such document!');
    }
  } else {
    console.log('No user is signed in.');
  }
};

const addFriend = async (friend) => {
  const friendId = friend.id;
  const user = auth.currentUser;

  if (user) {
    const userRef = doc(db, 'users', user.uid);
    const friendRef = doc(db, 'users', friendId);

    // Start a batch
    const batch = writeBatch(db);

    // Get current user and friend data
    const userSnap = await getDoc(userRef);
    const friendSnap = await getDoc(friendRef);

    // Ensure friends array exists
    const userFriends = userSnap.data().friends || [];
    const friendFriends = friendSnap.data().friends || [];

    // Update the current user's friends array
    batch.update(userRef, {
      friends: [...userFriends, friendId]
    });

    // Update the friend's friends array
    batch.update(friendRef, {
      friends: [...friendFriends, user.uid]
    });

    // Commit the batch
    await batch.commit();
  } else {
    console.log('No user is signed in.');
  }
};

const removeFriend = async (friendId) => {
  const user = auth.currentUser;

  if (user) {
    const userRef = doc(db, 'users', user.uid);
    const friendRef = doc(db, 'users', friendId);

    // Start a batch
    const batch = writeBatch(db);

    // Get current user and friend data
    const userSnap = await getDoc(userRef);
    const friendSnap = await getDoc(friendRef);

    if (!userSnap.exists() || !friendSnap.exists()) {
      console.log('One of the users does not exist.');
      return;
    }

    // Ensure friends array exists
    const userFriends = userSnap.data().friends || [];
    const friendFriends = friendSnap.data().friends || [];

    // Correctly modify the current user's friends array
    const updatedUserFriends = userFriends.filter(id => id !== friendId);

    // Correctly modify the friend's friends array
    const updatedFriendFriends = friendFriends.filter(id => id !== user.uid);

    // Update the current user's friends array
    batch.update(userRef, {
      friends: updatedUserFriends
    });

    // Update the friend's friends array
    batch.update(friendRef, {
      friends: updatedFriendFriends
    });

    // Commit the batch
    await batch.commit();
  } else {
    console.log('No user is signed in.');
  }
};


export { app, analytics, db, auth, signUp, signIn, logout, getUserData, uploadImageAndGetURL, updateUserData, addFriend, removeFriend };