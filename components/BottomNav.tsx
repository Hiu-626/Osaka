import React from 'react';
import { Tab } from '../types';

interface BottomNavProps {
  currentTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onTabChange }) => {
  const tabs = [
    { id: Tab.Schedule, icon: 'fa-calendar-alt' },
    { id: Tab.Bookings, icon: 'fa-ticket-alt' },
    { id: Tab.Expense, icon: 'fa-wallet' },
    { id: Tab.Journal, icon: 'fa-camera' },
    { id: Tab.Planning, icon: 'fa-list-check' },
    { id: Tab.Members, icon: 'fa-users' },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-xl border-t-4 border-gray-100 z-[90] pb-[env(safe-area-inset-bottom)]">
      <div className="flex justify-around items-center h-16 px-4">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center flex-1 transition-all
                ${isActive ? 'text-duck-blue scale-125 -translate-y-2' : 'text-gray-300'}`}
            >
              <i className={`fa-solid ${tab.icon} text-xl`}></i>
              {isActive && <div className="w-1.5 h-1.5 bg-duck-yellow rounded-full mt-1"></div>}
            </button>
          );
        })}
      </div>
    </div>
  );
};