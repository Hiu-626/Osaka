import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Member } from '../types';
import { useFirestore } from '../hooks/useFirestore';
import { useSettings } from '../hooks/useSettings';

export const Members: React.FC = () => {
  const { data: members, add, update } = useFirestore<Member>('members');
  const { settings, updateSettings } = useSettings();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  
  const [name, setName] = useState('');
  const [role, setRole] = useState('');

  const openAddModal = () => {
      setEditingMember(null);
      setName('');
      setRole('');
      setIsModalOpen(true);
  };

  const openEditModal = (m: Member) => {
      setEditingMember(m);
      setName(m.name);
      setRole(m.role);
      setIsModalOpen(true);
  };

  const handleSave = async () => {
      if(!name) return;

      if(editingMember) {
          await update(editingMember.id, { name, role });
      } else {
          await add({
              name,
              role: role || 'Member',
              img: Math.floor(Math.random() * 70)
          });
      }
      setIsModalOpen(false);
  };

  const handleResetApp = () => {
      if(window.confirm("⚠️ Reset ALL data? \nThis will delete your changes and restore the demo content. This cannot be undone.")) {
          Object.keys(localStorage).forEach(key => {
              if(key.startsWith('ducktravel_v3_')) {
                  localStorage.removeItem(key);
              }
          });
          window.location.reload();
      }
  };

  return (
    <div className="pb-20 pt-4 px-4 max-w-md mx-auto h-full overflow-y-auto">
      <h1 className="text-2xl font-black text-duck-dark ml-2 mb-6">Travel Buddies</h1>
      
      <div className="grid grid-cols-2 gap-4 mb-8">
        {members.map((m) => {
          const isActive = settings.activeUserId === m.id;
          return (
            <Card 
              key={m.id} 
              className={`flex flex-col items-center py-6 relative group cursor-pointer transition-all ${isActive ? 'ring-4 ring-duck-blue ring-offset-2' : 'hover:border-duck-blue'}`}
            >
              <div 
                onClick={() => openEditModal(m)} 
                className="absolute top-2 right-2 p-2 opacity-0 group-hover:opacity-100 transition-opacity z-10"
              >
                  <i className="fa-solid fa-pen text-duck-blue text-xs"></i>
              </div>

              {/* Selection Area */}
              <div onClick={() => updateSettings({ activeUserId: m.id })} className="flex flex-col items-center w-full">
                <div className="relative mb-3">
                  <img 
                    src={`https://picsum.photos/100/100?random=${m.img}`} 
                    alt={m.name} 
                    className="w-20 h-20 rounded-full border-4 border-duck-yellow object-cover"
                  />
                  {isActive && (
                    <div className="absolute -bottom-1 -right-1 bg-duck-blue text-white text-[10px] font-bold px-2 py-1 rounded-full border-2 border-white shadow-sm">
                      ME
                    </div>
                  )}
                </div>
                <h3 className="font-bold text-gray-800">{m.name}</h3>
                <p className="text-xs text-gray-500 font-bold uppercase mt-1">{m.role}</p>
              </div>
            </Card>
          );
        })}
        
        <button 
          onClick={openAddModal}
          className="rounded-2xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center min-h-[160px] text-gray-400 hover:bg-white hover:border-duck-blue hover:text-duck-blue transition-all"
        >
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-2">
            <i className="fa-solid fa-plus text-xl"></i>
          </div>
          <span className="font-bold text-sm">Add / Invite</span>
        </button>
      </div>

      <div className="border-t-2 border-gray-100 pt-6 mt-4">
          <button 
            onClick={handleResetApp}
            className="w-full py-3 text-red-400 font-bold text-sm bg-red-50 rounded-xl hover:bg-red-100 transition-colors"
          >
            <i className="fa-solid fa-rotate-right mr-2"></i>
            Reset Demo Data
          </button>
          <p className="text-center text-[10px] text-gray-400 mt-2">
              DuckTravel App v3.0 • Ready
          </p>
      </div>

      {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
              <div className="bg-white rounded-3xl p-6 w-full max-w-xs shadow-2xl relative">
                  <h3 className="text-xl font-black text-duck-dark mb-4">
                      {editingMember ? 'Edit Member' : 'Add Buddy'}
                  </h3>
                  <div className="space-y-3">
                      <div>
                          <label className="text-xs font-bold text-gray-400">NAME</label>
                          <input 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 font-bold focus:border-duck-blue outline-none" 
                            placeholder="Donald"
                          />
                      </div>
                      <div>
                          <label className="text-xs font-bold text-gray-400">ROLE</label>
                          <input 
                             value={role}
                             onChange={(e) => setRole(e.target.value)}
                             className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 font-bold focus:border-duck-blue outline-none" 
                             placeholder="Navigator, Foodie..."
                          />
                      </div>
                      <div className="pt-2 flex gap-2">
                          <button 
                            onClick={() => setIsModalOpen(false)}
                            className="flex-1 py-3 text-gray-400 font-bold hover:text-gray-600"
                          >
                              Cancel
                          </button>
                          <button 
                            onClick={handleSave}
                            className="flex-1 bg-duck-dark text-white rounded-xl font-bold shadow-lg active:scale-95 transition-transform"
                          >
                              Save
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};