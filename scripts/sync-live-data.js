const fs = require('fs');
const path = require('path');

async function pullLiveData() {
  console.log('🔄 Pulling live data to prevent overriding admin changes...');
  try {
    const res = await fetch('https://sgtradingcard.onrender.com/api/products');
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      fs.writeFileSync(path.join(__dirname, '..', 'data', 'products.json'), JSON.stringify(data, null, 2));
      console.log('✅ Successfully backed up ' + data.length + ' live products to local data/products.json!');
    }
  } catch (err) {
    console.error('❌ Failed to pull live data:', err.message);
    process.exit(1);
  }
}

pullLiveData();
