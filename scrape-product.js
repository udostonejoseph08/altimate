import axios from 'axios';
import * as cheerio from 'cheerio';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'Missing product URL' });

  try {
    const SCRAPER_API_KEY = process.env.SCRAPER_API_KEY;
    const apiUrl = `http://api.scraperapi.com?api_key=${SCRAPER_API_KEY}&url=${encodeURIComponent(url)}`;

    const response = await axios.get(apiUrl);
    const html = response.data;
    const $ = cheerio.load(html);

    const title = $('h1').first().text().trim();
    const price = $('span:contains($)').first().text().trim();
    const description = $('meta[name="description"]').attr('content') || '';

    const images = [];
    $('img').each((_, img) => {
      const src = $(img).attr('src');
      if (src && src.includes('jpg')) images.push(src);
    });

    const variants = [];
    $('[class*=sku-property] [class*=sku-title]').each((_, el) => {
      variants.push($(el).text().trim());
    });

    res.status(200).json({ title, price, description, images, variants });
  } catch (err) {
    res.status(500).json({ error: 'ScraperAPI failed or product page structure changed.' });
  }
}
