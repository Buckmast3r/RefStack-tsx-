'use client';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-100 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">User Management</h2>
            <p className="mt-2 text-gray-700">Manage users and their roles.</p>
            <Link href="/dashboard/users" className="text-blue-600 hover:text-blue-800 mt-2 inline-block">
              Go to User Management
            </Link>
          </div>
          <div className="bg-green-100 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">Analytics</h2>
            <p className="mt-2 text-gray-700">View site analytics and reports.</p>
            <Link href="/dashboard/analytics" className="text-green-600 hover:text-green-800 mt-2 inline-block">
              View Analytics
            </Link>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">Settings</h2>
            <p className="mt-2 text-gray-700">Configure application settings.</p>
            <Link href="/dashboard/settings" className="text-yellow-600 hover:text-yellow-800 mt-2 inline-block">
              Go to Settings
            </Link>
          </div>
          <div className="bg-red-100 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">Notifications</h2>
            <p className="mt-2 text-gray-700">Manage notifications and alerts.</p>
            <Link href="/dashboard/notifications" className="text-red-600 hover:text-red-800 mt-2 inline-block">
              Manage Notifications
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 