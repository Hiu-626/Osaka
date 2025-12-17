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
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

async function testWrite() {
  try {
    const docRef = await addDoc(collection(db, "trips"), {
      city: "Osaka",
      days: 5,
      budget: 1200,
      createdAt: new Date()
    });
    console.log("Document written with ID:", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// 🔴 暫時直接呼叫一次
testWrite();
