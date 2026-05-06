import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { google } from 'googleapis';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PRODUCTS_FILE = path.join(__dirname, '../data/products.json');

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

  for (const product of products) {
    // Only push Retail items (no Seller items)
    if (product.sellerId) continue;
    
    try {
      const cleanDesc = (product.description || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      const cleanTitle = (product.title || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      const link = `https://sgtradingcard.com/?product=${product.id}`;
      const imgUrl = product.imgUrl && product.imgUrl.startsWith('http') ? product.imgUrl : `https://sgtradingcard.com${product.imgUrl}`;
      const condition = product.condition ? (product.condition.toLowerCase().includes('10') || product.condition.toLowerCase().includes('mint') ? 'new' : 'used') : 'new';
      
      let parsedWeight = null;
      if (product.shippingWeight) {
        const parts = product.shippingWeight.trim().split(' ');
        if (parts.length === 2 && !isNaN(parseFloat(parts[0]))) {
           parsedWeight = { value: parseFloat(parts[0]), unit: parts[1].toLowerCase() };
        }
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
          value: product.price ? product.price.replace('$', '') : '0.00',
          currency: 'USD'
        },
        brand: 'S&G Trading',
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
  console.log(`✅ Success: ${successCount}`);
  console.log(`❌ Failed: ${failCount}`);
}

run();
