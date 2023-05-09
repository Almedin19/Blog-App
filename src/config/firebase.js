// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBKRBt_bbIKGPFhKSUnDpVRKpSabgXm8E0",
  authDomain: "blogs-4a935.firebaseapp.com",
  projectId: "blogs-4a935",
  storageBucket: "blogs-4a935.appspot.com",
  messagingSenderId: "651766845649",
  appId: "1:651766845649:web:a60c4d9c2133f338e9b5f0",
  measurementId: "G-Y9193VMD75",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);
