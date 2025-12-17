import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Member } from '../types';

export const Members: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([
    { id: 1, name: 'Me', role: 'Organizer', img: 1 },
    { id: 2, name: 'Daisy', role: 'Finance', img: 2 },
    { id: 3, name: 'Scrooge', role: 'Sponsor', img: 3 },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  
  // Form State
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

  const handleSave = () => {
      if(!name) return;

      if(editingMember) {
          // Edit
          setMembers(members.map(m => m.id === editingMember.id ? { ...m, name, role } : m));
      } else {
          // Add
          const newMember = {
              id: Date.now(),
              name,
              role: role || 'Member',
              img: Math.floor(Math.random() * 70)
          };
          setMembers([...members, newMember]);
      }
      setIsModalOpen(false);
  };

  return (
    <div className="pb-20 pt-4 px-4 max-w-md mx-auto h-full overflow-y-auto">
      <h1 className="text-2xl font-black text-duck-dark ml-2 mb-6">Travel Buddies</h1>
      
      <div className="grid grid-cols-2 gap-4">
        {members.map((m) => (
          <Card 
            key={m.id} 
            onClick={() => openEditModal(m)}
            className="flex flex-col items-center py-6 relative group hover:border-duck-blue cursor-pointer"
          >
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <i className="fa-solid fa-pen text-duck-blue text-xs"></i>
            </div>
            <div className="relative mb-3">
              <img 
                src={`https://picsum.photos/100/100?random=${m.img}`} 
                alt={m.name} 
                className="w-20 h-20 rounded-full border-4 border-duck-yellow object-cover"
              />
              {m.role === 'Organizer' && (
                <div className="absolute -bottom-1 -right-1 bg-duck-blue text-white text-[10px] font-bold px-2 py-1 rounded-full border-2 border-white">
                  LEADER
                </div>
              )}
            </div>
            <h3 className="font-bold text-gray-800">{m.name}</h3>
            <p className="text-xs text-gray-500 font-bold uppercase mt-1">{m.role}</p>
          </Card>
        ))}
        
        {/* Add Member Button */}
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

      {/* Modal */}
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