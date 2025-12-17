import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC2FhBEJC_VilXXm2i2l9rVjXthFUUQuao",
  authDomain: "travel-planner-d59ab.firebaseapp.com",
  projectId: "travel-planner-d59ab",
  storageBucket: "travel-planner-d59ab.firebasestorage.app",
  messagingSenderId: "845991687518",
  appId: "1:845991687518:web:8d356490f811f27fa6cbcf"
};

// Initialize Firebase only once
const app = firebase.apps.length > 0 ? firebase.app() : firebase.initializeApp(firebaseConfig);

// Use explicit casting to any to ensure compatibility between compat app and modular services
export const db = getFirestore(app as any);
export const auth = getAuth(app as any);