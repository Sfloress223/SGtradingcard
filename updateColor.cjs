const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

css = css.replace('--bg-white: #f4f7f9;', '--bg-white: #aec3d1;');
css = css.replace('background: #f4f7f9;', 'background: #aec3d1;');

fs.writeFileSync('src/index.css', css);
console.log('Color updated to #aec3d1');
