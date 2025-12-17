import React, { useState } from 'react';
import { Card } from '../components/Card';
import { BookingItem } from '../types';

export const Bookings: React.FC = () => {
  const [editingId, setEditingId] = useState<string | null>(null);

  const [bookings, setBookings] = useState<BookingItem[]>([
    { 
      id: 'b1', 
      type: 'flight', 
      title: 'JL 123', 
      date: 'Feb 4, 09:00', 
      details: 'Seat 14A, Gate 52',
      originCode: 'TPE',
      destCode: 'NRT',
      originCity: 'Taipei',
      destCity: 'Tokyo',
      seat: '14A'
    },
    { 
      id: 'b2', 
      type: 'hotel', 
      title: 'Disney Resort Hotel', 
      date: 'Feb 4 - Feb 8', 
      details: 'Ocean View Room',
      checkIn: '15:00',
      checkOut: '11:00',
      address: '1-1 Maihama, Urayasu',
      cost: 120000,
      currency: 'JPY',
      splitBy: 4
    },
    {
      id: 'b3',
      type: 'car',
      title: 'Toyota Rent-a-Car',
      date: 'Feb 6',
      details: 'Alphard Class',
      pickupLocation: 'Maihama Station',
      dropoffLocation: 'Narita Airport'
    }
  ]);

  const updateBooking = (id: string, field: keyof BookingItem, value: any) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, [field]: value } : b));
  };

  return (
    <div className="pb-20 pt-4 px-4 max-w-md mx-auto h-full overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-black text-duck-dark ml-2">My Bookings</h1>
        <button className="bg-duck-yellow w-10 h-10 rounded-full flex items-center justify-center border-2 border-duck-dark shadow-md">
            <i className="fa-solid fa-plus"></i>
        </button>
      </div>

      {bookings.map((booking) => {
        const isEditing = editingId === booking.id;

        return (
          <div key={booking.id} className="mb-6 relative group">
            {/* Edit Button Toggle */}
            <div className="absolute right-0 top-0 -mt-3 mr-2 z-10 flex gap-2">
                 <button 
                    onClick={() => setEditingId(isEditing ? null : booking.id)}
                    className="bg-white w-8 h-8 rounded-full shadow-md text-gray-500 border border-gray-200 flex items-center justify-center hover:text-duck-blue active:scale-95 transition-all"
                 >
                   <i className={`fa-solid ${isEditing ? 'fa-check text-green-500' : 'fa-pen'}`}></i>
                 </button>
            </div>

            {booking.type === 'flight' ? (
               <div className="bg-white rounded-2xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
                 <div className="bg-duck-blue p-4 flex justify-between items-center text-white">
                   <div className="flex items-center">
                     <i className="fa-solid fa-plane mr-2"></i>
                     {isEditing ? (
                        <input 
                           className="bg-transparent border-b border-white/50 text-white font-bold w-20 focus:outline-none" 
                           value={booking.title} 
                           onChange={(e) => updateBooking(booking.id, 'title', e.target.value)} 
                        />
                     ) : (
                        <span className="font-bold text-lg">{booking.title}</span>
                     )}
                   </div>
                   <span className="font-mono opacity-80">ECONOMY</span>
                 </div>
                 <div className="p-4 relative">
                   <div className="flex justify-between items-center mb-4">
                        <div className="text-center">
                            {isEditing ? (
                                <>
                                  <input className="text-3xl font-black text-gray-800 w-16 text-center border-b focus:outline-none" value={booking.originCode} onChange={(e) => updateBooking(booking.id, 'originCode', e.target.value)} />
                                  <input className="text-xs text-gray-500 w-16 text-center border-b block mt-1 focus:outline-none" value={booking.originCity} onChange={(e) => updateBooking(booking.id, 'originCity', e.target.value)} />
                                </>
                            ) : (
                                <>
                                  <div className="text-3xl font-black text-gray-800">{booking.originCode}</div>
                                  <div className="text-xs text-gray-500">{booking.originCity}</div>
                                </>
                            )}
                        </div>
                        <i className="fa-solid fa-plane text-duck-blue text-xl"></i>
                        <div className="text-center">
                            {isEditing ? (
                                <>
                                  <input className="text-3xl font-black text-gray-800 w-16 text-center border-b focus:outline-none" value={booking.destCode} onChange={(e) => updateBooking(booking.id, 'destCode', e.target.value)} />
                                  <input className="text-xs text-gray-500 w-16 text-center border-b block mt-1 focus:outline-none" value={booking.destCity} onChange={(e) => updateBooking(booking.id, 'destCity', e.target.value)} />
                                </>
                            ) : (
                                <>
                                  <div className="text-3xl font-black text-gray-800">{booking.destCode}</div>
                                  <div className="text-xs text-gray-500">{booking.destCity}</div>
                                </>
                            )}
                        </div>
                   </div>
                   
                   <div className="border-t-2 border-dashed border-gray-200 my-4 relative">
                        <div className="absolute -left-6 -top-3 w-6 h-6 bg-[#E0F2FE] rounded-full"></div>
                        <div className="absolute -right-6 -top-3 w-6 h-6 bg-[#E0F2FE] rounded-full"></div>
                   </div>

                   <div className="flex justify-between text-sm">
                        <div>
                            <div className="text-gray-400 text-xs">DATE / TIME</div>
                            {isEditing ? (
                                <input className="font-bold text-gray-700 w-full border-b focus:outline-none" value={booking.date} onChange={(e) => updateBooking(booking.id, 'date', e.target.value)} />
                            ) : (
                                <div className="font-bold text-gray-700">{booking.date}</div>
                            )}
                        </div>
                        <div>
                            <div className="text-gray-400 text-xs">SEAT</div>
                            {isEditing ? (
                                <input className="font-bold text-duck-red w-10 border-b focus:outline-none" value={booking.seat} onChange={(e) => updateBooking(booking.id, 'seat', e.target.value)} />
                            ) : (
                                <div className="font-bold text-duck-red text-xl">{booking.seat}</div>
                            )}
                        </div>
                   </div>
                 </div>
               </div>
            ) : (
              // Hotel, Car, Ticket (No more Lock Logic)
              <Card className="relative overflow-hidden">
                 <div className="flex justify-between items-start mb-4">
                   <div className="flex items-center w-full">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${booking.type === 'hotel' ? 'bg-purple-100 text-purple-600' : 'bg-orange-100 text-orange-600'}`}>
                        <i className={`fa-solid ${booking.type === 'hotel' ? 'fa-hotel' : 'fa-car'}`}></i>
                      </div>
                      <div className="w-full mr-8">
                        {isEditing ? (
                             <input className="font-bold text-lg border-b border-gray-300 w-full mb-1 focus:outline-none" value={booking.title} onChange={(e) => updateBooking(booking.id, 'title', e.target.value)} />
                        ) : (
                             <h3 className="font-bold text-lg">{booking.title}</h3>
                        )}
                        <p className="text-gray-500 text-sm">{booking.date}</p>
                      </div>
                   </div>
                 </div>

                 <div className="space-y-3 pt-2">
                     {/* Hotel Specifics */}
                     {booking.type === 'hotel' && (
                         <>
                            <div className="flex gap-4 text-sm bg-gray-50 p-2 rounded-lg">
                                <div><span className="text-gray-400 text-xs block">CHECK-IN</span><span className="font-bold">{booking.checkIn || '--:--'}</span></div>
                                <div><span className="text-gray-400 text-xs block">CHECK-OUT</span><span className="font-bold">{booking.checkOut || '--:--'}</span></div>
                            </div>
                            <div className="text-sm">
                                <span className="text-gray-400 text-xs block">ADDRESS</span>
                                {isEditing ? (
                                    <input className="w-full border-b focus:outline-none" value={booking.address} onChange={(e) => updateBooking(booking.id, 'address', e.target.value)} />
                                ) : (
                                    <div className="font-medium text-gray-700">{booking.address}</div>
                                )}
                            </div>
                            {booking.cost && (
                                <div className="bg-yellow-50 p-3 rounded-xl border border-yellow-200">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs font-bold text-yellow-700">TOTAL COST</span>
                                        <span className="font-black text-duck-dark">{booking.currency} {booking.cost.toLocaleString()}</span>
                                    </div>
                                    <div className="border-t border-yellow-200 my-1"></div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-yellow-600">Per Person ({booking.splitBy})</span>
                                        <span className="font-bold text-gray-800">{booking.currency} {Math.round(booking.cost / (booking.splitBy || 1)).toLocaleString()}</span>
                                    </div>
                                </div>
                            )}
                         </>
                     )}

                     {/* Car Specifics */}
                     {booking.type === 'car' && (
                         <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                                <i className="fa-solid fa-location-arrow text-green-500"></i>
                                {isEditing ? <input className="border-b w-full focus:outline-none" value={booking.pickupLocation} onChange={(e) => updateBooking(booking.id, 'pickupLocation', e.target.value)} placeholder="Pick up" /> : <span>{booking.pickupLocation}</span>}
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <i className="fa-solid fa-flag-checkered text-red-500"></i>
                                {isEditing ? <input className="border-b w-full focus:outline-none" value={booking.dropoffLocation} onChange={(e) => updateBooking(booking.id, 'dropoffLocation', e.target.value)} placeholder="Drop off" /> : <span>{booking.dropoffLocation}</span>}
                            </div>
                         </div>
                     )}

                     {/* Voucher Upload */}
                     <div className="mt-4 pt-2 border-t border-gray-100">
                         <h4 className="text-xs font-bold text-gray-400 mb-2">VOUCHERS / TICKETS</h4>
                         <div className="flex gap-2">
                            <div className="w-16 h-16 bg-gray-100 rounded-lg flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-300 cursor-pointer hover:border-duck-blue hover:text-duck-blue">
                                <i className="fa-solid fa-cloud-arrow-up"></i>
                                <span className="text-[8px] font-bold mt-1">UPLOAD</span>
                            </div>
                            {booking.id === 'b1' && (
                                <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200 relative">
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                                        <i className="fa-solid fa-file-pdf text-red-500 text-xl"></i>
                                    </div>
                                </div>
                            )}
                         </div>
                     </div>
                   </div>
              </Card>
            )}
          </div>
        );
      })}
    </div>
  );
};