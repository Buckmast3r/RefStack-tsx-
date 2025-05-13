'use client';

interface ProgressBarProps {
  progress: number; // Progress percentage from 0 to 100
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-4">
      <div
        className="bg-blue-600 h-4 rounded-full"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
} 