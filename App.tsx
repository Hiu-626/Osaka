// App.tsx
import React from "react";
import { db } from "./services/firebase";
import { collection, addDoc } from "firebase/firestore";

function App() {

  const testWrite = async () => {
    try {
      const docRef = await addDoc(collection(db, "trips"), {
        city: "Osaka",
        days: 5,
        budget: 1200,
        createdAt: new Date()
      });
      alert("Document written with ID: " + docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("Error: " + e);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Travel Planner Test</h1>
      <button onClick={testWrite} style={{ padding: "1rem", fontSize: "16px" }}>
        Add Test Trip
      </button>
    </div>
  );
}

export default App;
