import { useState, useEffect } from 'react';
import { db } from '../services/firebase';
import { 
  collection, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query
} from 'firebase/firestore';

// Hardcoded trip ID for this specific group trip
const TRIP_ID = 'japan_2026_trip';

export const useFirestore = <T extends { id: string }>(collectionName: string) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // We store data in: trips/{TRIP_ID}/{collectionName}
    // e.g. trips/japan_2026_trip/schedule
    const colRef = collection(db, 'trips', TRIP_ID, collectionName);
    const q = query(colRef);

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const results: T[] = [];
      snapshot.forEach((doc) => {
        results.push({ ...doc.data(), id: doc.id } as T);
      });
      setData(results);
      setLoading(false);
    }, (error) => {
      console.error("Firestore Error:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [collectionName]);

  const add = async (item: Omit<T, 'id'>) => {
    const colRef = collection(db, 'trips', TRIP_ID, collectionName);
    await addDoc(colRef, item);
  };

  const update = async (id: string, item: Partial<T>) => {
    const docRef = doc(db, 'trips', TRIP_ID, collectionName, id);
    await updateDoc(docRef, item);
  };

  const remove = async (id: string) => {
    const docRef = doc(db, 'trips', TRIP_ID, collectionName, id);
    await deleteDoc(docRef);
  };

  return { data, loading, add, update, remove };
};