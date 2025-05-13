"use client";

import { useState } from 'react';

interface Notification {
  id: number;
  message: string;
  read: boolean;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, message: 'New user registered', read: false },
    { id: 2, message: 'Server maintenance scheduled', read: true },
  ]);

  const toggleReadStatus = (id: number) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: !notification.read } : notification
      )
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Notifications</h1>
        <ul className="divide-y divide-gray-200">
          {notifications.map((notification) => (
            <li key={notification.id} className="py-4 flex justify-between items-center">
              <span className={notification.read ? 'text-gray-500' : 'text-gray-900 font-semibold'}>
                {notification.message}
              </span>
              <button
                onClick={() => toggleReadStatus(notification.id)}
                className="text-blue-600 hover:text-blue-800"
              >
                {notification.read ? 'Mark as Unread' : 'Mark as Read'}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 