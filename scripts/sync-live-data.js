import fs from 'fs';
import path from 'path';

async function pullLiveData() {
  console.log('🔄 Pulling live data to prevent overriding admin changes...');
  try {
    const res = await fetch('https://sgtradingcard.onrender.com/api/internal/export-data?key=sg_backup_777');
    const contentType = res.headers.get("content-type");
    if (!res.ok || !contentType || !contentType.includes("application/json")) {
      console.warn('⚠️ Server export endpoint not available. Falling back to public products only...');
      const fallbackRes = await fetch('https://sgtradingcard.onrender.com/api/products');
      const fallbackData = await fallbackRes.json();
      if (Array.isArray(fallbackData) && fallbackData.length > 0) {
        fs.writeFileSync('./data/products.json', JSON.stringify(fallbackData, null, 2));
        console.log('✅ Fallback: Backed up products.json only!');
      }
      return;
    }

    const data = await res.json();
    
    if (data.products && Array.isArray(data.products)) {
      fs.writeFileSync('./data/products.json', JSON.stringify(data.products, null, 2));
      console.log(`✅ Backed up ${data.products.length} products!`);
    }
    
    if (data.users && Array.isArray(data.users)) {
      fs.writeFileSync('./data/users.json', JSON.stringify(data.users, null, 2));
      console.log(`✅ Backed up ${data.users.length} users!`);
    }
    
    if (data.orders && Array.isArray(data.orders)) {
      fs.writeFileSync('./data/orders.json', JSON.stringify(data.orders, null, 2));
      console.log(`✅ Backed up ${data.orders.length} orders!`);
    }
    
    if (data.sets && Array.isArray(data.sets)) {
      fs.writeFileSync('./data/sets.json', JSON.stringify(data.sets, null, 2));
      console.log(`✅ Backed up ${data.sets.length} sets!`);
    }
    
    console.log('🎉 Comprehensive data backup complete!');
  } catch (err) {
    console.error('❌ Failed to pull live data:', err.message);
    process.exit(1);
  }
}

pullLiveData();
