const fs = require('fs');

// 1. Update index.css
let css = fs.readFileSync('src/index.css', 'utf8');

// Update Body Background
css = css.replace(
  'body {\r\n  background-color: var(--bg-white);',
  'body {\r\n  background-color: #f0f4f8;'
);
css = css.replace(
  'body {\n  background-color: var(--bg-white);',
  'body {\n  background-color: #f0f4f8;'
);

// Update Promo Banner
css = css.replace(
  /\/\* Promo Banner \*\/\s*\.promo-banner \{[\s\S]*?\}/,
  `/* Promo Banner */\n.promo-banner {\n  background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);\n  background-size: 200% 200%;\n  animation: gradientShift 10s ease infinite;\n  color: #fff;\n  text-align: center;\n  padding: 10px 15px;\n  font-size: 0.9rem;\n  letter-spacing: 1px;\n  font-weight: bold;\n}`
);

// Update Header
css = css.replace(
  /\/\* Header \*\/\s*\.site-header \{[\s\S]*?\}/,
  `/* Header */\n.site-header {\n  border-bottom: 1px solid rgba(255, 255, 255, 0.4);\n  padding: 1.5rem 5%;\n  position: sticky;\n  top: 0;\n  background: rgba(255, 255, 255, 0.85);\n  backdrop-filter: blur(16px);\n  -webkit-backdrop-filter: blur(16px);\n  z-index: 100;\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);\n}`
);

// Update Product Card Styling
css = css.replace(
  /\.product-card \{[\s\S]*?\}/,
  `.product-card {\n  display: flex;\n  flex-direction: column;\n  cursor: pointer;\n  height: 100%;\n  background: #ffffff;\n  border-radius: 12px;\n  box-shadow: 0 4px 15px rgba(0,0,0,0.05);\n  padding: 1rem;\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n}`
);
css = css.replace(
  /\.product-image-container \{[\s\S]*?\}/,
  `.product-image-container {\n  position: relative;\n  aspect-ratio: 4 / 5;\n  background-color: var(--badge-bg);\n  border-radius: 8px;\n  overflow: hidden;\n  margin-bottom: 1rem;\n  width: 100%;\n}`
);

// Update Set Card Styling
css = css.replace(
  /\.set-card \{[\s\S]*?\}/,
  `.set-card {\n  background: white;\n  border: 1px solid var(--border-color);\n  border-radius: 12px;\n  overflow: hidden;\n  transition: all 0.3s ease;\n  cursor: pointer;\n  display: flex;\n  flex-direction: column;\n  box-shadow: 0 4px 15px rgba(0,0,0,0.06);\n  width: 100%;\n}`
);

fs.writeFileSync('src/index.css', css);

// 2. Update App.jsx to remove inline minHeight and padding that breaks full-bleed backgrounds if necessary, but actually we mostly needed the Hero styling.
console.log('Successfully updated CSS');
