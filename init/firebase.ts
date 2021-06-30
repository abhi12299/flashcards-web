import firebase from "firebase/app";
import "firebase/auth";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyAftl-hJOyy11cH5ectl94atikFJYB2mVA",
    authDomain: "flashcards-eba01.firebaseapp.com",
    projectId: "flashcards-eba01",
    storageBucket: "flashcards-eba01.appspot.com",
    messagingSenderId: "27835384595",
    appId: "1:27835384595:web:f141fcfe38dd545d69d0e6",
    measurementId: "G-NFK6PYCRSR",
  });
}

export default firebase;
