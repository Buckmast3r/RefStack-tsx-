'use client';

import { useState } from 'react';

interface DataPoint {
  id: number;
  label: string;
  value: number;
}

export default function AnalyticsPage() {
  const [data, setData] = useState<DataPoint[]>([
    { id: 1, label: 'Users', value: 120 },
    { id: 2, label: 'Sessions', value: 300 },
    { id: 3, label: 'Bounce Rate', value: 50 },
  ]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Analytics</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.map((point) => (
            <div key={point.id} className="bg-blue-100 p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold">{point.label}</h2>
              <p className="mt-2 text-gray-700">{point.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 