// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC2FhBEJC_VilXXm2i2l9rVjXthFUUQuao",
  authDomain: "travel-planner-d59ab.firebaseapp.com",
  projectId: "travel-planner-d59ab",
  storageBucket: "travel-planner-d59ab.firebasestorage.app",
  messagingSenderId: "845991687518",
  appId: "1:845991687518:web:8d356490f811f27fa6cbcf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔥 Firestore
export const db = getFirestore(app);