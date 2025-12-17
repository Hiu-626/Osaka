export enum Tab {
  Schedule = 'schedule',
  Bookings = 'bookings',
  Expense = 'expense',
  Journal = 'journal',
  Planning = 'planning',
  Members = 'members'
}

export type CategoryType = 'sightseeing' | 'food' | 'transport' | 'stay' | 'misc';

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
  photoUrl?: string;
  mapLink?: string;
}

export interface BookingItem {
  id: string;
  type: 'flight' | 'hotel' | 'car' | 'ticket';
  title: string;
  date: string;
  details: string;
  originCode?: string;
  destCode?: string;
  originCity?: string;
  destCity?: string;
  seat?: string;
  checkIn?: string;
  checkOut?: string;
  address?: string;
  cost?: number;
  currency?: string;
  splitBy?: number;
  pickupLocation?: string;
  dropoffLocation?: string;
  vouchers?: string[];
}

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  assignee?: string;
  type: 'packing' | 'shopping';
}

export interface Member {
  id: string;
  name: string;
  role: string;
  img: number;
}

export interface JournalItem {
  id: string;
  author: string;
  avatarId: number;
  imageUrl: string;
  content: string;
  location: string;
  date: string;
}