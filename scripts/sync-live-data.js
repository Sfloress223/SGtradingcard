import fs from 'fs';
import path from 'path';

async function pullLiveData() {
  console.log('🔄 Pulling live data to prevent overriding admin changes...');
  try {
    const res = await fetch('https://sgtradingcard.onrender.com/api/products');
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      // Using simple relative path since it runs from project root via npm scripts
      fs.writeFileSync('./data/products.json', JSON.stringify(data, null, 2));
      console.log('✅ Successfully backed up ' + data.length + ' live products to local data/products.json!');
    }
  } catch (err) {
    console.error('❌ Failed to pull live data:', err.message);
    process.exit(1);
  }
}

pullLiveData();
