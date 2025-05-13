'use client';
import { ReactNode } from 'react';
import Link from 'next/link';

interface SidebarProps {
  links: { href: string; label: string }[];
}

export default function Sidebar({ links }: SidebarProps) {
  return (
    <aside className="w-64 bg-gray-800 text-white">
      <div className="p-4">
        <h2 className="text-lg font-bold">Navigation</h2>
      </div>
      <nav className="mt-5">
        <ul>
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="block px-4 py-2 hover:bg-gray-700">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
} 