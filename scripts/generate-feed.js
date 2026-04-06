import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PRODUCTS } from '../src/data.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let xml = `<?xml version="1.0"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>S&amp;G Trading</title>
    <link>https://sgtradingcard.com</link>
    <description>Your trusted source for authentic trading cards, collectibles, and all things nerd culture.</description>
`;

PRODUCTS.forEach(product => {
  let cleanDesc = (product.description || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  let cleanTitle = (product.title || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  let priceStr = product.price ? product.price.replace('$', '') + " USD" : "";
  // Ensure we use the exact product link parameter from our single page app setup
  let link = `https://sgtradingcard.com/?product=${product.id}`; 
  let imgUrl = product.imgUrl && product.imgUrl.startsWith('http') ? product.imgUrl : `https://sgtradingcard.com${product.imgUrl}`;
  let condition = product.condition ? (product.condition.toLowerCase().includes('10') || product.condition.toLowerCase().includes('mint') ? 'new' : 'used') : 'new';
  
  xml += `
    <item>
      <g:id>${product.id}</g:id>
      <title>${cleanTitle}</title>
      <description>${cleanDesc}</description>
      <link>${link}</link>
      <g:image_link>${imgUrl}</g:image_link>
      <g:condition>${condition}</g:condition>
      <g:availability>${product.soldOut ? 'out of stock' : 'in stock'}</g:availability>
      <g:price>${priceStr}</g:price>
      <g:brand>S&amp;G Trading</g:brand>
      <g:identifier_exists>no</g:identifier_exists>
      ${product.shippingWeight ? `<g:shipping_weight>${product.shippingWeight}</g:shipping_weight>` : ''}
    </item>`;
});

xml += `
  </channel>
</rss>`;

// Write to public folder so Vite serves it statically
fs.writeFileSync(path.join(__dirname, '../public/google-feed.xml'), xml);
console.log("✅ Successfully generated google-feed.xml to public directory!");
