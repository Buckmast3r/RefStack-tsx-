'use client';
import { useState } from 'react';

interface TabProps {
  tabs: { label: string; content: React.ReactNode }[];
}

export default function Tab({ tabs }: TabProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="flex border-b">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 -mb-px border-b-2 transition-colors duration-300 ease-in-out ${
              activeTab === index ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-600 hover:text-blue-600'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="p-4">
        {tabs[activeTab].content}
      </div>
    </div>
  );
}
