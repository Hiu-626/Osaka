import React, { useState } from "react";
// Removed Firebase Auth imports as we are using LocalStorage for the GitHub version
import { Tab } from "./types";
import MyNavBar from './components/MyNavBar'; // ✅ 確保 Import 名稱係 MyNavBar
import { Schedule } from "./views/Schedule";
import { Bookings } from "./views/Bookings";
import { Expense } from "./views/Expense";
import { Journal } from "./views/Journal";
import { Planning } from "./views/Planning";
import { Members } from "./views/Members";

function App() {
  const [currentTab, setCurrentTab] = useState<Tab>(Tab.Schedule);
  
  // No auth loading state needed for LocalStorage version
  const renderView = () => {
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
    <div className="h-[100dvh] w-full bg-[#E0F2FE] relative overflow-hidden flex flex-col font-sans text-gray-800 bg-[radial-gradient(#60A5FA_1px,transparent_1px)] [background-size:20px_20px]">
      <div className="flex-1 overflow-hidden relative">
        {renderView()}
      </div>
      
      {/* ✅ 下面呢行改左做 MyNavBar，對應返上面的 Import */}
      <MyNavBar currentTab={currentTab} onTabChange={setCurrentTab} />
    </div>
  );
}

export default App;
