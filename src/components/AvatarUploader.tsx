'use client';
import { useState } from 'react';

export default function AvatarUploader() {
  const [avatar, setAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setAvatar(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleUpload = async () => {
    if (!avatar) return;
    // Upload logic here
    alert('Avatar uploaded successfully'); // Replace with real upload logic
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900">Upload Avatar</h1>
      <div className="mt-4">
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {preview && (
          <div className="mt-4">
            <img src={preview} alt="Avatar Preview" className="w-32 h-32 rounded-full" />
          </div>
        )}
        <button
          onClick={handleUpload}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Upload
        </button>
      </div>
    </div>
  );
} 