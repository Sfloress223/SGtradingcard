const fs = require('fs');
let code = fs.readFileSync('c:/Projects/SGtradingcard/src/data.js', 'utf8');
const idsToRemove = [701, 702, 801, 802, 901, 902, 1001, 1002, 413, 415, 416, 1106];
for (let id of idsToRemove) {
  const regex = new RegExp(`\\{\\s*"id": ${id},[\\s\\S]*?\\},?`, 'g');
  code = code.replace(regex, '');
}
// Also remove extra blank lines and fix trailing commas
code = code.replace(/,\s*\]/, '\n]');
fs.writeFileSync('c:/Projects/SGtradingcard/src/data.js', code);
console.log('Cleaned placeholders');
