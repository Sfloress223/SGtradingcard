const fs = require('fs');

let css = fs.readFileSync('src/index.css', 'utf8');

// 1. Root & Body Background
css = css.replace('--bg-white: #ffffff;', '--bg-white: #aec3d1;');
css = css.replace('--bg-offwhite: #f9f9f9;', '--bg-offwhite: #aec3d1;');
css = css.replace('body {\\n  background-color: var(--bg-white);', 'body {\\n  background-color: #aec3d1;');

// 2. Promo Banner to Black
css = css.replace(
  '/* Promo Banner */\\n.promo-banner {\\n  background-color: #111;\\n  color: #fff;\\n  text-align: center;\\n  padding: 8px 15px;\\n  font-size: 0.85rem;\\n  letter-spacing: 0.5px;\\n}',
  '/* Promo Banner */\\n.promo-banner {\\n  background-color: #000000;\\n  color: #fff;\\n  text-align: center;\\n  padding: 10px 15px;\\n  font-size: 0.9rem;\\n  letter-spacing: 1px;\\n  font-weight: bold;\\n}'
);
css = css.replace(
  /.*Promo Banner.*[\s\S]*?\.promo-banner\s*\{[\s\S]*?\}/,
  '/* Promo Banner */\n.promo-banner {\n  background-color: #000000;\n  color: #fff;\n  text-align: center;\n  padding: 10px 15px;\n  font-size: 0.9rem;\n  letter-spacing: 1px;\n  font-weight: bold;\n}'
);

// 3. Site Header to Darker Blue
css = css.replace(
  /.*Header.*[\s\S]*?\.site-header\s*\{[\s\S]*?z-index: 100;\r?\n\}/,
  '/* Header */\n.site-header {\n  border-bottom: 2px solid #ffd700;\n  padding: 1.5rem 5%;\n  position: sticky;\n  top: 0;\n  background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);\n  z-index: 100;\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);\n}'
);
// Make the nav text white now that it's on a dark background
css = css.replace(/color:\s*var\(--text-light\);\s*transition:\s*color\s*0\.2s;([\s\S]*?)\.main-nav\s*a:hover\s*\{\s*color:\s*#000;/g, 'color: #e2e8f0;\n  transition: color 0.2s;$1.main-nav a:hover {\n  color: #ffd700;');
css = css.replace(/\.cart-icon\s*\{[\s\S]*?color:\s*var\(--text-light\);[\s\S]*?\}\s*\.cart-icon:hover\s*\{\s*color:\s*#000;/g, '.cart-icon {\n  font-size: 1.15rem;\n  font-weight: 500;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n  color: #e2e8f0;\n  transition: color 0.2s;\n}\n\n.cart-icon:hover {\n  color: #ffd700;');

// 4. Story Section ('Live on TikTok') transparent
css = css.replace(
  /\.story-section\s*\{[\s\S]*?background-color:\s*var\(--bg-offwhite\);/g,
  '.story-section {\n  text-align: center;\n  background-color: transparent;'
);

// 5. Restore full-bleed GE Wrapper logic
css = css.replace(
  '/* ─── Grand Exchange Restyle ─── */\\n',
  '/* ─── Grand Exchange Restyle ─── */\\n\\n.ge-page-wrapper {\\n  background: #aec3d1;\\n  min-height: calc(100vh - 80px);\\n  padding-bottom: 4rem;\\n}\\n'
);
css = css.replace(
  '/* ─── Grand Exchange Restyle ─── */\r\n',
  '/* ─── Grand Exchange Restyle ─── */\r\n\r\n.ge-page-wrapper {\r\n  background: #aec3d1;\r\n  min-height: calc(100vh - 80px);\r\n  padding-bottom: 4rem;\r\n}\r\n'
);
css = css.replace(
  /\.ge-hero-container\s*\{[\s\S]*?border-radius:\s*12px;[\s\S]*?margin-bottom:\s*2\.5rem;/g,
  '.ge-hero-container {\n  background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);\n  background-size: 200% 200%;\n  animation: gradientShift 10s ease infinite;\n  padding: 4rem 10%;\n  color: white;\n  box-shadow: 0 10px 30px rgba(0,0,0,0.12);\n  margin-bottom: 3rem;'
);

// 6. Explicitly ensure PRODUCT CARDS and SET CARDS are white so they never blend in!
// Currently they are 'background: white;' or un-set (relying on body). Let's force them to be white boxes explicitly with shadows.
css = css.replace(
  /\.product-card\s*\{[\s\S]*?cursor:\s*pointer;/g,
  '.product-card {\n  display: flex;\n  flex-direction: column;\n  cursor: pointer;\n  background: #ffffff;\n  border-radius: 12px;\n  box-shadow: 0 4px 15px rgba(0,0,0,0.05);\n  padding: 1rem;\n  transition: transform 0.2s ease, box-shadow 0.2s ease;'
);
css = css.replace(
  /\.set-card\s*\{[\s\S]*?background-color:\s*white;?/g,
  '.set-card {\n  background: #ffffff;\n  border-radius: 12px;\n  box-shadow: 0 4px 15px rgba(0,0,0,0.06);'
);
css = css.replace(
  /\.set-card\s*\{[\s\S]*?background:\s*white;?/g,
  '.set-card {\n  background: #ffffff;\n  border-radius: 12px;\n  box-shadow: 0 4px 15px rgba(0,0,0,0.06);'
);

// 7. Clear out white sections (fillBlue equivalent, but much safer targeting specific blocks)
// Example: .cart-sidebar, form cards, modal overlays
css = css.replace(/\.cart-sidebar\s*\{([\s\S]*?)background-color:\s*white;?/g, '.cart-sidebar {$1background-color: #aec3d1;');
css = css.replace(/\.cart-sidebar\s*\{([\s\S]*?)background:\s*white;?/g, '.cart-sidebar {$1background: #aec3d1;');
css = css.replace(/\.checkout-card\s*\{([\s\S]*?)background-color:\s*white;?/g, '.checkout-card {$1background-color: #aec3d1;');
css = css.replace(/\.checkout-card\s*\{([\s\S]*?)background:\s*white;?/g, '.checkout-card {$1background: #aec3d1;');
css = css.replace(/\.admin-login-card\s*\{([\s\S]*?)background:\s*white;?/g, '.admin-login-card {$1background: #aec3d1;');
css = css.replace(/\.admin-form-card\s*\{([\s\S]*?)background:\s*white;?/g, '.admin-form-card {$1background: #aec3d1;');
css = css.replace(/\.admin-table-wrap\s*\{([\s\S]*?)background:\s*white;?/g, '.admin-table-wrap {$1background: #aec3d1;');
css = css.replace(/\.admin-modal\s*\{([\s\S]*?)background:\s*white;?/g, '.admin-modal {$1background: #aec3d1;');

// Set Admin/auth wrappers background to #aec3d1
css = css.replace(/\.auth-container\s*\{([\s\S]*?)background:\s*var\(--bg-offwhite\);/g, '.auth-container {$1background: transparent;');
css = css.replace(/\.admin-container\s*\{([\s\S]*?)background:\s*var\(--bg-offwhite\);/g, '.admin-container {$1background: transparent;');
css = css.replace(/\.dashboard-container\s*\{([\s\S]*?)background:\s*var\(--bg-offwhite\);/g, '.dashboard-container {$1background: transparent;');

// Clean any remaining #fff or white on generic divs by targeting specific ones if needed, but the variables fixed 90% of it.
fs.writeFileSync('src/index.css', css);
console.log('Final unified styling applied');
