import React, { useState } from 'react';
import { Card } from '../components/Card';
import { ExpenseItem, CategoryType } from '../types';
import { useFirestore } from '../hooks/useFirestore';

export const Expense: React.FC = () => {
  const { data: expenses, add, update } = useFirestore<ExpenseItem>('expenses');

  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState<'JPY' | 'HKD' | 'AUD'>('JPY');
  const [category, setCategory] = useState<CategoryType>('food');
  const [payer, setPayer] = useState('Me');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showSettlement, setShowSettlement] = useState(false);

  // Hardcoded members for now (could also come from DB)
  const members = ['Me', 'Daisy', 'Scrooge', 'Huey'];

  // Mock Exchange Rates to JPY
  const RATES = {
    JPY: 1,
    HKD: 19, // 1 HKD = 19 JPY approx
    AUD: 95  // 1 AUD = 95 JPY approx
  };

  const addOrUpdateExpense = async () => {
    if (!amount) return;
    
    if (editingId) {
        await update(editingId, {
            amount: parseFloat(amount),
            currency,
            category,
            payer
        });
        setEditingId(null);
    } else {
        await add({
            amount: parseFloat(amount),
            currency: currency,
            category: category,
            payer: payer,
            date: new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' })
        });
    }
    setAmount('');
  };

  const startEdit = (item: ExpenseItem) => {
      setAmount(item.amount.toString());
      setCurrency(item.currency as 'JPY' | 'HKD' | 'AUD');
      setCategory(item.category);
      setPayer(item.payer);
      setEditingId(item.id);
      setShowSettlement(false);
  };

  const cancelEdit = () => {
      setAmount('');
      setEditingId(null);
  };

  // Calculations for Settlement
  const totalJPY = expenses.reduce((acc, curr) => acc + (curr.amount * RATES[curr.currency]), 0);
  const averagePerPerson = totalJPY / members.length;

  const getSettlementData = () => {
      return members.map(m => {
          const paidTotal = expenses
            .filter(e => e.payer === m)
            .reduce((acc, curr) => acc + (curr.amount * RATES[curr.currency]), 0);
          
          const balance = paidTotal - averagePerPerson;
          return { name: m, paid: paidTotal, balance };
      });
  };

  const getCategoryIcon = (cat: CategoryType) => {
      switch(cat) {
          case 'food': return 'fa-utensils text-orange-500';
          case 'transport': return 'fa-train-subway text-blue-500';
          case 'stay': return 'fa-bed text-purple-500';
          case 'sightseeing': return 'fa-camera text-duck-dark';
          default: return 'fa-wallet text-gray-500';
      }
  };

  const getCategoryColor = (cat: CategoryType) => {
    switch(cat) {
        case 'food': return 'bg-orange-100 text-orange-700';
        case 'transport': return 'bg-blue-100 text-blue-700';
        case 'stay': return 'bg-purple-100 text-purple-700';
        case 'sightseeing': return 'bg-duck-yellow text-duck-dark';
        default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (showSettlement) {
      const data = getSettlementData();
      return (
          <div className="pb-20 pt-4 px-4 max-w-md mx-auto h-full overflow-y-auto">
             <button onClick={() => setShowSettlement(false)} className="mb-4 text-duck-dark font-bold flex items-center"><i className="fa-solid fa-arrow-left mr-2"></i> Back to Expenses</button>
             <h1 className="text-2xl font-black text-duck-dark mb-6">Settlement</h1>
             
             <Card className="text-center py-6 mb-6">
                 <p className="text-gray-400 text-xs font-bold uppercase">Total Trip Cost</p>
                 <p className="text-3xl font-black text-duck-dark">¥ {Math.round(totalJPY).toLocaleString()}</p>
                 <p className="text-gray-500 text-sm mt-2">Per Person: ¥ {Math.round(averagePerPerson).toLocaleString()}</p>
             </Card>

             <div className="space-y-4">
                 {data.map((d, idx) => (
                     <Card key={idx} className="flex justify-between items-center p-4">
                         <div>
                             <p className="font-bold text-lg">{d.name}</p>
                             <p className="text-xs text-gray-400">Paid: ¥ {Math.round(d.paid).toLocaleString()}</p>
                         </div>
                         <div className={`text-right font-black text-lg ${d.balance >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                             {d.balance >= 0 ? '+' : ''} ¥ {Math.round(d.balance).toLocaleString()}
                             <p className="text-[10px] text-gray-400 font-normal uppercase">
                                 {d.balance >= 0 ? 'Gets Back' : 'Owes'}
                             </p>
                         </div>
                     </Card>
                 ))}
             </div>
          </div>
      );
  }

  return (
    <div className="pb-20 pt-4 px-4 max-w-md mx-auto h-full overflow-y-auto">
      {/* Dashboard */}
      <div className="flex gap-3 mb-6">
        <Card color="yellow" className="flex-1 text-center py-6">
          <p className="text-xs font-bold text-duck-dark opacity-70 mb-1">TOTAL (JPY)</p>
          <p className="text-2xl font-black text-duck-dark">¥ {Math.round(totalJPY).toLocaleString()}</p>
        </Card>
        <button 
            onClick={() => setShowSettlement(true)}
            className="flex-1 bg-duck-dark text-white rounded-2xl shadow-lg flex flex-col items-center justify-center mb-4 active:scale-95 transition-transform"
        >
            <i className="fa-solid fa-scale-balanced text-2xl mb-1"></i>
            <span className="font-bold text-xs">Settlement</span>
        </button>
      </div>

      {/* Input / Edit Area */}
      <Card className="mb-6 p-4 border-duck-blue/30">
        <div className="flex justify-between items-center mb-3">
             <h3 className="font-bold text-duck-dark">
                {editingId ? <><i className="fa-solid fa-pen mr-2"></i>Edit Expense</> : <><i className="fa-solid fa-plus-circle mr-2"></i>Add New</>}
             </h3>
             {editingId && <button onClick={cancelEdit} className="text-xs text-red-500 font-bold">CANCEL</button>}
        </div>
        
        <div className="flex items-end gap-2 mb-4">
          <div className="flex-1">
            <label className="text-[10px] font-bold text-gray-400">AMOUNT</label>
            <input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border-b-2 border-gray-200 text-3xl font-black py-1 focus:outline-none focus:border-duck-yellow bg-transparent"
              placeholder="0"
            />
          </div>
          <div className="w-32">
             <label className="text-[10px] font-bold text-gray-400">CURRENCY</label>
             <div className="flex bg-gray-100 rounded-lg p-1">
                 {['JPY', 'HKD', 'AUD'].map((c) => (
                     <button 
                        key={c}
                        onClick={() => setCurrency(c as any)} 
                        className={`flex-1 py-1 text-[10px] font-bold rounded ${currency === c ? 'bg-white shadow text-duck-dark' : 'text-gray-400'}`}
                     >
                        {c}
                     </button>
                 ))}
             </div>
          </div>
        </div>
        
        <div className="mb-4">
            <label className="text-[10px] font-bold text-gray-400">PAID BY</label>
            <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
                {members.map(m => (
                    <button 
                        key={m}
                        onClick={() => setPayer(m)}
                        className={`px-3 py-1 rounded-full text-xs font-bold border whitespace-nowrap transition-all ${payer === m ? 'bg-duck-dark text-white border-duck-dark' : 'bg-white text-gray-500 border-gray-200'}`}
                    >
                        {m}
                    </button>
                ))}
            </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
            {(['food', 'transport', 'sightseeing', 'stay', 'misc'] as CategoryType[]).map(cat => (
                <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`
                        px-3 py-2 rounded-xl border-2 flex items-center gap-2 transition-all flex-shrink-0
                        ${category === cat ? 'bg-duck-yellow border-duck-dark text-duck-dark' : 'bg-white border-gray-100 text-gray-400'}
                    `}
                >
                    <i className={`fa-solid ${getCategoryIcon(cat).split(' ')[0]} text-sm`}></i>
                </button>
            ))}
        </div>

        <button 
          onClick={addOrUpdateExpense}
          className="w-full bg-duck-dark text-white font-bold py-3 rounded-xl shadow-lg active:scale-95 transition-all"
        >
          {editingId ? 'Update Expense' : 'Add Expense'}
        </button>
      </Card>

      {/* List */}
      <h3 className="font-bold text-gray-500 ml-2 mb-2 text-sm uppercase">History</h3>
      <div className="space-y-3">
        {expenses.map((exp) => (
          <div key={exp.id} onClick={() => startEdit(exp)} className="bg-white rounded-xl p-3 flex justify-between items-center shadow-sm active:scale-[0.98] transition-transform cursor-pointer border border-transparent hover:border-duck-blue">
             <div className="flex items-center gap-3">
               <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-gray-50`}>
                 <i className={`fa-solid ${getCategoryIcon(exp.category)}`}></i>
               </div>
               <div>
                 <div className="flex items-center gap-2">
                    <p className="font-bold text-gray-800 capitalize">{exp.category}</p>
                    <span className={`text-[10px] font-bold px-2 rounded ${getCategoryColor(exp.category)}`}>{exp.category}</span>
                 </div>
                 <p className="text-xs text-gray-400">Paid by <strong className="text-gray-600">{exp.payer}</strong></p>
               </div>
             </div>
             <div className="text-right">
               <p className="font-black text-lg text-duck-dark">
                   <span className="text-xs font-medium mr-1 text-gray-400">{exp.currency}</span>
                   {exp.amount.toLocaleString()}
               </p>
               <p className="text-xs text-gray-400">{exp.date}</p>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};