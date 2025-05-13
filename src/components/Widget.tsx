'use client';
import { ReactNode } from 'react';

interface WidgetProps {
  title: string;
  children: ReactNode;
}

export default function Widget({ title, children }: WidgetProps) {
  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <div>{children}</div>
    </div>
  );
} 