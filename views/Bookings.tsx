import React, { useState, useEffect } from 'react';
import { Card } from '../components/Card';
import { BookingItem } from '../types';
import { useFirestore } from '../hooks/useFirestore';
import { useSettings } from '../hooks/useSettings';

export const Bookings: React.FC = () => {
  const { data: bookings, add, remove } = useFirestore<BookingItem>('bookings');
  const { settings } = useSettings();

  // Preset 2 flights if empty
  useEffect(() => {
    if (bookings.length === 0) {
      add({ type: 'flight', title: 'Departing Flight', date: '2026-02-04', details: 'UO624', originCode: 'HKG', destCode: 'NRT', seat: '12A' });
      add({ type: 'flight', title: 'Return Flight', date: '2026-02-10', details: 'UO625', originCode: 'NRT', destCode: 'HKG', seat: '15C' });
    }
  }, [bookings.length]);

  const renderTicket = (booking: BookingItem) => {
    switch (booking.type) {
      case 'flight':
        return (
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-2 border-blue-500 mb-6">
            <div className="bg-blue-500 p-4 flex justify-between text-white font-black italic">
              <span>BOARDING PASS</span>
              <i className="fa-solid fa-plane"></i>
            </div>
            <div className="p-6 flex justify-between items-center bg-[radial-gradient(#eee_1px,transparent_1px)] bg-[size:10px_10px]">
              <div className="text-center">
                <h4 className="text-3xl font-black">{booking.originCode}</h4>
                <p className="text-[10px] font-bold text-gray-400">ORIGIN</p>
              </div>
              <div className="border-t-2 border-dashed border-gray-300 flex-1 mx-4 relative">
                <i className="fa-solid fa-plane absolute -top-2 left-1/2 -translate-x-1/2 text-blue-500"></i>
              </div>
              <div className="text-center">
                <h4 className="text-3xl font-black">{booking.destCode}</h4>
                <p className="text-[10px] font-bold text-gray-400">DEST</p>
              </div>
            </div>
            <div className="p-4 border-t-2 border-dashed border-gray-100 flex justify-between bg-gray-50">
              <div><p className="text-[8px] font-bold text-gray-400">FLIGHT</p><p className="font-bold">{booking.details}</p></div>
              <div><p className="text-[8px] font-bold text-gray-400">SEAT</p><p className="font-bold text-blue-500">{booking.seat}</p></div>
              <div><p className="text-[8px] font-bold text-gray-400">DATE</p><p className="font-bold">{booking.date}</p></div>
              <button onClick={() => remove(booking.id)} className="text-red-400"><i className="fa-solid fa-trash"></i></button>
            </div>
          </div>
        );
      case 'train':
      case 'arcade':
        return (
          <div className="bg-yellow-50 rounded-3xl border-2 border-duck-dark shadow-lg p-6 mb-6 flex gap-4 items-center relative overflow-hidden">
             <div className="absolute -left-4 w-8 h-8 rounded-full bg-blue-100 border-2 border-duck-dark"></div>
             <div className="absolute -right-4 w-8 h-8 rounded-full bg-blue-100 border-2 border-duck-dark"></div>
             <div className="w-12 h-12 rounded-full bg-duck-yellow flex items-center justify-center border-2 border-duck-dark">
                <i className={`fa-solid ${booking.type === 'train' ? 'fa-train' : 'fa-gamepad'} text-duck-dark`}></i>
             </div>
             <div className="flex-1">
                <h4 className="font-black text-duck-dark uppercase">{booking.title}</h4>
                <p className="text-xs font-bold text-gray-500">{booking.date} • {booking.details}</p>
             </div>
             <button onClick={() => remove(booking.id)} className="text-red-400"><i className="fa-solid fa-xmark"></i></button>
          </div>
        );
      default:
        return (
          <Card className="mb-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"><i className="fa-solid fa-hotel"></i></div>
            <div className="flex-1">
              <h4 className="font-bold">{booking.title}</h4>
              <p className="text-xs text-gray-400">{booking.date}</p>
            </div>
            <button onClick={() => remove(booking.id)} className="text-red-300"><i className="fa-solid fa-trash"></i></button>
          </Card>
        );
    }
  };

  return (
    <div className={`flex-1 overflow-y-auto pt-[env(safe-area-inset-top)] px-6 pb-24 ${settings.theme === 'stitch' ? 'stitch-bg' : 'notebook-bg'}`}>
      <div className="max-w-md mx-auto pt-8">
        <h1 className="text-3xl font-black mb-8 flex items-center gap-3">
          <i className="fa-solid fa-ticket-simple text-duck-blue"></i> Tickets & Bookings
        </h1>
        {bookings.map(booking => renderTicket(booking))}
        
        <div className="grid grid-cols-2 gap-4 mt-8">
           <button onClick={() => add({type: 'train', title: 'Shinkansen', date: '2026-02-05', details: 'Tokyo to Kyoto'})} className="p-4 bg-white rounded-2xl border-2 border-gray-100 font-bold flex flex-col items-center gap-2">
              <i className="fa-solid fa-train text-blue-500"></i> Train
           </button>
           <button onClick={() => add({type: 'arcade', title: 'Joypolis Pass', date: '2026-02-06', details: '1-Day Unlimited'})} className="p-4 bg-white rounded-2xl border-2 border-gray-100 font-bold flex flex-col items-center gap-2">
              <i className="fa-solid fa-gamepad text-purple-500"></i> Arcade
           </button>
        </div>
      </div>
    </div>
  );
};