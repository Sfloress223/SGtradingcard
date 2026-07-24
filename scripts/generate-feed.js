import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productsPath = path.join(__dirname, '../data/products.json');
let PRODUCTS = [];
try {
  if (fs.existsSync(productsPath)) {
    PRODUCTS = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
  } else {
    console.warn("⚠️ data/products.json not found. Generating feed with 0 items.");
  }
} catch (err) {
  console.error("⚠️ Failed to parse products.json:", err.message);
}

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
  if (product.hidden) return;
  
  let rawPrice = parseFloat((product.price || "").replace('$', '').replace(/,/g, '')) || 0;
  if (rawPrice <= 0) return;
  if (!product.imgUrl) return;

  let cleanDesc = (product.description || "").replace(/&/g, "&amp;").replace(/&nbsp;/g, " ").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  let cleanTitle = (product.title || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  let priceStr = product.price ? product.price.replace('$', '') + " USD" : "";
  // Ensure we use the exact product link parameter from our single page app setup
  let link = `https://sgtradingcard.com/?product=${product.id}`; 
  let imgUrl = product.imgUrl && product.imgUrl.startsWith('http') ? product.imgUrl : `https://sgtradingcard.com${product.imgUrl}`;
  let condition = product.condition ? (product.condition.toLowerCase().includes('10') || product.condition.toLowerCase().includes('mint') ? 'new' : 'used') : 'new';
  let weight = product.shippingWeight || getWeight(product.title);
  let shippingXml = '';
  if (rawPrice >= 100) {
    shippingXml = `
      <g:shipping>
        <g:country>US</g:country>
        <g:service>Standard</g:service>
        <g:price>0.00 USD</g:price>
      </g:shipping>`;
  } else {
    shippingXml = `
      <g:shipping>
        <g:country>US</g:country>
        <g:service>Standard</g:service>
        <g:price>5.99 USD</g:price>
      </g:shipping>`;
  }

  let googleProductCategory = '505707'; // Default: Trading Card Game Single Cards / Collectibles
  let productType = 'Trading Cards &gt; Collectibles';
  let titleLower = (product.title || "").toLowerCase();
  const isGraded = product.setId === 'graded-cards' || (product.condition && ['psa', 'cgc', 'beckett'].some(g => product.condition.toLowerCase().includes(g))) || (titleLower.includes('psa') || titleLower.includes('cgc') || titleLower.includes('beckett') || titleLower.includes('graded') || titleLower.includes('slab'));
  const isSingle = product.setId === 'singles' || product.cardType === 'Single';
  
  let brand = 'Pokémon';
  if (isGraded) {
    productType = 'Trading Cards &gt; Graded Slabs &gt; Pokémon';
    if (titleLower.includes('cgc')) brand = 'CGC';
    else if (titleLower.includes('beckett') || titleLower.includes('bgs')) brand = 'Beckett';
    else brand = 'PSA';
  } else if (isSingle) {
    productType = 'Trading Cards &gt; Singles &gt; Pokémon';
    googleProductCategory = '505707';
  } else if (titleLower.includes('pack') || titleLower.includes('blister')) {
    productType = 'Trading Cards &gt; Sealed Product &gt; Booster Packs';
    googleProductCategory = '6001';
  } else if (titleLower.includes('box') || titleLower.includes('etb') || titleLower.includes('bundle') || titleLower.includes('tin') || titleLower.includes('chest') || titleLower.includes('collection')) {
    productType = 'Trading Cards &gt; Sealed Product &gt; Boxes &amp; ETBs';
    googleProductCategory = '6001';
  }

  if (titleLower.includes('one piece')) {
    brand = 'Bandai';
  } else if (titleLower.includes('manta ray') || titleLower.includes('s&g') || titleLower.includes('sg trading')) {
    brand = 'S&amp;G Trading';
  }

  let mpnXml = `<g:mpn>SG-${product.id}</g:mpn>`;
  let identifierExistsXml = `<g:identifier_exists>no</g:identifier_exists>`;
  if (product.gtin || product.barcode) {
    identifierExistsXml = `<g:gtin>${product.gtin || product.barcode}</g:gtin>\n      <g:identifier_exists>yes</g:identifier_exists>`;
  }

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
      <g:brand>${brand}</g:brand>
      ${mpnXml}
      <g:google_product_category>${googleProductCategory}</g:google_product_category>
      <g:product_type>${productType}</g:product_type>
      ${identifierExistsXml}
      <g:shipping_weight>${weight}</g:shipping_weight>${shippingXml}
    </item>`;
});

xml += `
  </channel>
</rss>`;

// Write to public folder so Vite serves it statically
fs.writeFileSync(path.join(__dirname, '../public/google-feed.xml'), xml);
console.log("✅ Successfully generated google-feed.xml to public directory!");
