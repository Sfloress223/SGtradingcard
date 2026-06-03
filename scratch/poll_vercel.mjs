async function pollRender() {
  const baseUrl = 'https://sgtradingcard.com';
  console.log(`Polling ${baseUrl} for the new bundle "index-D_oqUtmT.js" (contains updated Tax & Shipping dynamic calculations)...`);
  
  for (let attempt = 1; attempt <= 15; attempt++) {
    try {
      const res = await fetch(baseUrl, { cache: 'no-store' });
      const html = await res.text();
      
      const isNew = html.includes('index-D_oqUtmT.js');
      console.log(`Attempt ${attempt}: New Deployment Active: ${isNew}`);
      
      if (isNew) {
        console.log('🎉 SUCCESS! The new deployment is now active on Render!');
        return;
      }
    } catch (err) {
      console.log(`Attempt ${attempt} Error:`, err.message);
    }
    
    // Wait 10 seconds before next attempt
    await new Promise(resolve => setTimeout(resolve, 10000));
  }
  
  console.log('❌ Polling timed out. The Render deployment is still in progress or queued.');
}

pollRender();
