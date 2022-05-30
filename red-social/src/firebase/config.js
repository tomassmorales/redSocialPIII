import app from "firebase/app";
import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyBQIkLTwPHuUJ12bX6kNDEtBR8GSo8jMEY",
  authDomain: "proyectointegradorprogiii.firebaseapp.com",
  projectId: "proyectointegradorprogiii",
  storageBucket: "proyectointegradorprogiii.appspot.com",
  messagingSenderId: "103089287579",
  appId: "1:103089287579:web:2568505b4be0cf0ae9313e"
};

app.initializeApp(firebaseConfig)

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();