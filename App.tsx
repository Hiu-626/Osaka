import React, { useState } from 'react';
import { BottomNav } from './components/BottomNav';
import { Schedule } from './views/Schedule';
import { Bookings } from './views/Bookings';
import { Expense } from './views/Expense';
import { Journal } from './views/Journal';
import { Planning } from './views/Planning';
import { Members } from './views/Members';
import { Tab } from './types';

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<Tab>(Tab.Schedule);

  const renderContent = () => {
    switch (currentTab) {
      case Tab.Schedule: return <Schedule />;
      case Tab.Bookings: return <Bookings />;
      case Tab.Expense: return <Expense />;
      case Tab.Journal: return <Journal />;
      case Tab.Planning: return <Planning />;
      case Tab.Members: return <Members />;
      default: return <Schedule />;
    }
  };

  return (
    <div className="min-h-screen font-sans text-gray-800 antialiased flex justify-center bg-gray-100">
      {/* Mobile Frame Constraint for Desktop Viewing */}
      <div className="w-full max-w-md bg-[#E0F2FE] relative shadow-2xl min-h-screen overflow-hidden">
        
        {/* Background Pattern Overlay (Donald style polka or simple texture) */}
        <div className="absolute inset-0 pointer-events-none opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiMxZTNhOGEiLz48L3N2Zz4=')]"></div>

        {/* Content Area */}
        <div className="h-screen overflow-hidden relative z-10">
          {renderContent()}
        </div>

        {/* Navigation */}
        <BottomNav currentTab={currentTab} onTabChange={setCurrentTab} />
        
      </div>
    </div>
  );
};

export default App;