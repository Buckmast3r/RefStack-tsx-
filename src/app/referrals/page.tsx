import { useState } from 'react';

interface ReferralCard {
  id: number;
  title: string;
  description: string;
}

export default function ReferralCardsPage() {
  const [cards, setCards] = useState<ReferralCard[]>([
    { id: 1, title: 'Refer a Friend', description: 'Invite your friends and earn rewards.' },
    { id: 2, title: 'Special Offer', description: 'Get a discount for every referral.' },
  ]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Referral Cards</h1>
        <ul className="divide-y divide-gray-200">
          {cards.map((card) => (
            <li key={card.id} className="py-4">
              <h2 className="text-xl font-semibold text-gray-900">{card.title}</h2>
              <p className="mt-2 text-gray-700">{card.description}</p>
              <div className="mt-4 flex justify-end">
                <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
                <button className="text-red-600 hover:text-red-900 ml-4">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 