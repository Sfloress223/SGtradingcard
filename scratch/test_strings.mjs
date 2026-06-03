async function testStrings() {
  const url = 'https://sgtradingcard.com/assets/index-1MucAWdp.js';
  const res = await fetch(url);
  const code = await res.text();
  
  console.log('Bundle size:', code.length);
  console.log('Contains "View Receipt":', code.includes('View Receipt'));
  console.log('Contains "Packing Slip":', code.includes('Packing Slip'));
  console.log('Contains "Combined":', code.includes('Combined'));
  console.log('Contains "isCombined":', code.includes('isCombined'));
  console.log('Contains "#e0f7fa":', code.includes('#e0f7fa'));
}
testStrings();
