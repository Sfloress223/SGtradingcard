const fs = require('fs');

let css = fs.readFileSync('src/index.css', 'utf8');

// First, protect the components that should REMAIN white
const PROTECTED = [
  '.product-card {\\n  display: flex;\\n  flex-direction: column;\\n  cursor: pointer;\\n  height: 100%;\\n  background: #ffffff;',
  '.set-card {\\n  background: white;',
  '.set-logo-container {\\n  height: 260px;\\n  background: white;',
  '.ge-input-field {\\n  width: 100%;\\n  padding: 10px 14px !important;\\n  border: 1px solid #cbd5e0 !important;\\n  border-radius: 6px !important;\\n  background: #fff;',
  'background: rgba(255, 255, 255, 0.85);',
  'background: rgba(255, 255, 255, 0.6) !important;'
];

const TEMPORARY_PLACEHOLDERS = [
  '__PROTECT_PRODUCT__',
  '__PROTECT_SET__',
  '__PROTECT_LOGO__',
  '__PROTECT_INPUT__',
  '__PROTECT_HEADER__',
  '__PROTECT_GLASS__'
];

// Temporarily replace protected string literals with placeholders
for(let i=0; i<PROTECTED.length; i++) {
  css = css.replace(PROTECTED[i], TEMPORARY_PLACEHOLDERS[i]);
}

// Now blindly replace ALL remaining white backgrounds!
css = css.replace(/background:\s*white;?/g, 'background: #aec3d1;');
css = css.replace(/background-color:\s*white;?/g, 'background-color: #aec3d1;');
css = css.replace(/background:\s*#ffffff;?/gi, 'background: #aec3d1;');
css = css.replace(/background:\s*#fff;?/gi, 'background: #aec3d1;');
css = css.replace(/background-color:\s*#ffffff;?/gi, 'background-color: #aec3d1;');
css = css.replace(/background-color:\s*#fff;?/gi, 'background-color: #aec3d1;');
css = css.replace(/background:\s*white\s*!important;?/g, 'background: #aec3d1 !important;');

// Replace offwhite variables
css = css.replace(/--bg-offwhite:\s*#e9eef3;?/g, '--bg-offwhite: #aec3d1;');
css = css.replace(/--bg-offwhite:\s*#f9f9f9;?/g, '--bg-offwhite: #aec3d1;');

// Restore the protected components
for(let i=0; i<PROTECTED.length; i++) {
  css = css.replace(TEMPORARY_PLACEHOLDERS[i], PROTECTED[i]);
}

fs.writeFileSync('src/index.css', css);
console.log('Successfully flooded the layout with #aec3d1 (Product Cards Protected!)');
