import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PRODUCTS_FILE = path.join(__dirname, '../data/products.json');
const DATA_JS_FILE = path.join(__dirname, '../src/data.js');
const UPDATER_FILE = path.join(__dirname, '../updater.js');

async function download(url, dest) {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    if (!response.ok) throw new Error(`HTTP ${response.status} ${response.statusText}`);
    const buffer = await response.arrayBuffer();
    fs.writeFileSync(dest, Buffer.from(buffer));
    console.log(`✅ Downloaded: ${path.basename(dest)}`);
    return true;
  } catch (err) {
    console.error(`❌ Failed to download ${url}:`, err.message);
    return false;
  }
}

async function run() {
  console.log("🔍 Localizing all external product images...");
  
  if (!fs.existsSync(PRODUCTS_FILE)) {
    console.error("❌ products.json not found!");
    process.exit(1);
  }

  const products = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf-8'));
  
  let downloadCount = 0;
  let skippedCount = 0;

  for (const product of products) {
    if (!product.imgUrl) {
      skippedCount++;
      continue;
    }

    if (product.imgUrl.startsWith('http://') || product.imgUrl.startsWith('https://')) {
      const cleanTitle = product.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      const ext = product.imgUrl.includes('.jpg') || product.imgUrl.includes('.jpeg') ? '.jpg' : '.png';
      const filename = `${cleanTitle}_${product.id}${ext}`;
      const dest = path.join(__dirname, '../public/images', filename);

      console.log(`Downloading image for product ${product.id} (${product.title})`);
      const success = await download(product.imgUrl, dest);
      if (success) {
        product.imgUrl = `/images/${filename}`;
        downloadCount++;
      }
    } else {
      skippedCount++;
    }
  }

  console.log(`\n💾 Writing updated data/products.json...`);
  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));

  console.log(`\n💾 Writing updated src/data.js...`);
  if (fs.existsSync(DATA_JS_FILE)) {
    const dataJsContent = fs.readFileSync(DATA_JS_FILE, 'utf8');
    const productsIndex = dataJsContent.indexOf('export const PRODUCTS = [');
    if (productsIndex !== -1) {
      const setsPart = dataJsContent.substring(0, productsIndex);
      const newProductsPart = `export const PRODUCTS = ${JSON.stringify(products, null, 2)};\n`;
      fs.writeFileSync(DATA_JS_FILE, setsPart + newProductsPart);
      console.log("   ✅ src/data.js updated successfully.");
    } else {
      console.error("   ❌ Could not find export const PRODUCTS in src/data.js");
    }
  }

  console.log(`\n💾 Writing updated updater.js...`);
  if (fs.existsSync(UPDATER_FILE)) {
    const updaterContent = fs.readFileSync(UPDATER_FILE, 'utf8');
    const dataIndex = updaterContent.indexOf('let data = [');
    const dataEndIndex = updaterContent.indexOf('];', dataIndex);
    if (dataIndex !== -1 && dataEndIndex !== -1) {
      const beforePart = updaterContent.substring(0, dataIndex);
      const afterPart = updaterContent.substring(dataEndIndex + 2);
      const newDataPart = `let data = ${JSON.stringify(products, null, 2)}`;
      fs.writeFileSync(UPDATER_FILE, beforePart + newDataPart + afterPart);
      console.log("   ✅ updater.js updated successfully.");
    } else {
      console.error("   ❌ Could not find let data = [...] in updater.js");
    }
  }

  console.log(`\n🎉 Image localization complete!`);
  console.log(`✅ Downloaded & localized: ${downloadCount}`);
  console.log(`ℹ️ Already local / skipped: ${skippedCount}`);
}

run();
