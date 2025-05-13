import Link from 'next/link';

export function Navbar() {
  return (
    <nav className="w-full bg-white shadow-sm py-4 px-6 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <Link href="/">
          <span className="inline-flex items-center space-x-2">
            <img src="/logo.svg" alt="RefStack Logo" className="h-8 w-8" />
            <span className="font-bold text-lg text-blue-700">RefStack</span>
          </span>
        </Link>
      </div>
      <div className="flex items-center space-x-6">
        <Link href="/dashboard" className="hover:text-blue-700 font-medium">Dashboard</Link>
        <Link href="/pricing" className="hover:text-blue-700 font-medium">Pricing</Link>
        <Link href="/blog" className="hover:text-blue-700 font-medium">Blog</Link>
        <Link href="/contact" className="hover:text-blue-700 font-medium">Contact</Link>
        {/* TODO: Add auth status (login/logout/profile) */}
        <Link href="/login" className="ml-4 px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">Sign In</Link>
      </div>
    </nav>
  );
} 