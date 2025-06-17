import Link from 'next/link';

export default function Home() {
  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to ALTIMATE 🧠</h1>
      <p className="text-gray-600 mb-6">The ultimate product scraper for Shopify & WooCommerce.</p>
      <Link href="/dashboard">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-xl">Go to Dashboard</button>
      </Link>
    </div>
  );
}
