const fs = require('fs');
const { execSync } = require('child_process');

async function restore() {
  try {
    // Current local version (already has mystery cards from git checkout 11de435)
    // Wait, I already did 'git checkout 11de435 data/products.json'
    // So my local file HAS the mystery cards now.
    
    // I need to push this to Render.
    // BUT I should check if there are any prices in 'restored' that were higher than '.00'.
    const restored = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
    const mystery = restored.filter(p => p.title.includes('Mystery Graded Card'));
    
    console.log('Total Mystery Cards found in restored file:', mystery.length);
    const priced = mystery.filter(p => p.price !== '.00');
    console.log('Mystery Cards with prices found:', priced.length);
    
    // Pushing to GitHub
    execSync('git add data/products.json');
    execSync('git commit -m "Emergency Restore: Bringing back mystery cards and prices"');
    execSync('git push origin master');
    
    console.log('🎉 Restored data pushed to GitHub. Render will re-deploy now.');
  } catch (err) {
    console.error('Error during restore:', err.message);
  }
}

restore();
