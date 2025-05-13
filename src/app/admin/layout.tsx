'use client';
import { ReactNode } from 'react';
import Link from 'next/link';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white">
        <div className="p-4">
          <h2 className="text-lg font-bold">Admin Panel</h2>
        </div>
        <nav className="mt-5">
          <ul>
            <li>
              <Link href="/admin" className="block px-4 py-2 hover:bg-gray-700">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/admin/users" className="block px-4 py-2 hover:bg-gray-700">
                Users
              </Link>
            </li>
            <li>
              <Link href="/admin/cards" className="block px-4 py-2 hover:bg-gray-700">
                Cards
              </Link>
            </li>
            <li>
              <Link href="/admin/reports" className="block px-4 py-2 hover:bg-gray-700">
                Reports
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