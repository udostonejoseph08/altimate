import { useEffect, useState } from 'react';
import Link from 'next/link';
import { toast, Toaster } from 'react-hot-toast';

export default function Settings() {
  const [platform, setPlatform] = useState('Shopify');
  const [shop, setShop] = useState('');
  const [token, setToken] = useState('');
  const [consumerKey, setConsumerKey] = useState('');
  const [consumerSecret, setConsumerSecret] = useState('');

  useEffect(() => {
    fetch('/api/store-settings')
      .then(res => res.json())
      .then(data => {
        if (data.platform) setPlatform(data.platform);
        if (data.shop) setShop(data.shop);
        if (data.token) setToken(data.token);
        if (data.consumerKey) setConsumerKey(data.consumerKey);
        if (data.consumerSecret) setConsumerSecret(data.consumerSecret);
      });
  }, []);

  const saveSettings = async () => {
    const res = await fetch('/api/store-settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ platform, shop, token, consumerKey, consumerSecret }),
    });
    if (res.ok) {
      toast.success('✅ Settings saved successfully!');
    } else {
      toast.error('❌ Failed to save settings');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-2xl font-bold mb-4">Store Settings</h1>
      <Link href="/dashboard" className="text-sm text-blue-600 underline mb-6 inline-block">← Back to Dashboard</Link>

      <label className="block mb-2">Platform:</label>
      <select
        className="border p-2 mb-4 w-full"
        value={platform}
        onChange={e => setPlatform(e.target.value)}
      >
        <option value="Shopify">Shopify</option>
        <option value="WooCommerce">WooCommerce</option>
      </select>

      <label className="block mb-2">Store URL:</label>
      <input
        className="border p-2 mb-4 w-full"
        value={shop}
        onChange={e => setShop(e.target.value)}
      />

      {platform === 'Shopify' ? (
        <>
          <label className="block mb-2">Access Token:</label>
          <input
            className="border p-2 mb-4 w-full"
            value={token}
            onChange={e => setToken(e.target.value)}
          />
        </>
      ) : (
        <>
          <label className="block mb-2">Consumer Key:</label>
          <input
            className="border p-2 mb-4 w-full"
            value={consumerKey}
            onChange={e => setConsumerKey(e.target.value)}
          />
          <label className="block mb-2">Consumer Secret:</label>
          <input
            className="border p-2 mb-4 w-full"
            value={consumerSecret}
            onChange={e => setConsumerSecret(e.target.value)}
          />
        </>
      )}

      <button
        className="bg-black text-white px-6 py-2 rounded-xl font-semibold"
        onClick={saveSettings}
      >
        Save Settings
      </button>
    </div>
  );
}
