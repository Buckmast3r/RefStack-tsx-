'use client';

interface ChatBubbleProps {
  message: string;
  isSender: boolean;
}

export default function ChatBubble({ message, isSender }: ChatBubbleProps) {
  return (
    <div className={`flex ${isSender ? 'justify-end' : 'justify-start'} mb-2`}>
      <div className={`max-w-xs p-3 rounded-lg shadow-md ${isSender ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-900'}`}>
        {message}
      </div>
    </div>
  );
} 