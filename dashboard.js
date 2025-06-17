import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="bg-gray-100 p-4 rounded-lg shadow">
        <p className="mb-4">Welcome to ALTIMATE – your universal product scraper for Shopify and WooCommerce.</p>

        <Link href="/settings">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-xl font-semibold mb-2">
            🔌 Connect Store
          </button>
        </Link>

        <p className="text-gray-600 text-sm mt-2">Make sure your store is connected before exporting products.</p>
      </div>
    </div>
  );
}
