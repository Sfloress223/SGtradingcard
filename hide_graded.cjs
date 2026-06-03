const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'data', 'products.json');
const products = JSON.parse(fs.readFileSync(file, 'utf8'));

let count = 0;
for (let p of products) {
  if (p.title.toLowerCase().match(/psa|cgc|bgs|graded/)) {
    p.hidden = true;
    count++;
  }
}

fs.writeFileSync(file, JSON.stringify(products, null, 2));
console.log(`Hid ${count} graded cards.`);
