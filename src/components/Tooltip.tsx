'use client';
import { ReactNode, useState } from 'react';

interface TooltipProps {
  children: ReactNode;
  text: string;
}

export default function Tooltip({ children, text }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className="absolute bottom-full mb-2 w-max px-2 py-1 bg-gray-800 text-white text-sm rounded-md shadow-lg">
          {text}
        </div>
      )}
    </div>
  );
} 