const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

css = css.replace('--bg-white: #ffffff;', '--bg-white: #f4f7f9;');
css = css.replace('--bg-offwhite: #f9f9f9;', '--bg-offwhite: #e9eef3;');

css = css.replace(
  'background: linear-gradient(to bottom, #f0f4f8, #ffffff);',
  'background: #f4f7f9;'
);

css = css.replace(
  'background-color: #f0f4f8;',
  'background-color: var(--bg-white);'
);

fs.writeFileSync('src/index.css', css);
console.log('Variables updated successfully');
