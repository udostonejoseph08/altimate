import { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';

export default function Import() {
  const [url, setUrl] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleScrape = async () => {
    setLoading(true);
    setData(null);
    const res = await fetch('/api/scrape-product', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });
    const result = await res.json();
    setLoading(false);
    if (res.ok) {
      setData(result);
      toast.success('✅ Product scraped successfully!');
    } else {
      toast.error(`❌ ${result.error || 'Scrape failed'}`);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Toaster position="top-center" />
      <h1 className="text-2xl font-bold mb-4">🧲 Import Product</h1>

      <input
        className="border p-2 w-full mb-4"
        placeholder="Paste product URL (AliExpress, Temu, etc.)"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button
        onClick={handleScrape}
        className="bg-blue-600 text-white px-4 py-2 rounded-xl"
        disabled={loading}
      >
        {loading ? 'Scraping...' : 'Scrape Product'}
      </button>

      {data && (
        <div className="mt-6 p-4 bg-gray-100 rounded shadow">
          <h2 className="text-lg font-semibold">Scraped Data Preview:</h2>
          <p><strong>Title:</strong> {data.title}</p>
          <p><strong>Price:</strong> {data.price}</p>
          <p><strong>Description:</strong> {data.description}</p>
          {data.variants?.length > 0 && (
            <>
              <p><strong>Variants:</strong></p>
              <ul className="list-disc ml-6">
                {data.variants.map((v, i) => (
                  <li key={i}>{v}</li>
                ))}
              </ul>
            </>
          )}
          {data.images?.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-2">
              {data.images.map((src, i) => (
                <img key={i} src={src} alt="Variant" className="w-full h-24 object-cover rounded" />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
