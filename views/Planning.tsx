import React, { useState } from 'react';
import { Card } from '../components/Card';
import { TodoItem } from '../types';

export const Planning: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'packing' | 'shopping'>('packing');
  const [newItemText, setNewItemText] = useState('');
  
  const [todos, setTodos] = useState<TodoItem[]>([
    { id: '1', text: 'Buy SIM Card', completed: true, type: 'packing' },
    { id: '2', text: 'Pack Power Bank', completed: false, type: 'packing' },
    { id: '3', text: 'Print Hotel Vouchers', completed: false, type: 'packing' },
    { id: '4', text: 'Tokyo Banana', completed: false, type: 'shopping' },
    { id: '5', text: 'Matcha KitKat', completed: false, type: 'shopping' },
  ]);

  const toggleTodo = (id: string) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const addItem = () => {
      if(!newItemText.trim()) return;
      const newItem: TodoItem = {
          id: Date.now().toString(),
          text: newItemText,
          completed: false,
          type: activeTab
      };
      setTodos([...todos, newItem]);
      setNewItemText('');
  };

  const deleteItem = (id: string, e: React.MouseEvent) => {
      e.stopPropagation();
      setTodos(todos.filter(t => t.id !== id));
  };

  const filteredTodos = todos.filter(t => t.type === activeTab);

  return (
    <div className="pb-20 pt-4 px-4 max-w-md mx-auto h-full overflow-y-auto">
       <h1 className="text-2xl font-black text-duck-dark ml-2 mb-4">Planning</h1>

       {/* Sub-tabs */}
       <div className="flex bg-white p-1 rounded-2xl mb-6 shadow-sm">
           <button 
             onClick={() => setActiveTab('packing')}
             className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'packing' ? 'bg-duck-yellow text-duck-dark shadow-sm' : 'text-gray-400'}`}
           >
             <i className="fa-solid fa-suitcase mr-2"></i> Packing
           </button>
           <button 
             onClick={() => setActiveTab('shopping')}
             className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'shopping' ? 'bg-duck-yellow text-duck-dark shadow-sm' : 'text-gray-400'}`}
           >
             <i className="fa-solid fa-bag-shopping mr-2"></i> Buy List
           </button>
       </div>

       <Card className="mb-6 min-h-[50vh] flex flex-col">
         <div className="flex gap-2 mb-4">
             <input 
                value={newItemText}
                onChange={(e) => setNewItemText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addItem()}
                placeholder={activeTab === 'packing' ? "Add item to pack..." : "Add item to buy..."}
                className="flex-1 bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-2 focus:outline-none focus:border-duck-blue"
             />
             <button onClick={addItem} className="bg-duck-dark text-white w-10 rounded-xl flex items-center justify-center">
                 <i className="fa-solid fa-plus"></i>
             </button>
         </div>

         <div className="space-y-2 flex-1">
           {filteredTodos.length === 0 && (
               <div className="text-center text-gray-300 py-10 font-bold">
                   No items yet
               </div>
           )}
           {filteredTodos.map((todo) => (
             <div 
               key={todo.id} 
               onClick={() => toggleTodo(todo.id)}
               className="group flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors border border-transparent hover:border-gray-100"
             >
               <div className={`
                 w-6 h-6 rounded-md border-2 mr-3 flex items-center justify-center transition-all
                 ${todo.completed ? 'bg-duck-blue border-duck-blue text-white' : 'border-gray-300 bg-white'}
               `}>
                 {todo.completed && <i className="fa-solid fa-check text-xs"></i>}
               </div>
               <span className={`flex-1 font-medium ${todo.completed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                 {todo.text}
               </span>
               <button 
                 onClick={(e) => deleteItem(todo.id, e)}
                 className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-500 px-2 transition-all"
               >
                   <i className="fa-solid fa-trash"></i>
               </button>
             </div>
           ))}
         </div>
       </Card>
    </div>
  );
};