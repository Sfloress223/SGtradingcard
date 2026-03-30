import fs from 'fs';
import https from 'https';
import path from 'path';

const images = [
  { url: 'https://m.media-amazon.com/images/I/71r4c7o7KXL._AC_UF894,1000_QL80_.jpg', dest: 'c:/Projects/SGtradingcard/public/images/charizard-slab.jpg' },
  { url: 'https://m.media-amazon.com/images/I/81E9bH-I0rL._AC_UF894,1000_QL80_.jpg', dest: 'c:/Projects/SGtradingcard/public/images/japanese-box.jpg' },
  { url: 'https://m.media-amazon.com/images/I/71XmC0mZpBL._AC_UF894,1000_QL80_.jpg', dest: 'c:/Projects/SGtradingcard/public/images/chinese-box.jpg' },
  { url: 'https://m.media-amazon.com/images/I/81-0XfIOfjL._AC_UF894,1000_QL80_.jpg', dest: 'c:/Projects/SGtradingcard/public/images/onepiece-box.jpg' }
];

const download = async (url, dest) => {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    });
    if (!response.ok) throw new Error(`HTTP ${response.status} ${response.statusText}`);
    const buffer = await response.arrayBuffer();
    fs.writeFileSync(dest, Buffer.from(buffer));
    console.log(`Downloaded ${dest} (${Buffer.from(buffer).length} bytes)`);
  } catch (err) {
    console.error(`Failed to download ${url}:`, err);
  }
};

async function run() {
  for (const img of images) {
    await download(img.url, img.dest);
  }
}

run();
