import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { google } from 'googleapis';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PRODUCTS_FILE = path.join(__dirname, '../data/products.json');

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

function parseWeight(weightStr) {
  if (!weightStr) return null;
  const parts = weightStr.trim().split(' ');
  if (parts.length === 2 && !isNaN(parseFloat(parts[0]))) {
     return { value: parseFloat(parts[0]), unit: parts[1].toLowerCase() };
  }
  return null;
}

async function run() {
  console.log("🚀 Starting Google Merchant Center Full Sync...");
  
  if (!process.env.GOOGLE_APPLICATION_CREDENTIALS || !process.env.MERCHANT_ID) {
    console.error("❌ Missing GOOGLE_APPLICATION_CREDENTIALS or MERCHANT_ID in .env");
    process.exit(1);
  }

  const auth = new google.auth.GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/content']
  });
  
  const contentApi = google.content({ version: 'v2.1', auth });
  const products = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf-8'));
  
  console.log(`📦 Found ${products.length} products to sync...`);
  
  let successCount = 0;
  let failCount = 0;
  let deleteCount = 0;

  for (const product of products) {
    // Only push Retail items (no Seller items)
    if (product.sellerId) continue;
    
    const rawPrice = parseFloat((product.price || "").replace('$', '').replace(/,/g, '')) || 0;
    if (product.hidden || rawPrice <= 0) {
      try {
        console.log(`🗑️ Deleting hidden/zero-priced product from Google: ${product.title} (ID: ${product.id})`);
        await contentApi.products.delete({
          merchantId: process.env.MERCHANT_ID,
          productId: `online:en:US:${product.id}`
        });
        console.log(`   ✅ Deleted successfully`);
        deleteCount++;
      } catch (err) {
        if (err.code === 404 || (err.message && err.message.toLowerCase().includes('not found'))) {
          console.log(`   ✅ Already absent from Google`);
        } else {
          console.error(`   ❌ Failed to delete: ${err.message}`);
        }
      }
      continue;
    }

    try {
      const cleanDesc = (product.description || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      const cleanTitle = (product.title || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      const link = `https://sgtradingcard.com/?product=${product.id}`;
      const imgUrl = product.imgUrl && product.imgUrl.startsWith('http') ? product.imgUrl : `https://sgtradingcard.com${product.imgUrl}`;
      const condition = product.condition ? (product.condition.toLowerCase().includes('10') || product.condition.toLowerCase().includes('mint') ? 'new' : 'used') : 'new';
      
      const weightStr = product.shippingWeight || getWeight(product.title);
      const parsedWeight = parseWeight(weightStr);
      
      const titleLower = (product.title || "").toLowerCase();
      let brand = 'Pokémon';
      if (titleLower.includes('manta ray')) {
        brand = 'S&G Trading';
      }

      const requestBody = {
        offerId: product.id.toString(),
        title: cleanTitle,
        description: cleanDesc,
        link: link,
        imageLink: imgUrl,
        contentLanguage: 'en',
        targetCountry: 'US',
        channel: 'online',
        availability: product.soldOut ? 'out of stock' : 'in stock',
        condition: condition,
        price: {
          value: rawPrice.toFixed(2),
          currency: 'USD'
        },
        brand: brand,
        identifierExists: false
      };
      
      if (parsedWeight) {
        requestBody.shippingWeight = parsedWeight;
      }

      await contentApi.products.insert({
        merchantId: process.env.MERCHANT_ID,
        requestBody
      });
      
      console.log(`✅ Synced: ${product.title}`);
      successCount++;
    } catch (err) {
      console.error(`❌ Failed: ${product.title} - ${err.message}`);
      failCount++;
    }
  }
  
  console.log(`\n🎉 Sync Complete!`);
  console.log(`✅ Success (Updated/Inserted): ${successCount}`);
  console.log(`🗑️ Deleted: ${deleteCount}`);
  console.log(`❌ Failed: ${failCount}`);
}

run();
