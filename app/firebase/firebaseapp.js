import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore,  } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAB1kKzXjSLhg1XLVMhEk3bBtitRIwPuPM",
  authDomain: "drops-e38b3.firebaseapp.com",
  projectId: "drops-e38b3",
  storageBucket: "drops-e38b3.appspot.com",
  messagingSenderId: "668468630358",
  appId: "1:668468630358:web:21a3ae16fa68b19175bcf7"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

export { app, db, auth }