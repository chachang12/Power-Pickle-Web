import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

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

const signUp = async (email, password, username, firstName, lastName, phoneNumber) => {
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
      });
  
      return user;
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  };
  
  export { app, analytics, db, auth, signUp };