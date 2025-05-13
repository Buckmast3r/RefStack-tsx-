'use client';

export default function UpdatesPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900">Platform Updates</h1>
      <p className="mt-2 text-gray-600">Stay informed about the latest changes and improvements.</p>
      <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
        <ul className="divide-y divide-gray-200">
          <li className="px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-gray-900">Update Title</div>
              <button className="text-blue-600 hover:text-blue-900">
                Read More
              </button>
            </div>
          </li>
          {/* Repeat for more updates */}
        </ul>
      </div>
    </div>
  );
} 