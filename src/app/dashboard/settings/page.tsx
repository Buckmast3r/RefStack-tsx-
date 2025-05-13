'use client';
import { useState } from 'react';

interface Setting {
  id: number;
  name: string;
  value: string;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Setting[]>([
    { id: 1, name: 'Site Title', value: 'My SaaS App' },
    { id: 2, name: 'Admin Email', value: 'admin@example.com' },
  ]);

  const handleChange = (id: number, newValue: string) => {
    setSettings((prevSettings) =>
      prevSettings.map((setting) =>
        setting.id === id ? { ...setting, value: newValue } : setting
      )
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Settings</h1>
        <div className="space-y-4">
          {settings.map((setting) => (
            <div key={setting.id} className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                {setting.name}
              </label>
              <input
                type="text"
                value={setting.value}
                onChange={(e) => handleChange(setting.id, e.target.value)}
                className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 