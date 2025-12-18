
export enum Tab {
  Schedule = 'schedule',
  Bookings = 'bookings',
  Expense = 'expense',
  Journal = 'journal',
  Planning = 'planning',
  Members = 'members'
}

export type ThemeType = 'donald' | 'stitch';
export type CategoryType = 'sightseeing' | 'food' | 'transport' | 'stay' | 'misc';

export interface AppSettings {
  tripStartDate: string;
  tripDuration: number;
  activeUserId: string;
  theme: ThemeType;
}

export interface ExpenseItem {
  id: string;
  amount: number;
  currency: 'HKD' | 'JPY' | 'AUD';
  category: CategoryType;
  payer: string;
  date: string;
  note?: string;
}

export interface ScheduleItem {
  id: string;
  dayIndex: number;
  time: string;
  title: string;
  type: CategoryType;
  location?: string;
  notes?: string;
  travelTime?: string;
  order: number;
}

export interface BookingItem {
  id: string;
  type: 'flight' | 'hotel' | 'car' | 'ticket' | 'restaurant' | 'train' | 'arcade';
  title: string;
  date: string;
  details: string;
  originCode?: string;
  destCode?: string;
  seat?: string;
  address?: string;
}

export interface Member {
  id: string;
  name: string;
  role: string;
  img: number;
}

// Added avatarId to fix type error in views/Journal.tsx
export interface JournalItem {
  id: string;
  author: string;
  avatarId: number;
  imageUrl: string;
  content: string;
  location: string;
  date: string;
}

// Added missing TodoItem interface used in views/Planning.tsx
export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  type: 'packing' | 'shopping';
}
