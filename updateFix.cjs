const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// 1. Fix product cards blending in
css = css.replace(
  '.product-card {\\n  display: flex;\\n  flex-direction: column;\\n  cursor: pointer;\\n  height: 100%;\\n  background: #aec3d1;',
  '.product-card {\\n  display: flex;\\n  flex-direction: column;\\n  cursor: pointer;\\n  height: 100%;\\n  background: #ffffff;'
);
css = css.replace(
  '.product-card {\\r\\n  display: flex;\\r\\n  flex-direction: column;\\r\\n  cursor: pointer;\\r\\n  height: 100%;\\r\\n  background: #aec3d1;',
  '.product-card {\\n  display: flex;\\n  flex-direction: column;\\n  cursor: pointer;\\n  height: 100%;\\n  background: #ffffff;'
);

// 2. Fix free shipping to black
css = css.replace(
  '\\/* Promo Banner *\\/\\n.promo-banner {\\n  background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);\\n  background-size: 200% 200%;\\n  animation: gradientShift 10s ease infinite;',
  '/* Promo Banner */\\n.promo-banner {\\n  background: #000000;'
);
css = css.replace(
  /.*Promo Banner.*[\s\S]*?\.promo-banner\s*\{[\s\S]*?background:\s*linear-gradient[\s\S]*?animation:[\s\S]*?\}/,
  '/* Promo Banner */\n.promo-banner {\n  background: #000000;'
);

// 3. Fix the site header (top banner) to darker blue
css = css.replace(
  '  background: rgba(255, 255, 255, 0.85);\\n  backdrop-filter: blur(16px);\\n  -webkit-backdrop-filter: blur(16px);',
  '  background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);\\n  color: white;\\n  border-bottom: 2px solid #ffd700;'
);
css = css.replace(
  /background:\s*rgba\(255,\s*255,\s*255,\s*0\.85\);\s*backdrop-filter:\s*blur\(16px\);\s*-webkit-backdrop-filter:\s*blur\(16px\);/g,
  'background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);\n  color: white;\n  border-bottom: 2px solid #ffd700;'
);

// Also need to make sure the header links are white instead of var(--text-light) if it\'s dark blue
css = css.replace(
  /color:\s*var\(--text-light\);\s*transition:\s*color\s*0\.2s;([\s\S]*?)\.main-nav\s*a:hover\s*\{\s*color:\s*#000;/g,
  'color: #e2e8f0;\n  transition: color 0.2s;$1.main-nav a:hover {\n  color: #ffd700;'
);
css = css.replace(
  /.cart-icon\s*\{[\s\S]*?color:\s*var\(--text-light\);[\s\S]*?\}\s*\.cart-icon:hover\s*\{\s*color:\s*#000;/g,
  '.cart-icon {\n  font-size: 1.15rem;\n  font-weight: 500;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n  color: #e2e8f0;\n  transition: color 0.2s;\n}\n\n.cart-icon:hover {\n  color: #ffd700;'
);

// 4. Fix catch us live string (story-section)
css = css.replace(
  /background-color:\s*var\(--bg-offwhite\);/g,
  'background-color: transparent;'
);
css = css.replace(
  /background-color:\s*#aec3d1;/g,
  'background-color: transparent;'
);

fs.writeFileSync('src/index.css', css);
console.log('Fixes applied successfully');
