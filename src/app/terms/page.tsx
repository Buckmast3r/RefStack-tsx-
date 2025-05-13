'use client';

export default function TermsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900">Terms and Conditions</h1>
      <p className="mt-2 text-gray-600">Please read these terms and conditions carefully before using our service.</p>
      <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-900">1. Introduction</h2>
          <p className="mt-1 text-sm text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
          <h2 className="mt-4 text-lg font-semibold text-gray-900">2. User Obligations</h2>
          <p className="mt-1 text-sm text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
          {/* Add more sections as needed */}
        </div>
      </div>
    </div>
  );
} 