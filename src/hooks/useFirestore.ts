import { useState, useEffect } from 'react';

// --- INITIAL MOCK DATA ---
const INITIAL_DATA: Record<string, any[]> = {
  schedule: [
    { id: '1', dayIndex: 0, time: '09:00', title: 'Arrive at Narita', type: 'transport', location: 'NRT Terminal 1', notes: 'Pick up pocket WiFi @ Counter A' },
    { id: '2', dayIndex: 0, time: '11:30', title: 'Skyliner to Ueno', type: 'transport', location: 'Keisei Line', notes: 'Seats 4A, 4B' },
    { id: '3', dayIndex: 0, time: '13:00', title: 'Check-in Hotel', type: 'stay', location: 'Mimaru Tokyo Ueno', notes: 'Booking #88291' },
    { id: '4', dayIndex: 0, time: '14:30', title: 'Ameyoko Street Food', type: 'food', location: 'Ueno', notes: 'Must try the takoyaki' },
    { id: '5', dayIndex: 0, time: '19:00', title: 'Ichiran Ramen', type: 'food', location: 'Ueno Station', notes: 'No spicy for Daisy' },
    { id: '6', dayIndex: 1, time: '08:00', title: 'DisneySea Ropeway', type: 'sightseeing', location: 'Maihama', notes: 'Get Premier Access for Soaring' },
    { id: '7', dayIndex: 1, time: '12:00', title: 'Lunch @ Vulcania', type: 'food', location: 'Mysterious Island', notes: 'Chinese food' },
    { id: '8', dayIndex: 2, time: '10:00', title: 'TeamLab Planets', type: 'sightseeing', location: 'Toyosu', notes: 'Wear shorts (water area)' },
  ],
  bookings: [
    { id: 'b1', type: 'flight', title: 'HK Express', date: '2026/02/04', details: 'UO 624', originCode: 'HKG', destCode: 'NRT', originCity: 'Hong Kong', destCity: 'Tokyo', seat: '12A' },
    { id: 'b2', type: 'hotel', title: 'Mimaru Ueno North', date: 'Feb 4 - Feb 8', details: 'Family Apartment', checkIn: '15:00', checkOut: '11:00', address: 'Ueno 7-chome, Taito City' },
    { id: 'b3', type: 'ticket', title: 'DisneySea Pass', date: '2026/02/05', details: 'QR Code saved to album', originCode: '', destCode: '', seat: '' },
  ],
  expenses: [
    { id: 'e1', amount: 3200, currency: 'JPY', category: 'transport', payer: 'Me', date: '02/04', note: 'Skyliner tickets' },
    { id: 'e2', amount: 5000, currency: 'JPY', category: 'food', payer: 'Scrooge', date: '02/04', note: 'Convenience store snacks' },
    { id: 'e3', amount: 28000, currency: 'JPY', category: 'stay', payer: 'Me', date: '02/04', note: 'Hotel Tax' },
  ],
  journal: [
    { id: 'j1', author: 'Me', avatarId: 10, imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&auto=format&fit=crop', content: 'Finally landed in Tokyo! The weather is surprisingly warm for February.', location: 'Narita Airport', date: '10:30 AM' },
    { id: 'j2', author: 'Daisy', avatarId: 32, imageUrl: 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=800&auto=format&fit=crop', content: 'The cherry blossoms are blooming early in Ueno Park! So magical.', location: 'Ueno Park', date: '02:00 PM' },
  ],
  planning: [
    { id: 'p1', text: 'Buy Power Bank', completed: true, type: 'shopping' },
    { id: 'p2', text: 'Uniqlo Heattech', completed: false, type: 'shopping' },
    { id: 'p3', text: 'Passports', completed: true, type: 'packing' },
    { id: 'p4', text: 'Universal Plug Adapter', completed: false, type: 'packing' },
  ],
  members: [
    { id: 'm1', name: 'Donald', role: 'Organizer', img: 12 },
    { id: 'm2', name: 'Daisy', role: 'Photographer', img: 32 },
    { id: 'm3', name: 'Scrooge', role: 'Banker', img: 5 },
    { id: 'm4', name: 'Huey', role: 'Navigator', img: 60 },
  ]
};

export const useFirestore = <T extends { id: string }>(collectionName: string) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  // Load from LocalStorage or use Initial Data
  useEffect(() => {
    const loadData = () => {
      const key = `ducktravel_${collectionName}`;
      const stored = localStorage.getItem(key);
      
      if (stored) {
        setData(JSON.parse(stored));
      } else {
        // First time load: use Mock Data
        const initial = INITIAL_DATA[collectionName] || [];
        localStorage.setItem(key, JSON.stringify(initial));
        setData(initial as T[]);
      }
      setLoading(false);
    };

    loadData();
    
    // Listen for storage events (optional, mostly for multi-tab sync, 
    // but here mainly to ensure React re-renders if we update locally)
  }, [collectionName]);

  const saveData = (newData: T[]) => {
    const key = `ducktravel_${collectionName}`;
    localStorage.setItem(key, JSON.stringify(newData));
    setData(newData);
  };

  const add = async (item: Omit<T, 'id'>) => {
    // Generate a random ID
    const newItem = { ...item, id: Math.random().toString(36).substr(2, 9) } as T;
    const newData = [...data, newItem];
    saveData(newData);
    return Promise.resolve(); // Keep Promise API to match previous interface
  };

  const update = async (id: string, item: Partial<T>) => {
    const newData = data.map(doc => 
      doc.id === id ? { ...doc, ...item } : doc
    );
    saveData(newData);
    return Promise.resolve();
  };

  const remove = async (id: string) => {
    const newData = data.filter(doc => doc.id !== id);
    saveData(newData);
    return Promise.resolve();
  };

  return { data, loading, add, update, remove };
};