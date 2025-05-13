'use client'

import Link from 'next/link'

export default function ConfirmEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Confirm Your Email</h2>
        <p className="text-center text-gray-700">
          A confirmation email has been sent to your email address. Please check your inbox and follow the instructions to confirm your email.
        </p>
      </div>
    </div>
  )
} 