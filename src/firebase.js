// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAEvB6TQVrH99GXteFAGl9zHGHKg_oJats",
    authDomain: "ngo-photogallery.firebaseapp.com",
    projectId: "ngo-photogallery",
    storageBucket: "ngo-photogallery.appspot.com",
    messagingSenderId: "976435821489",
    appId: "1:976435821489:web:1df1f80a88a7ab082a1b90",
    measurementId: "G-CFVDQCCNZV"
  };

const app = initializeApp(firebaseConfig);

// Exporting Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

