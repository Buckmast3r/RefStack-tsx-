'use client';
import { useState } from 'react';

interface CalendarProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export default function Calendar({ selectedDate, onDateChange }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(selectedDate);

  const daysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const renderDays = () => {
    const days = [];
    const totalDays = daysInMonth(currentMonth.getMonth(), currentMonth.getFullYear());
    for (let i = 1; i <= totalDays; i++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i);
      days.push(
        <button
          key={i}
          onClick={() => onDateChange(date)}
          className={`w-8 h-8 rounded-full ${
            date.toDateString() === selectedDate.toDateString() ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
          }`}
        >
          {i}
        </button>
      );
    }
    return days;
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevMonth} className="text-gray-600 hover:text-gray-900">&lt;</button>
        <span className="text-lg font-semibold">
          {currentMonth.toLocaleString('default', { month: 'long' })} {currentMonth.getFullYear()}
        </span>
        <button onClick={handleNextMonth} className="text-gray-600 hover:text-gray-900">&gt;</button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {renderDays()}
      </div>
    </div>
  );
} 