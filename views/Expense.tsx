import React, { useState } from 'react';
import { Card } from '../components/Card';
import { ExpenseItem, CategoryType } from '../types';
import { useFirestore } from '../hooks/useFirestore';
import { useSettings } from '../hooks/useSettings';

export const Expense: React.FC = () => {
  const { data: expenses, add, remove } = useFirestore<ExpenseItem>('expenses');
  const { settings } = useSettings();
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<CategoryType>('food');

  const total = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  const handleAdd = () => {
    if (!amount) return;
    add({
      amount: parseFloat(amount),
      currency: 'JPY',
      category,
      payer: settings.activeUserId,
      date: new Date().toISOString().split('T')[0]
    });
    setAmount('');
  };

  return (
    <div className={`flex-1 overflow-y-auto pt-[env(safe-area-inset-top)] px-6 pb-24 ${settings.theme === 'stitch' ? 'stitch-bg' : 'notebook-bg'}`}>
      <div className="max-w-md mx-auto pt-8">
        <div className="text-center mb-10">
           <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Total Spent</p>
           <h2 className="text-5xl font-black text-duck-dark">¥{total.toLocaleString()}</h2>
        </div>

        <Card className="mb-8 p-6 bg-white shadow-2xl border-b-8 border-gray-100">
           <div className="flex items-end gap-3 mb-4">
              <div className="flex-1">
                <label className="text-[10px] font-bold text-gray-300">Amount (JPY)</label>
                <input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="w-full text-3xl font-black bg-transparent border-b-4 border-duck-yellow focus:outline-none" placeholder="0" />
              </div>
              <button onClick={handleAdd} className="w-14 h-14 bg-duck-dark text-white rounded-2xl flex items-center justify-center text-2xl active:scale-90 transition-all">
                <i className="fa-solid fa-check"></i>
              </button>
           </div>
           <div className="flex gap-2 overflow-x-auto no-scrollbar py-2">
              {['food', 'transport', 'sightseeing', 'stay'].map(cat => (
                <button key={cat} onClick={() => setCategory(cat as any)} className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-bold border-2 transition-all ${category === cat ? 'bg-duck-yellow border-duck-dark' : 'bg-gray-50 border-transparent'}`}>
                  {cat.toUpperCase()}
                </button>
              ))}
           </div>
        </Card>

        <div className="space-y-3">
          {expenses.sort((a,b) => b.date.localeCompare(a.date)).map(exp => (
            <div key={exp.id} className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border-2 border-white flex justify-between items-center group">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-lg">
                    <i className={`fa-solid ${exp.category === 'food' ? 'fa-utensils' : 'fa-train'}`}></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-700 capitalize">{exp.category}</h4>
                    <p className="text-[10px] text-gray-400">{exp.date}</p>
                  </div>
               </div>
               <div className="flex items-center gap-4">
                 <p className="font-black text-lg">¥{exp.amount}</p>
                 <button onClick={() => remove(exp.id)} className="w-8 h-8 rounded-full bg-red-50 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"><i className="fa-solid fa-times"></i></button>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};