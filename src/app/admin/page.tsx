'use client';
import Link from 'next/link';

export default function AdminDashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900">Welcome to the Admin Dashboard</h1>
      <p className="mt-2 text-gray-600">Here are some quick links to manage the platform:</p>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link href="/admin/users" className="block p-4 bg-white shadow rounded-lg hover:bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-900">Manage Users</h2>
          <p className="mt-1 text-sm text-gray-600">View and manage user accounts.</p>
        </Link>
        <Link href="/admin/cards" className="block p-4 bg-white shadow rounded-lg hover:bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-900">Manage Cards</h2>
          <p className="mt-1 text-sm text-gray-600">Review and manage referral cards.</p>
        </Link>
        <Link href="/admin/reports" className="block p-4 bg-white shadow rounded-lg hover:bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-900">View Reports</h2>
          <p className="mt-1 text-sm text-gray-600">Access platform usage and performance reports.</p>
        </Link>
      </div>
    </div>
  );
} 