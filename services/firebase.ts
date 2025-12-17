import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC2FhBEJC_VilXXm2i2l9rVjXthFUUQuao",
  authDomain: "travel-planner-d59ab.firebaseapp.com",
  projectId: "travel-planner-d59ab",
  storageBucket: "travel-planner-d59ab.firebasestorage.app",
  messagingSenderId: "845991687518",
  appId: "1:845991687518:web:8d356490f811f27fa6cbcf"
};

const app = firebase.apps.length > 0 ? firebase.app() : firebase.initializeApp(firebaseConfig);
export const db = app.firestore();
export const auth = app.auth();