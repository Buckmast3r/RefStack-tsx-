'use client';

interface CommentProps {
  author: string;
  text: string;
  date: string;
}

export default function Comment({ author, text, date }: CommentProps) {
  return (
    <div className="p-4 bg-white shadow rounded-lg mb-4">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-lg font-semibold text-gray-900">{author}</h4>
        <span className="text-sm text-gray-500">{date}</span>
      </div>
      <p className="text-gray-700">{text}</p>
    </div>
  );
} 