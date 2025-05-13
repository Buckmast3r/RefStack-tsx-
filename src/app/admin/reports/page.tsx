'use client';

export default function ReportsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
      <p className="mt-2 text-gray-600">Access platform usage and performance reports.</p>
      <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-900">Platform Usage</h2>
          <p className="mt-1 text-sm text-gray-600">View detailed reports on user activity and system performance.</p>
          {/* Placeholder for reports chart */}
          <div className="mt-4 h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Reports Chart Placeholder</span>
          </div>
        </div>
      </div>
    </div>
  );
} 