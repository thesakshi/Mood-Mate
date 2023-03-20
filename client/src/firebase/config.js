import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCh3jOiGmI8JrIZy9mvWev76ysQ06KcCuU",
  authDomain: "moodmate-cffce.firebaseapp.com",
  projectId: "moodmate-cffce",
  storageBucket: "moodmate-cffce.appspot.com",
  messagingSenderId: "723325216720",
  appId: "1:723325216720:web:64d010cb9ff1059ac27bd5",
  measurementId: "G-34Y0KG20ZX",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}



export { firebase };
