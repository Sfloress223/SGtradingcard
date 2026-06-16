import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const backupPath = path.join(__dirname, '../data_backup/products.json');
const livePath = path.join(__dirname, '../data/products.json');
const srcPath = path.join(__dirname, '../src/data.js');

if (!fs.existsSync(backupPath)) {
  console.error("Backup file not found!");
  process.exit(1);
}

const products = JSON.parse(fs.readFileSync(backupPath, 'utf8'));

const getEnrichedDescription = (title, currentDesc) => {
  let t = (title || "").toLowerCase();
  let desc = (currentDesc || "").trim();

  // If description is already very detailed (longer than 120 chars), we keep it
  if (desc.length > 120) {
    return desc;
  }

  // 1. Mystery Graded Cards
  if (t.includes('mystery graded card') || (t.includes('mystery') && t.includes('graded'))) {
    return "Expand your collection with a premium, officially certified and graded Pokémon card. Every slab is preserved in an archival-grade protective shell, rated in Mint condition (PSA 10 / CGC Gem Mint). Ideal for investment, long-term preservation, and display in any serious collector's gallery. Card selection is random and features top fan-favorites from modern and vintage sets.";
  }

  // 2. Elite Trainer Box / ETB
  if (t.includes('elite trainer box') || t.includes('etb')) {
    return "The ultimate package for collectors, players, and trainers. This official Pokémon TCG Elite Trainer Box contains 9 booster packs, 1 full-art foil promo card, 65 premium card sleeves featuring set artwork, 45 Energy cards, 6 damage-counter dice, 1 competition-legal coin-flip die, condition markers, a player's guide, and a sturdy collector's box with dividers to keep your cards organized.";
  }

  // 3. Booster Box
  if (t.includes('booster box')) {
    return "Launch your deck building or booster opening experience to the next level with a full factory-sealed booster box. Contains 36 booster packs, each loaded with 10 cards and a basic Energy or VSTAR marker. Hunt for the most coveted Secret Rares, Special Illustration Rares, and Gold cards from the expansion in this complete box.";
  }

  // 4. Booster Bundle
  if (t.includes('booster bundle')) {
    return "Get a quick boost to your collection with this official Pokémon TCG Booster Bundle. Contains 6 booster packs from the set, offering a great way to hunt for the top chase cards, rare holos, and special illustration cards without any extra filler accessories.";
  }

  // 5. Booster Pack
  if (t.includes('booster pack') || t.includes('single booster') || t.includes('pack')) {
    return "Expand your collection with this authentic Pokémon TCG booster pack. Each pack contains 10 cards and 1 Basic Energy. Look for rare Holo Rares, Ultra Rares, and Special Illustration Rares. Perfect for players and collectors alike!";
  }

  // 6. Mini Tin / Tin
  if (t.includes('mini tin')) {
    return "A collectible tin that is perfect for carrying your favorite cards on the go! This official Pokémon TCG Mini Tin contains 2 booster packs, 1 metallic Pokémon coin, and a special art card showing the artwork from the tin. Collect all designs in the series to complete the full artwork puzzle!";
  }
  if (t.includes('tin')) {
    return "A sturdy, collectible metal tin featuring stunning Pokémon artwork. Contains 4 or 5 booster packs and a special foil promo card of the featured Pokémon. Perfect for storing cards and adding a premium collectible to your display shelf.";
  }

  // 7. ex Battle Deck
  if (t.includes('battle deck')) {
    return "A ready-to-play 60-card deck featuring a powerful ex Pokémon. This deck is built for beginners and experienced players alike to learn strategies. Includes damage counters, a playmat, a deck box, a strategy guide, and a quick-start guide to get you playing right out of the box.";
  }

  // 8. Knock Out Collection
  if (t.includes('knock out collection')) {
    return "A special Knock Out Collection box containing 2 official Pokémon TCG booster packs, 1 collector's metallic coin, and 3 foil promo cards featuring classic fan-favorite Pokémon. A perfect addition to any collection or gift for new collectors!";
  }

  // 9. Adventure Chest / Chest
  if (t.includes('adventure chest') || t.includes('chest')) {
    return "Uncover a treasure trove of Pokémon goodies with the Adventure Chest. Contains 6 booster packs, 7 foil promo cards, 1 sticker sheet, 1 mini portfolio to store your cards, 1 squishy toy, and a beautiful collector's chest to store your entire collection.";
  }

  // 10. Blister Pack / Blister
  if (t.includes('blister')) {
    return "An official Pokémon TCG blister pack. Contains 2 or 3 booster packs, a collectible metallic flip coin, and a special foil promo card. Great for adding specific promo cards to your collection while boosting your card pool.";
  }

  // 11. Poster Collection
  if (t.includes('poster collection')) {
    return "Celebrate the expansion with this special Poster Collection! Includes 3 foil promo cards, 3 Pokémon TCG booster packs, 1 large double-sided poster featuring gorgeous set artwork, and a code card for Pokémon TCG Live.";
  }

  // 12. Surprise Box
  if (t.includes('surprise box')) {
    return "Open up a world of fun with this special Surprise Box! Contains 4 booster packs, 1 premium foil promo card, and additional deck accessories. A perfect gift for any Pokémon fan looking for a fun opening experience.";
  }

  // Generic fallback if description is empty or too brief
  if (desc.length < 20) {
    return `Authentic, official product from the ${title.includes('Scarlet & Violet') ? 'Scarlet & Violet' : 'Pokémon TCG'} collection. Perfect for expanding your card pool, building decks, or adding to your sealed collection. Factory sealed and guaranteed 100% genuine.`;
  }

  return desc;
};

// Update products
const updatedProducts = products.map(p => {
  return {
    ...p,
    description: getEnrichedDescription(p.title, p.description)
  };
});

// Write JSON files
fs.writeFileSync(backupPath, JSON.stringify(updatedProducts, null, 2));
fs.writeFileSync(livePath, JSON.stringify(updatedProducts, null, 2));
console.log("✅ Updated JSON database files!");

// Update src/data.js
const srcContent = fs.readFileSync(srcPath, 'utf8');
const splitMarker = 'export const PRODUCTS = [';
const parts = srcContent.split(splitMarker);
if (parts.length === 2) {
  // Format the products array as valid JS matching the original file formatting
  const formattedProducts = JSON.stringify(updatedProducts, null, 2);
  const newSrcContent = parts[0] + splitMarker + '\n' + formattedProducts.substring(1) + ';\n';
  fs.writeFileSync(srcPath, newSrcContent);
  console.log("✅ Updated src/data.js fallback array!");
} else {
  console.error("⚠️ Failed to parse src/data.js split marker!");
}
