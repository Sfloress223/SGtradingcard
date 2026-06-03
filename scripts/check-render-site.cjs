const https = require('https');
https.get('https://sgtradingcard.onrender.com/', res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const jsMatches = data.match(/src="\/assets\/index-[^"]+\.js"/g);
    console.log('Render JS bundles:', jsMatches);
  });
}).on('error', err => console.error(err));
