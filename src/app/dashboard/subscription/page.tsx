'use client';
import { useState } from 'react';

export default function SubscriptionPage() {
  const [plan, setPlan] = useState('Free'); // Example state for current plan

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900">Subscription</h1>
      <p className="mt-2 text-gray-600">Manage your subscription and billing information.</p>
      <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-900">Current Plan: {plan}</h2>
          <p className="mt-1 text-sm text-gray-600">You are currently on the {plan} plan.</p>
          <div className="mt-4 flex space-x-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Upgrade Plan
            </button>
            <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
              Cancel Subscription
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 