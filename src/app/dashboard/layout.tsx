'use client';
import { ReactNode } from 'react';
import Link from 'next/link';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white">
        <div className="p-4">
          <h2 className="text-lg font-bold">Dashboard</h2>
        </div>
        <nav className="mt-5">
          <ul>
            <li>
              <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-700">
                Home
              </Link>
            </li>
            <li>
              <Link href="/dashboard/cards" className="block px-4 py-2 hover:bg-gray-700">
                Cards
              </Link>
            </li>
            <li>
              <Link href="/dashboard/settings" className="block px-4 py-2 hover:bg-gray-700">
                Settings
              </Link>
            </li>
            <li>
              <Link href="/dashboard/analytics" className="block px-4 py-2 hover:bg-gray-700">
                Analytics
              </Link>
            </li>
            <li>
              <Link href="/dashboard/subscription" className="block px-4 py-2 hover:bg-gray-700">
                Subscription
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-6 bg-gray-100">
        {children}
      </main>
    </div>
  );
} 