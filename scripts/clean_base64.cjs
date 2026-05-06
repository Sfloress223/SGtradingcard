const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const productsFile = path.join(__dirname, '..', 'data', 'products.json');
const uploadDir = path.join(__dirname, '..', 'public', 'images', 'uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

let products = JSON.parse(fs.readFileSync(productsFile, 'utf8'));
let convertedCount = 0;

function processBase64(base64Str) {
  if (!base64Str || !base64Str.startsWith('data:image')) return base64Str;
  
  const matches = base64Str.match(/^data:image\/([a-zA-Z0-9]+);base64,(.+)$/);
  if (!matches) return base64Str;
  
  const ext = matches[1] === 'jpeg' ? 'jpg' : matches[1];
  const data = matches[2];
  const buffer = Buffer.from(data, 'base64');
  
  // Create unique filename based on hash
  const hash = crypto.createHash('md5').update(data).digest('hex').substring(0, 10);
  const filename = `img_${hash}.${ext}`;
  const filepath = path.join(uploadDir, filename);
  
  // Only write if it doesn't exist to save IO
  if (!fs.existsSync(filepath)) {
    fs.writeFileSync(filepath, buffer);
  }
  
  convertedCount++;
  return `/images/uploads/${filename}`;
}

products = products.map(p => {
  if (p.imgUrl) {
    p.imgUrl = processBase64(p.imgUrl);
  }
  if (p.gallery) {
    p.gallery = p.gallery.map(img => {
      if (img.url) img.url = processBase64(img.url);
      if (img.base64) img.base64 = processBase64(img.base64); // some logic saves base64 field
      return img;
    });
  }
  if (p.galleryUrls) {
    p.galleryUrls = p.galleryUrls.map(url => processBase64(url));
  }
  return p;
});

if (convertedCount > 0) {
  fs.writeFileSync(productsFile, JSON.stringify(products, null, 2), 'utf8');
  console.log(`Successfully converted ${convertedCount} base64 strings to real images!`);
} else {
  console.log('No base64 images found.');
}
