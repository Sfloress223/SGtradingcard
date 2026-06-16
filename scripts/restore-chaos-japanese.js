import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const backupProductsPath = path.join(__dirname, '../data_backup/products.json');
const backupSetsPath = path.join(__dirname, '../data_backup/sets.json');
const liveProductsPath = path.join(__dirname, '../data/products.json');
const liveSetsPath = path.join(__dirname, '../data/sets.json');
const srcPath = path.join(__dirname, '../src/data.js');

try {
  // Read current files
  const currentProducts = JSON.parse(fs.readFileSync(backupProductsPath, 'utf8'));
  const currentSets = JSON.parse(fs.readFileSync(backupSetsPath, 'utf8'));

  // Extract old files from history (commit 3e37c52)
  const oldProducts = JSON.parse(execSync('git show 3e37c52:data/products.json', { maxBuffer: 20 * 1024 * 1024 }));
  const oldSets = JSON.parse(execSync('git show 3e37c52:data/sets.json'));

  const missingProductIds = [1329, 1330, 1331, 1332, 1333, 1334, 1335, 1336];
  const missingSetIds = ['chaos-rising'];

  // Filter missing items from old databases
  const productsToRestore = oldProducts.filter(p => missingProductIds.includes(p.id));
  const setsToRestore = oldSets.filter(s => missingSetIds.includes(s.id));

  // Merge products
  const productMap = new Map(currentProducts.map(p => [p.id, p]));
  productsToRestore.forEach(p => {
    productMap.set(p.id, p);
  });
  const finalProducts = Array.from(productMap.values()).sort((a, b) => a.id - b.id);

  // Merge sets
  const setMap = new Map(currentSets.map(s => [s.id, s]));
  setsToRestore.forEach(s => {
    setMap.set(s.id, s);
  });
  const finalSets = Array.from(setMap.values());

  // Write updated backups
  fs.writeFileSync(backupProductsPath, JSON.stringify(finalProducts, null, 2));
  fs.writeFileSync(backupSetsPath, JSON.stringify(finalSets, null, 2));

  // Write updated live files
  fs.writeFileSync(liveProductsPath, JSON.stringify(finalProducts, null, 2));
  fs.writeFileSync(liveSetsPath, JSON.stringify(finalSets, null, 2));
  
  console.log(`✅ Successfully restored ${productsToRestore.length} products and ${setsToRestore.length} sets to JSON databases!`);

  // Update src/data.js fallbacks
  let srcContent = fs.readFileSync(srcPath, 'utf8');
  
  // 1. Replace SETS
  const setsMarker = 'export const SETS = [';
  const setsParts = srcContent.split(setsMarker);
  if (setsParts.length === 2) {
    const productsMarker = 'export const PRODUCTS = [';
    const productsParts = setsParts[1].split(productsMarker);
    if (productsParts.length === 2) {
      const formattedSets = JSON.stringify(finalSets, null, 2);
      srcContent = setsParts[0] + setsMarker + '\n' + formattedSets.substring(1, formattedSets.length - 1) + '\n];\n\n' + productsMarker + productsParts[1];
    }
  }

  // 2. Replace PRODUCTS
  const productsMarker = 'export const PRODUCTS = [';
  const parts = srcContent.split(productsMarker);
  if (parts.length === 2) {
    const formattedProducts = JSON.stringify(finalProducts, null, 2);
    srcContent = parts[0] + productsMarker + '\n' + formattedProducts.substring(1) + ';\n';
    fs.writeFileSync(srcPath, srcContent);
    console.log("✅ Successfully updated src/data.js with restored products and sets!");
  } else {
    console.error("⚠️ Failed to parse src/data.js PRODUCTS split marker!");
  }

} catch (err) {
  console.error("❌ Failed to restore Chaos Rising/Japanese items:", err.message);
  process.exit(1);
}
