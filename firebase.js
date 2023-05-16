// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBovvCGpeQeHYEVKbThIX5nZub0EPb_iPc",
  authDomain: "blog-9afc2.firebaseapp.com",
  projectId: "blog-9afc2",
  storageBucket: "blog-9afc2.appspot.com",
  messagingSenderId: "749384621750",
  appId: "1:749384621750:web:5308df7a25b41c2f8a9017",
  measurementId: "G-0ZLWLKKHND"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth(app)
export const db=getFirestore(app)
export const storage=getStorage(app)