const https = require('https');
https.get('https://www.sgtradingcard.com/', res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const jsMatches = data.match(/src="\/assets\/index-[^"]+\.js"/g);
    if (jsMatches) {
      console.log('Found JS bundles:', jsMatches);
      jsMatches.forEach(match => {
        const url = 'https://www.sgtradingcard.com' + match.split('"')[1];
        https.get(url, jsRes => {
          let jsData = '';
          jsRes.on('data', chunk => jsData += chunk);
          jsRes.on('end', () => {
            console.log(url, 'contains 🛒:', jsData.includes('🛒'));
            console.log(url, 'contains #16a34a:', jsData.includes('#16a34a'));
            console.log(url, 'contains mobile-header-right:', jsData.includes('mobile-header-right'));
          });
        });
      });
    } else {
      console.log('No JS bundles found');
    }
  });
}).on('error', err => console.error(err));
