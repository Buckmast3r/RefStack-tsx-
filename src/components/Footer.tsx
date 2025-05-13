import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full bg-white border-t py-6 px-6 mt-8 text-center text-sm text-gray-500">
      <div className="mb-2">
        &copy; {new Date().getFullYear()} RefStack. All rights reserved.
      </div>
      <div className="space-x-4">
        <Link href="/terms" className="hover:text-blue-700">Terms</Link>
        <Link href="/privacy" className="hover:text-blue-700">Privacy</Link>
        <Link href="/contact" className="hover:text-blue-700">Contact</Link>
      </div>
    </footer>
  );
} 