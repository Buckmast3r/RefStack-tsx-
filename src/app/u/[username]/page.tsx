'use client';
import { useRouter } from 'next/router';

export default function UserProfilePage() {
  const router = useRouter();
  const { username } = router.query;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900">{username}'s Profile</h1>
      <p className="mt-2 text-gray-600">View public information and referral cards.</p>
      <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-900">Referral Cards</h2>
          <ul className="mt-4 divide-y divide-gray-200">
            <li className="py-4">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-gray-900">Card Title</div>
                <button className="text-blue-600 hover:text-blue-900">
                  View
                </button>
              </div>
            </li>
            {/* Repeat for more cards */}
          </ul>
        </div>
      </div>
    </div>
  );
} 