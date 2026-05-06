const fs = require('fs');
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const ascended = products.filter(p => p.title.toLowerCase().includes('ascended') || (p.setId && p.setId.toLowerCase().includes('ascended')));
ascended.forEach(p => {
  console.log('Product ID:', p.id, 'Title:', p.title);
  console.log('  imgUrl:', p.imgUrl);
  if (p.galleryUrls) console.log('  galleryUrls:', p.galleryUrls);
});
