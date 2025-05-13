'use client';
import Link from 'next/link';

export default function ManageCardsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900">Manage Your Cards</h1>
      <p className="mt-2 text-gray-600">Create, edit, and organize your referral cards.</p>
      <div className="mt-4">
        <Link href="/dashboard/cards/add" className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Add New Card
        </Link>
      </div>
      <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
        <ul className="divide-y divide-gray-200">
          <li className="px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-gray-900">Card Title</div>
              <div className="flex space-x-4">
                <Link href="/dashboard/cards/edit" className="text-blue-600 hover:text-blue-900">
                  Edit
                </Link>
                <button className="text-red-600 hover:text-red-900">
                  Delete
                </button>
              </div>
            </div>
          </li>
          {/* Repeat for more cards */}
        </ul>
      </div>
    </div>
  );
} 