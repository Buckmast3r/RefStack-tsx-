'use client';
import { useState } from 'react';

interface CodeEditorProps {
  initialCode: string;
  onChange: (code: string) => void;
}

export default function CodeEditor({ initialCode, onChange }: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
    onChange(e.target.value);
  };

  return (
    <textarea
      value={code}
      onChange={handleChange}
      className="w-full h-64 p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
  );
} 