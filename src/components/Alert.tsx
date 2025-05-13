'use client';
import { ReactNode } from 'react';

interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  children: ReactNode;
}

export default function Alert({ type, children }: AlertProps) {
  const typeStyles = {
    success: 'bg-green-100 text-green-700',
    error: 'bg-red-100 text-red-700',
    warning: 'bg-yellow-100 text-yellow-700',
    info: 'bg-blue-100 text-blue-700',
  };

  return (
    <div className={`p-4 rounded-md ${typeStyles[type]}`}>
      {children}
    </div>
  );
} 