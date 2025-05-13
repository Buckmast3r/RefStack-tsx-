'use client';
import { useRouter } from 'next/router';

export default function BlogPostPage() {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900">Blog Post Title</h1>
      <p className="mt-2 text-gray-600">Published on: Date</p>
      <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="p-4">
          <p className="text-sm text-gray-900">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
          {/* Add more content as needed */}
        </div>
      </div>
    </div>
  );
} 