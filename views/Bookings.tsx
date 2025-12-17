import React, { useState } from 'react';
import { Card } from '../components/Card';
import { BookingItem } from '../types';
import { useFirestore } from '../hooks/useFirestore';

export const Bookings: React.FC = () => {
  const { data: bookings, add, update } = useFirestore<BookingItem>('bookings');
  const [editingId, setEditingId] = useState<string | null>(null);

  const updateBooking = (id: string, field: keyof BookingItem, value: any) => {
    update(id, { [field]: value });
  };

  const handleAddNew = async () => {
      await add({
        type: 'flight', 
        title: 'New Flight', 
        date: 'TBD', 
        details: 'Edit details',
        originCode: '???',
        destCode: '???',
        originCity: 'Origin',
        destCity: 'Dest',
        seat: '--'
      });
  };

  return (
    <div className="pb-20 pt-4 px-4 max-w-md mx-auto h-full overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-black text-duck-dark ml-2">My Bookings</h1>
        <button 
            onClick={handleAddNew}
            className="bg-duck-yellow w-10 h-10 rounded-full flex items-center justify-center border-2 border-duck-dark shadow-md"
        >
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
                         </>
                     )}

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
                   </div>
              </Card>
            )}
          </div>
        );
      })}
    </div>
  );
};