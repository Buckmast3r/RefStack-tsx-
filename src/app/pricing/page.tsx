export default function PricingPage() {
  return (
    <div className="max-w-5xl mx-auto py-16">
      <h1 className="text-3xl font-extrabold text-center mb-8 text-blue-700">Pricing</h1>
      <div className="grid md:grid-cols-3 gap-8">
        {/* Free Plan */}
        <div className="bg-white rounded-lg shadow p-8 flex flex-col items-center">
          <h2 className="text-xl font-bold mb-2">Free</h2>
          <div className="text-3xl font-extrabold mb-4">$0</div>
          <ul className="mb-6 text-gray-600 space-y-2">
            <li>Up to 3 referral cards</li>
            <li>Basic analytics</li>
            <li>Email support</li>
          </ul>
          <a href="/register" className="px-6 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 transition">Get Started</a>
        </div>
        {/* Pro Plan */}
        <div className="bg-blue-50 rounded-lg shadow p-8 flex flex-col items-center border-2 border-blue-600">
          <h2 className="text-xl font-bold mb-2 text-blue-700">Pro</h2>
          <div className="text-3xl font-extrabold mb-4 text-blue-700">$19<span className="text-base font-normal">/mo</span></div>
          <ul className="mb-6 text-gray-700 space-y-2">
            <li>Unlimited referral cards</li>
            <li>Advanced analytics</li>
            <li>Custom branding</li>
            <li>Priority support</li>
          </ul>
          <a href="/register" className="px-6 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 transition">Start Pro</a>
        </div>
        {/* Enterprise Plan */}
        <div className="bg-white rounded-lg shadow p-8 flex flex-col items-center">
          <h2 className="text-xl font-bold mb-2">Enterprise</h2>
          <div className="text-3xl font-extrabold mb-4">Custom</div>
          <ul className="mb-6 text-gray-600 space-y-2">
            <li>All Pro features</li>
            <li>Dedicated account manager</li>
            <li>Custom integrations</li>
            <li>SLA & compliance</li>
          </ul>
          <a href="/contact" className="px-6 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 transition">Contact Sales</a>
        </div>
      </div>
    </div>
  );
} 