import React, { useState, useEffect } from 'react';
import { Card } from '../components/Card';
import { ScheduleItem, CategoryType } from '../types';
import { useFirestore } from '../hooks/useFirestore';

export const Schedule: React.FC = () => {
  // Real database connection
  const { data: items, add, update } = useFirestore<ScheduleItem>('schedule');
  
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [countdownDays, setCountdownDays] = useState(0);
  
  // Hardcoded Start Date: Feb 4, 2026
  const TRIP_START_DATE = new Date('2026-02-04T00:00:00');

  useEffect(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const target = new Date(TRIP_START_DATE);
    target.setHours(0, 0, 0, 0);

    const diffTime = target.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setCountdownDays(diffDays > 0 ? diffDays : 0);
  }, []);

  // Editing State
  const [editingItem, setEditingItem] = useState<ScheduleItem | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isNewItem, setIsNewItem] = useState(false);

  // Generate Dates: Feb 4 - Feb 13, 2026
  const days = Array.from({ length: 10 }, (_, i) => {
    const d = new Date(TRIP_START_DATE);
    d.setDate(TRIP_START_DATE.getDate() + i);
    return {
      index: i,
      day: i + 1,
      date: `${d.getMonth() + 1}/${d.getDate()}`,
      fullDate: d.toDateString(),
      // Mock weather based on index
      w: i % 3 === 0 ? 'rain' : (i % 2 === 0 ? 'cloud' : 'sun'), 
      temp: `${5 + (i % 4)}°C`,
      humidity: `${40 + (i * 5)}%`,
      location: i < 5 ? 'Tokyo Disney' : (i < 8 ? 'Hakone' : 'Tokyo City')
    };
  });

  const currentDayInfo = days[selectedDayIndex];

  const getTypeColor = (type: CategoryType) => {
    switch(type) {
      case 'transport': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'food': return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'stay': return 'bg-purple-100 text-purple-700 border-purple-300';
      case 'sightseeing': return 'bg-duck-yellow text-duck-dark border-yellow-500';
      default: return 'bg-gray-100';
    }
  };

  const getWeatherIcon = (w: string) => {
    if(w === 'sun') return 'fa-sun text-orange-500';
    if(w === 'rain') return 'fa-cloud-showers-heavy text-blue-500';
    return 'fa-cloud text-gray-400';
  };

  const handleSave = async () => {
    if (editingItem) {
      if (isNewItem) {
        // Remove temporary ID before sending to Firestore
        const { id, ...newItemData } = editingItem;
        await add(newItemData);
      } else {
        const { id, ...updateData } = editingItem;
        await update(id, updateData);
      }
      setEditingItem(null);
      setIsEditMode(false);
      setIsNewItem(false);
    }
  };

  const openDetail = (item: ScheduleItem) => {
    setEditingItem(item);
    setIsEditMode(false);
    setIsNewItem(false);
  };

  const handleAddNew = () => {
    const newItem: ScheduleItem = {
      id: 'temp_id',
      dayIndex: selectedDayIndex,
      time: '12:00',
      title: 'New Event',
      type: 'sightseeing',
      location: '',
      notes: ''
    };
    setEditingItem(newItem);
    setIsEditMode(true);
    setIsNewItem(true);
  };

  // Filter items for current day
  const displayedItems = items
    .filter(i => i.dayIndex === selectedDayIndex)
    .sort((a,b) => a.time.localeCompare(b.time));

  return (
    <div className="pb-20 pt-4 px-4 max-w-md mx-auto h-full overflow-y-auto no-scrollbar">
      {/* Header Countdown */}
      <Card color="blue" className="mb-4 flex items-center justify-between py-3">
        <div>
          <h2 className="text-xs font-bold text-blue-900 uppercase tracking-wider opacity-70">Japan Trip 2026</h2>
          <div className="text-3xl font-black text-blue-600 font-sans">{countdownDays} <span className="text-sm text-blue-800">DAYS LEFT</span></div>
        </div>
        <div className="text-right">
          <i className="fa-solid fa-plane-departure text-3xl text-blue-300/80"></i>
        </div>
      </Card>

      {/* Date Selector */}
      <div className="flex overflow-x-auto no-scrollbar space-x-2 mb-4 pb-2">
        {days.map((d) => (
          <button
            key={d.index}
            onClick={() => setSelectedDayIndex(d.index)}
            className={`
              flex-shrink-0 flex flex-col items-center justify-center w-14 h-20 rounded-xl border-2 transition-all
              ${selectedDayIndex === d.index 
                ? 'bg-duck-yellow border-duck-dark shadow-[3px_3px_0px_0px_#1e3a8a] -translate-y-1' 
                : 'bg-white border-gray-200 text-gray-400'}
            `}
          >
            <span className="text-[10px] font-bold mb-1">Feb</span>
            <span className="text-xl font-black leading-none">{d.date.split('/')[1]}</span>
            <span className="text-[10px] font-bold text-gray-400 mt-1">Day {d.day}</span>
          </button>
        ))}
      </div>

      {/* Weather Box */}
      <div className="bg-gradient-to-r from-blue-50 to-white rounded-2xl p-5 shadow-sm border border-blue-100 mb-6 relative overflow-hidden">
         <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl text-blue-500">
           <i className={`fa-solid ${getWeatherIcon(currentDayInfo.w).split(' ')[0]}`}></i>
         </div>
         <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-4">
                <div className="bg-white p-3 rounded-2xl shadow-sm">
                   <i className={`fa-solid ${getWeatherIcon(currentDayInfo.w)} text-3xl`}></i>
                </div>
                <div>
                    <div className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">{currentDayInfo.location}</div>
                    <div className="font-black text-duck-dark text-3xl">{currentDayInfo.temp}</div>
                </div>
            </div>
            <div className="text-right space-y-1">
                <div className="inline-flex items-center px-2 py-1 bg-blue-100 rounded-lg text-[10px] font-bold text-blue-600">
                   <i className="fa-solid fa-droplet mr-1"></i> {currentDayInfo.humidity}
                </div>
                <div className="text-xs text-gray-500 font-bold capitalize">
                    {currentDayInfo.w === 'sun' ? 'Sunny' : (currentDayInfo.w === 'rain' ? 'Rainy' : 'Cloudy')}
                </div>
            </div>
         </div>
      </div>

      {/* Timeline */}
      <div className="relative border-l-4 border-white ml-4 space-y-6 pb-20">
        {displayedItems.length === 0 && (
          <div className="text-gray-400 text-center py-10 font-bold italic ml-4">
            No plans for this day yet.<br/>Tap + to add one!
          </div>
        )}
        
        {displayedItems.map((item) => (
          <div key={item.id} className="relative pl-6">
            <div className="absolute -left-[10px] top-4 w-4 h-4 bg-duck-yellow rounded-full border-2 border-white shadow-sm z-10"></div>
            
            <Card onClick={() => openDetail(item)} className="flex flex-col relative overflow-hidden group hover:bg-gray-50 cursor-pointer">
               <div className={`absolute left-0 top-0 bottom-0 w-2 ${getTypeColor(item.type).split(' ')[0]}`}></div>
               <div className="pl-2">
                 <div className="flex justify-between items-start">
                    <span className="text-2xl font-black text-duck-dark">{item.time}</span>
                    <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full border ${getTypeColor(item.type)}`}>
                      {item.type}
                    </span>
                 </div>
                 <h3 className="text-lg font-bold text-gray-800 mt-1">{item.title}</h3>
                 {item.location && (
                   <div className="flex items-center text-gray-500 text-sm mt-2">
                     <i className="fa-solid fa-location-dot mr-2"></i>
                     {item.location}
                   </div>
                 )}
                 {item.notes && (
                   <div className="mt-2 text-xs text-gray-400 bg-gray-50 p-2 rounded truncate border border-gray-100">
                     <i className="fa-regular fa-note-sticky mr-1"></i> {item.notes}
                   </div>
                 )}
               </div>
            </Card>
          </div>
        ))}
      </div>

      <button 
        onClick={handleAddNew}
        className="fixed bottom-24 right-6 w-14 h-14 bg-duck-dark text-white rounded-full shadow-2xl flex items-center justify-center border-4 border-white active:scale-95 transition-transform z-40 hover:bg-blue-800"
      >
        <i className="fa-solid fa-plus text-2xl"></i>
      </button>

      {/* Detail / Edit Overlay */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/60 z-[60] flex items-end sm:items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl relative max-h-[85vh] overflow-y-auto">
             <button 
               onClick={() => { setEditingItem(null); setIsNewItem(false); }}
               className="absolute top-4 right-4 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200"
             >
               <i className="fa-solid fa-xmark"></i>
             </button>

             <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-black text-duck-dark">
                  {isEditMode || isNewItem ? 'Edit Event' : 'Event Details'}
                </h2>
                {!isNewItem && (
                  <button 
                    onClick={() => setIsEditMode(!isEditMode)} 
                    className="text-duck-blue font-bold text-sm"
                  >
                    {isEditMode ? 'Cancel' : 'Edit'}
                  </button>
                )}
             </div>

             {isEditMode ? (
               <div className="space-y-4">
                 <div>
                   <label className="block text-xs font-bold text-gray-400 mb-1">TITLE</label>
                   <input 
                     className="w-full border-2 border-gray-200 rounded-xl p-3 font-bold focus:border-duck-blue outline-none"
                     value={editingItem.title} 
                     onChange={(e) => setEditingItem({...editingItem, title: e.target.value})}
                   />
                 </div>
                 <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-xs font-bold text-gray-400 mb-1">TIME</label>
                      <input 
                        type="time"
                        className="w-full border-2 border-gray-200 rounded-xl p-3 font-bold focus:border-duck-blue outline-none"
                        value={editingItem.time} 
                        onChange={(e) => setEditingItem({...editingItem, time: e.target.value})}
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs font-bold text-gray-400 mb-1">TYPE</label>
                      <select 
                        className="w-full border-2 border-gray-200 rounded-xl p-3 font-bold bg-white focus:border-duck-blue outline-none"
                        value={editingItem.type} 
                        onChange={(e) => setEditingItem({...editingItem, type: e.target.value as CategoryType})}
                      >
                        <option value="sightseeing">Sightseeing</option>
                        <option value="food">Food</option>
                        <option value="transport">Transport</option>
                        <option value="stay">Stay</option>
                      </select>
                    </div>
                 </div>
                 <div>
                   <label className="block text-xs font-bold text-gray-400 mb-1">LOCATION</label>
                   <input 
                     className="w-full border-2 border-gray-200 rounded-xl p-3 font-bold focus:border-duck-blue outline-none"
                     value={editingItem.location || ''} 
                     onChange={(e) => setEditingItem({...editingItem, location: e.target.value})}
                   />
                 </div>
                 <div>
                   <label className="block text-xs font-bold text-gray-400 mb-1">NOTES</label>
                   <textarea 
                     className="w-full border-2 border-gray-200 rounded-xl p-3 font-medium h-24 focus:border-duck-blue outline-none"
                     value={editingItem.notes || ''} 
                     onChange={(e) => setEditingItem({...editingItem, notes: e.target.value})}
                   />
                 </div>
                 <button onClick={handleSave} className="w-full bg-duck-dark text-white font-bold py-4 rounded-xl shadow-lg active:scale-95 transition-all">
                   Save Changes
                 </button>
               </div>
             ) : (
               <div className="space-y-6">
                 <div>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase mb-2 ${getTypeColor(editingItem.type)}`}>
                      {editingItem.type}
                    </span>
                    <h3 className="text-3xl font-black text-gray-800 leading-tight">{editingItem.title}</h3>
                    <div className="flex items-center text-gray-500 font-bold mt-2">
                      <i className="fa-regular fa-clock mr-2"></i> {editingItem.time}
                    </div>
                 </div>

                 {editingItem.photoUrl && (
                   <img src={editingItem.photoUrl} alt="Event" className="w-full h-40 object-cover rounded-2xl border-2 border-gray-100" />
                 )}

                 {editingItem.location && (
                   <div className="bg-gray-50 p-4 rounded-2xl flex items-center justify-between">
                     <div className="flex items-center text-gray-700 font-bold">
                       <i className="fa-solid fa-location-dot mr-3 text-red-500"></i>
                       {editingItem.location}
                     </div>
                     <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(editingItem.location)}`} target="_blank" rel="noreferrer" className="bg-white w-10 h-10 rounded-full flex items-center justify-center border-2 border-gray-200 shadow-sm text-blue-500">
                       <i className="fa-solid fa-arrow-up-right-from-square"></i>
                     </a>
                   </div>
                 )}

                 {editingItem.notes && (
                   <div className="bg-duck-yellow/20 p-4 rounded-2xl border-2 border-duck-yellow/50">
                     <h4 className="text-xs font-bold text-duck-dark uppercase mb-2">Notes</h4>
                     <p className="text-gray-800 leading-relaxed text-sm whitespace-pre-wrap">{editingItem.notes}</p>
                   </div>
                 )}

                 <div className="flex gap-2">
                   <button className="flex-1 py-3 rounded-xl border-2 border-gray-200 font-bold text-gray-500 flex items-center justify-center hover:bg-gray-50">
                     <i className="fa-solid fa-camera mr-2"></i> Add Photo
                   </button>
                 </div>
               </div>
             )}
          </div>
        </div>
      )}
    </div>
  );
};