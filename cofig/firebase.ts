// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {initializeAuth, getReactNativePersistence} from 'firebase/auth'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbDEMjqfkbZJLepKrIym-sQsPCwTohpUo",
  authDomain: "expense-tracker-96a0f.firebaseapp.com",
  projectId: "expense-tracker-96a0f",
  storageBucket: "expense-tracker-96a0f.firebasestorage.app",
  messagingSenderId: "99147792168",
  appId: "1:99147792168:web:d4c8af22c766004cc61a1d",
  measurementId: "G-7F0VN14809"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
//auth
export const auth=initializeAuth(app,{
  persistence:getReactNativePersistence(AsyncStorage)
})
//db
export const firestore=getFirestore(app);