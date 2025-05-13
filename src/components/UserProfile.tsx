'use client';

interface UserProfileProps {
  username: string;
  email: string;
  avatarUrl?: string;
}

export default function UserProfile({ username, email, avatarUrl }: UserProfileProps) {
  return (
    <div className="flex items-center p-4 bg-white shadow rounded-lg">
      <img
        src={avatarUrl || '/default-avatar.png'}
        alt="User Avatar"
        className="w-16 h-16 rounded-full mr-4"
      />
      <div>
        <h2 className="text-lg font-semibold text-gray-900">{username}</h2>
        <p className="text-sm text-gray-600">{email}</p>
      </div>
    </div>
  );
} 