import React from 'react';
import { Tab } from '../types';

interface MyNavBarProps {
  currentTab: Tab;
  onTabChange: (tab: Tab) => void;
}

// ⚠️ 改咗名做 MyNavBar，同檔案名一致
const MyNavBar: React.FC<MyNavBarProps> = ({ currentTab, onTabChange }) => {
  const tabs = [
    { id: Tab.Schedule, icon: 'fa-calendar-days', label: 'Schedule' },
    { id: Tab.Bookings, icon: 'fa-ticket', label: 'Bookings' },
    { id: Tab.Expense, icon: 'fa-wallet', label: 'Expense' },
    { id: Tab.Journal, icon: 'fa-pen-nib', label: 'Journal' },
    { id: Tab.Planning, icon: 'fa-clipboard-list', label: 'Plan' },
    { id: Tab.Members, icon: 'fa-users', label: 'Members' },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t-2 border-duck-dark z-50 pb-safe">
      <div className="flex justify-around items-center p-2 pb-4">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center w-full transition-all duration-200 ${
                isActive ? 'text-duck-blue -translate-y-2' : 'text-gray-400'
              }`}
            >
              <div 
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-lg mb-1
                  border-2 transition-all duration-200
                  ${isActive 
                    ? 'bg-duck-yellow border-duck-dark shadow-[2px_2px_0px_0px_#1e3a8a] text-duck-dark' 
                    : 'bg-transparent border-transparent text-gray-400'}
                `}
              >
                <i className={`fa-solid ${tab.icon}`}></i>
              </div>
              <span className={`text-[10px] font-bold ${isActive ? 'text-duck-dark' : ''}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// ⚠️ 這一行最重要！App.tsx 靠呢行黎 Import
export default MyNavBar;
