export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto py-16">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-extrabold mb-4 text-blue-700">Grow Your Business with RefStack</h1>
        <p className="text-lg text-gray-600 mb-8">The easiest way to manage, track, and grow your referral program. Built for SaaS teams who want results.</p>
        <a href="/register" className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition">Get Started Free</a>
      </section>
      <section className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="font-bold text-xl mb-2 text-blue-700">Easy Integration</h2>
          <p className="text-gray-600">Connect with your favorite tools and start tracking referrals in minutes.</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="font-bold text-xl mb-2 text-blue-700">Real-Time Analytics</h2>
          <p className="text-gray-600">See clicks, conversions, and top performers with beautiful dashboards.</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="font-bold text-xl mb-2 text-blue-700">Automated Payouts</h2>
          <p className="text-gray-600">Reward your advocates with Stripe-powered payouts and seamless billing.</p>
        </div>
      </section>
      <section className="text-center">
        <h3 className="text-2xl font-bold mb-4">Ready to get more referrals?</h3>
        <a href="/register" className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition">Create Your Account</a>
      </section>
    </div>
  );
} 