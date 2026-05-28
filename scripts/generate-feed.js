import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productsPath = path.join(__dirname, '../data/products.json');
const PRODUCTS = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

let xml = `<?xml version="1.0"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>S&amp;G Trading</title>
    <link>https://sgtradingcard.com</link>
    <description>Your trusted source for authentic trading cards and collectibles.</description>
`;

function getWeight(title) {
  let t = (title || "").toLowerCase();
  if (t.includes('ultra-premium')) return '3.5 lb';
  if (t.includes('adventure chest') || t.includes('gift box')) return '2.5 lb';
  if (t.includes('elite trainer box')) return '1.6 lb';
  if (t.includes('booster box')) return '1.8 lb';
  if (t.includes('collection') && t.includes('box')) return '1.2 lb';
  if (t.includes('tin') && !t.includes('mini')) return '0.8 lb';
  if (t.includes('mini tin')) return '4 oz';
  if (t.includes('booster bundle')) return '6 oz';
  if (t.includes('battle deck')) return '6 oz';
  if (t.includes('psa')) return '4 oz';
  if (t.includes('plush') || t.includes('charm')) return '2 oz';
  if (t.includes('figure') || t.includes('terrarium')) return '6 oz';
  if (t.includes('booster pack') || t.includes('pack')) return '1 oz';
  if (t.includes('blister')) return '3 oz';
  if (t.includes('knock out collection')) return '5 oz';
  if (t.includes('tin')) return '0.8 lb'; 
  if (t.includes('single') || t.includes('card')) return '1 oz';
  return '1 lb'; 
}

PRODUCTS.forEach(product => {
  let cleanDesc = (product.description || "").replace(/&/g, "&amp;").replace(/&nbsp;/g, " ").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  let cleanTitle = (product.title || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  let priceStr = product.price ? product.price.replace('$', '') + " USD" : "";
  // Ensure we use the exact product link parameter from our single page app setup
  let link = `https://sgtradingcard.com/?product=${product.id}`; 
  let imgUrl = product.imgUrl && product.imgUrl.startsWith('http') ? product.imgUrl : `https://sgtradingcard.com${product.imgUrl}`;
  let condition = product.condition ? (product.condition.toLowerCase().includes('10') || product.condition.toLowerCase().includes('mint') ? 'new' : 'used') : 'new';
  let weight = product.shippingWeight || getWeight(product.title);
  
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
      <g:google_product_category>505707</g:google_product_category>
      <g:identifier_exists>no</g:identifier_exists>
      <g:shipping_weight>${weight}</g:shipping_weight>
    </item>`;
});

xml += `
  </channel>
</rss>`;

// Write to public folder so Vite serves it statically
fs.writeFileSync(path.join(__dirname, '../public/google-feed.xml'), xml);
console.log("✅ Successfully generated google-feed.xml to public directory!");
