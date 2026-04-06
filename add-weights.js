import fs from 'fs';
import { SETS, PRODUCTS } from './src/data.js';

function getWeight(title) {
  let t = title.toLowerCase();
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
  if (t.includes('booster pack')) return '1 oz';
  if (t.includes('blister')) return '3 oz';
  if (t.includes('knock out collection')) return '5 oz';
  if (t.includes('tin')) return '0.8 lb'; // catch all bigger tins
  return '1 lb'; // safety fallback
}

PRODUCTS.forEach(p => {
  p.shippingWeight = getWeight(p.title);
});

let newFileContents = `export const SETS = ${JSON.stringify(SETS, null, 2).replace(/"([a-zA-Z0-9_]+)":/g, '$1:')};\n\nexport const PRODUCTS = ${JSON.stringify(PRODUCTS, null, 2).replace(/"([a-zA-Z0-9_]+)":/g, '$1:')};\n`;

fs.writeFileSync('./src/data.js', newFileContents);
console.log('Successfully injected accurate shipping weights to all products!');
