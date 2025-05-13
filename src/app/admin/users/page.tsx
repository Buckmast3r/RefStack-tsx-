'use client';

export default function ManageUsersPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900">Manage Users</h1>
      <p className="mt-2 text-gray-600">View and manage user accounts.</p>
      <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
        <ul className="divide-y divide-gray-200">
          <li className="px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-gray-900">User Name</div>
              <div className="flex space-x-4">
                <button className="text-blue-600 hover:text-blue-900">
                  Edit
                </button>
                <button className="text-red-600 hover:text-red-900">
                  Delete
                </button>
              </div>
            </div>
          </li>
          {/* Repeat for more users */}
        </ul>
      </div>
    </div>
  );
} 