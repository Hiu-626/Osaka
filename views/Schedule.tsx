import React, { useState, useEffect } from 'react';
import { Card } from '../components/Card';
import { ScheduleItem, CategoryType } from '../types';
import { useFirestore } from '../hooks/useFirestore';
import { useSettings } from '../hooks/useSettings';
import { DuckHat, DuckButt, DuckFoot, StitchEar } from '../components/DuckDecorations';

export const Schedule: React.FC = () => {
  const { data: items, add, update, remove } = useFirestore<ScheduleItem>('schedule');
  const { settings, updateSettings } = useSettings();
  
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ScheduleItem | null>(null);

  const isStitch = settings.theme === 'stitch';
  const tripStartDate = new Date(settings.tripStartDate);
  
  const countdown = Math.max(0, Math.ceil((tripStartDate.getTime() - new Date().setHours(0,0,0,0)) / (1000*60*60*24)));

  const days = Array.from({ length: settings.tripDuration || 1 }, (_, i) => {
    const d = new Date(tripStartDate);
    d.setDate(tripStartDate.getDate() + i);
    return { index: i, day: i + 1, date: `${d.getMonth() + 1}/${d.getDate()}` };
  });

  const handleMove = async (item: ScheduleItem, direction: 'up' | 'down') => {
    const list = items.filter(i => i.dayIndex === selectedDayIndex).sort((a,b) => a.order - b.order);
    const idx = list.findIndex(i => i.id === item.id);
    if (direction === 'up' && idx > 0) {
      const prev = list[idx-1];
      await update(item.id, { order: prev.order });
      await update(prev.id, { order: item.order });
    } else if (direction === 'down' && idx < list.length - 1) {
      const next = list[idx+1];
      await update(item.id, { order: next.order });
      await update(next.id, { order: item.order });
    }
  };

  const filteredItems = items
    .filter(i => i.dayIndex === selectedDayIndex)
    .sort((a,b) => a.order - b.order);

  return (
    <div className={`flex-1 overflow-y-auto pt-[env(safe-area-inset-top)] no-scrollbar ${isStitch ? 'stitch-bg' : 'notebook-bg'}`}>
      <div className="pt-8 px-6 pb-20 max-w-md mx-auto">
        
        {/* Enriched Countdown */}
        <div className="text-center mb-8 animate-bounce">
          <div className="inline-block relative">
            {isStitch ? <StitchEar className="absolute -top-6 -left-6 w-12 h-12 -rotate-12" /> : <DuckHat className="absolute -top-6 -left-6 w-12 h-12 -rotate-12" />}
            <h1 className={`text-7xl font-black ${isStitch ? 'text-stitch-dark' : 'text-duck-dark'}`}>{countdown}</h1>
            <p className={`text-sm font-bold uppercase tracking-widest ${isStitch ? 'text-stitch-pink' : 'text-duck-blue'}`}>Days to Adventure</p>
          </div>
        </div>

        {/* Date Selector */}
        <div className="flex overflow-x-auto no-scrollbar gap-3 mb-8 py-2">
          {days.map((d) => (
            <button
              key={d.index}
              onClick={() => setSelectedDayIndex(d.index)}
              className={`flex-shrink-0 w-16 h-20 rounded-2xl border-2 transition-all flex flex-col items-center justify-center
                ${selectedDayIndex === d.index 
                  ? (isStitch ? 'bg-stitch-blue border-stitch-dark text-white scale-110' : 'bg-duck-yellow border-duck-dark scale-110') 
                  : 'bg-white/50 border-gray-200 text-gray-400'}`}
            >
              <span className="text-[10px] font-bold">Day</span>
              <span className="text-2xl font-black">{d.day}</span>
              <span className="text-[10px] opacity-70">{d.date}</span>
            </button>
          ))}
          <button onClick={() => setIsModalOpen(true)} className="flex-shrink-0 w-16 h-20 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400">
            <i className="fa-solid fa-cog"></i>
          </button>
        </div>

        {/* Timeline */}
        <div className="space-y-4 relative border-l-4 border-dashed border-gray-300 ml-4 pl-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="relative group">
              <div className={`absolute -left-[34px] top-6 w-4 h-4 rounded-full border-2 border-white shadow-sm ${isStitch ? 'bg-stitch-pink' : 'bg-duck-yellow'}`}></div>
              <Card className="flex items-center gap-4 relative overflow-visible">
                <div className="flex-1" onClick={() => setEditingItem(item)}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-lg font-black text-gray-500">{item.time}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-gray-200">{item.type}</span>
                  </div>
                  <h3 className="font-bold text-gray-800">{item.title}</h3>
                  {item.location && <p className="text-xs text-gray-400"><i className="fa-solid fa-location-dot mr-1"></i>{item.location}</p>}
                </div>
                {/* Sorting Controls */}
                <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleMove(item, 'up')} className="text-gray-300 hover:text-blue-500"><i className="fa-solid fa-chevron-up"></i></button>
                  <button onClick={() => handleMove(item, 'down')} className="text-gray-300 hover:text-blue-500"><i className="fa-solid fa-chevron-down"></i></button>
                </div>
              </Card>
            </div>
          ))}
          
          <button 
            onClick={() => setEditingItem({ id: 'temp', dayIndex: selectedDayIndex, time: '12:00', title: 'New Stop', type: 'sightseeing', order: items.length })}
            className="w-full py-4 border-2 border-dashed border-gray-300 rounded-3xl text-gray-400 font-bold hover:bg-white/50 transition-all"
          >
            <i className="fa-solid fa-plus mr-2"></i> Add Plan
          </button>
        </div>
      </div>

      {/* Floating Duck Butt for New Item */}
      <button onClick={() => setEditingItem({ id: 'temp', dayIndex: selectedDayIndex, time: '12:00', title: 'New Stop', type: 'sightseeing', order: items.length })} className="fixed bottom-24 right-6 w-16 h-16 active:scale-90 transition-transform">
        <DuckButt className="w-full h-full drop-shadow-xl" />
      </button>

      {/* Settings Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center p-6">
          <Card className="w-full max-w-sm p-8">
            <h2 className="text-2xl font-black mb-6">Trip Config</h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-400 block mb-1">Theme</label>
                <div className="flex gap-4">
                  <button onClick={() => updateSettings({ theme: 'donald' })} className={`flex-1 py-3 rounded-xl border-2 ${!isStitch ? 'bg-duck-blue text-white border-duck-dark' : 'bg-gray-50'}`}>Donald</button>
                  <button onClick={() => updateSettings({ theme: 'stitch' })} className={`flex-1 py-3 rounded-xl border-2 ${isStitch ? 'bg-stitch-blue text-white border-stitch-dark' : 'bg-gray-50'}`}>Stitch</button>
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 block mb-1">Start Date</label>
                <input type="date" value={settings.tripStartDate.split('T')[0]} onChange={e => updateSettings({ tripStartDate: new Date(e.target.value).toISOString() })} className="w-full p-3 bg-gray-50 rounded-xl font-bold" />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 block mb-1">Duration (Days)</label>
                <input type="number" value={settings.tripDuration} onChange={e => updateSettings({ tripDuration: parseInt(e.target.value) })} className="w-full p-3 bg-gray-50 rounded-xl font-bold" />
              </div>
              <button onClick={() => setIsModalOpen(false)} className="w-full py-4 bg-duck-dark text-white rounded-2xl font-black mt-4">Done!</button>
            </div>
          </Card>
        </div>
      )}

      {/* Edit Item Modal (Simplified) */}
      {editingItem && (
        <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-6 backdrop-blur-md">
          <Card className="w-full max-w-sm">
            <div className="flex justify-between mb-4">
              <h3 className="text-xl font-black">Plan Spot</h3>
              <button onClick={() => setEditingItem(null)}><i className="fa-solid fa-times"></i></button>
            </div>
            <div className="space-y-3">
              <input placeholder="Title" value={editingItem.title} onChange={e => setEditingItem({...editingItem, title: e.target.value})} className="w-full p-3 border-2 border-gray-100 rounded-xl" />
              <input type="time" value={editingItem.time} onChange={e => setEditingItem({...editingItem, time: e.target.value})} className="w-full p-3 border-2 border-gray-100 rounded-xl" />
              <input placeholder="Location" value={editingItem.location} onChange={e => setEditingItem({...editingItem, location: e.target.value})} className="w-full p-3 border-2 border-gray-100 rounded-xl" />
              <div className="flex gap-2">
                {editingItem.id !== 'temp' && <button onClick={() => { remove(editingItem.id); setEditingItem(null); }} className="px-4 bg-red-50 text-red-500 rounded-xl"><i className="fa-solid fa-trash"></i></button>}
                <button onClick={() => { 
                  if(editingItem.id === 'temp') add(editingItem); else update(editingItem.id, editingItem);
                  setEditingItem(null);
                }} className="flex-1 py-4 bg-duck-dark text-white rounded-xl font-bold">Save Plan</button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};