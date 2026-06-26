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

const SET_METADATA = {
  '151': {
    name: "Scarlet & Violet—151",
    theme: "Team up with Bulbasaur, Charmander, and Squirtle, and witness a brand-new dawn in Kanto! Discover the extraordinary Venusaur ex, Charizard ex, and Blastoise ex, and explore a reinvigorated land to find the elusive Mew ex.",
    promo: "featuring Snorlax"
  },
  'surging-sparks': {
    name: "Scarlet & Violet—Surging Sparks",
    theme: "Terawatts of electricity crash down from the sky in a tropical paradise, setting the stage for the supercharged Pikachu ex! Currents crackle and dragons roar with the power of a Stellar Tera Pokémon ex.",
    promo: "featuring Magneton"
  },
  'prismatic': {
    name: "Scarlet & Violet—Prismatic Evolutions",
    theme: "Explore the colorful world of Eevee and its many Evolutions! Discover stellar new Tera Pokémon ex and search for rare special illustration cards featuring your favorite Eeveelutions.",
    promo: "featuring Eevee"
  },
  'journey-together': {
    name: "Scarlet & Violet—Journey Together",
    theme: "Embark on a new journey together with partner Pokémon from Paldea and beyond! Explore new strategies and capture the excitement of a new day.",
    promo: "featuring Latias"
  },
  'mega-evolution': {
    name: "Mega Evolution",
    theme: "Reintroduce the legendary power of Mega Evolution to the Pokémon TCG! Evolve your favorite Pokémon into powerhouse Mega Evolution ex cards and dominate the arena.",
    promo: "featuring Mega Audino ex"
  },
  'phantasmal-flames': {
    name: "Mega Evolution—Phantasmal Flames",
    theme: "As the darkness gathers and the flames arise, Mega Charizard X ex and Mega Gengar ex emerge to set the night ablaze! Harness the power of Fire and Darkness-type Mega Evolution ex cards.",
    promo: "featuring Mega Gengar ex"
  },
  'ascended-heroes': {
    name: "Mega Evolution—Ascended Heroes",
    theme: "Celebrate the return of Mega Evolution with Trainer's Pokémon and Stellar Tera Pokémon ex! Incorporating cards from the Japanese MEGA Dream ex subset.",
    promo: "featuring Larry's Mega Altaria ex"
  },
  'bw-era': {
    name: "Scarlet & Violet—Black Bolt & White Flare",
    theme: "Unleash the legendary power of the Unova region with Reshiram and Zekrom! Harness the black lightning and white fire in this epic subset.",
    promo: "featuring Zekrom"
  },
  'perfect-order': {
    name: "Mega Evolution—Perfect Order",
    theme: "Enter the world of Pokémon Legends: Z-A and Lumiose City! Harness the perfect balance of Mega Zygarde ex and other Mega Evolution Pokémon ex.",
    promo: "featuring Mega Skarmory ex"
  },
  'chaos-rising': {
    name: "Mega Evolution—Chaos Rising",
    theme: "Lumiose City is thrown into havoc by the appearance of Mega Floette ex! Mega Greninja ex leads the charge in this expansion featuring the high-risk 'Unstable Evolution' coin-flip mechanic.",
    promo: "featuring Mega Greninja ex"
  }
};

const SPECIFIC_OVERRIDES = {
  403: "The ultimate collection for fans of the flame! This factory-sealed Ultra-Premium Collection is centered on Mega Charizard X ex. Includes 16 booster packs from various expansions, 1 metal promo card featuring Mega Charizard X ex, premium play accessories (such as metal damage counter dice and condition markers), and exclusive full-art foil promo cards.",
  603: "The Pokémon TCG: Archaludon ex Box features the metal-type Alloy Pokémon Archaludon. This collection contains 1 foil promo card featuring Archaludon ex, 1 foil card featuring Duraludon, 1 oversize foil card featuring Archaludon ex, 4 Pokémon TCG booster packs, and a code card for Pokémon TCG Live.",
  604: "The Pokémon TCG: Reshiram ex Box features the legendary Vast White Pokémon Reshiram. This collection contains 1 foil promo card featuring Reshiram ex, 1 foil promo card featuring Reshiram, 1 oversize foil card featuring Reshiram ex, 4 Pokémon TCG booster packs, and a code card for Pokémon TCG Live.",
  605: "The Pokémon TCG: Tapu Koko ex Battle Deck is a ready-to-play 60-card deck led by Tapu Koko ex. The box includes 1 preconstructed 60-card deck, 3 reference cards, 1 rules booklet, 1 single-player playmat, 1 set of damage counters, 1 large metallic coin, 1 deck box, 1 strategy sheet, and a code card for Pokémon TCG Live.",
  606: "The Pokémon TCG: Iron Leaves ex Battle Deck is a ready-to-play 60-card deck led by Iron Leaves ex. The box includes 1 preconstructed 60-card deck, 3 reference cards, 1 rules booklet, 1 single-player playmat, 1 set of damage counters, 1 large metallic coin, 1 deck box, 1 strategy sheet, and a code card for Pokémon TCG Live.",
  607: "The Pokémon TCG: Unova Mini Tin features artwork inspired by the Unova region. Each tin contains 2 Pokémon TCG booster packs, 1 sticker card, and 1 Pokémon art card featuring the art from the tin. Collect and combine all eight unique designs to complete the full illustration puzzle!",
  610: "A special Knock Out Collection box containing 2 official Pokémon TCG booster packs, 1 collector's metallic coin, and 3 foil promo cards featuring classic fan-favorite Pokémon. A perfect addition to any collection!",
  611: "A special Knock Out Collection box containing 2 official Pokémon TCG booster packs, 1 collector's metallic coin, and 3 foil promo cards featuring classic fan-favorite Pokémon. A perfect addition to any collection!",
  612: "Give your collection a boost! The Pokémon TCG: Raikou 2-Pack Blister includes 2 booster packs from recent expansions, 1 special foil promo card featuring Raikou, and a collectible metallic flip coin.",
  613: "A sturdy, collectible metal tin featuring stunning Pokémon artwork. Contains 4 or 5 booster packs and a special foil promo card of the featured Pokémon (Mega Charizard X or Y ex). Perfect for storing cards and adding a premium collectible to your display.",
  614: "The Pokémon TCG: Paldea Adventure Chest includes 6 booster packs, 7 foil promo cards, 1 sticker sheet, 1 mini portfolio to store your cards, 1 squishy toy, and a beautiful collector's chest to store your entire collection.",
  1003: "Add a splash of cuteness to your bag or keys with this adorable Manta Ray plush charm! Crafted from ultra-soft fabric with high-quality embroidery, this licensed pocket-sized plush is perfect for collectors and fans of cute marine life.",
  1005: "The Re-Ment Pokémon Terrarium Collection features beloved Pokémon displayed within a clear, Poké Ball-shaped terrarium container. Renowned for their meticulous attention to detail, these high-quality pre-painted miniatures capture enchanting Pokémon moments. Sold in a blind box format, each package contains one randomly selected design along with its Poké Ball display case.",
  1328: "The Pokémon TCG: Mega Latias ex Box includes 1 foil promo card featuring Mega Latias ex, 1 foil card featuring Latias, 1 oversize foil card featuring Mega Latias ex, 4 Pokémon TCG booster packs, and a code card for Pokémon TCG Live."
};

const getEnrichedDescription = (title, currentDesc, setId, id) => {
  let t = (title || "").toLowerCase();
  
  if (SPECIFIC_OVERRIDES[id]) {
    return SPECIFIC_OVERRIDES[id];
  }
  
  let setMeta = SET_METADATA[setId];
  
  if (!setMeta) {
    if (t.includes('temporal forces')) {
      setMeta = {
        name: "Scarlet & Violet—Temporal Forces",
        theme: "An epic clash of Ancient and Future Pokémon, bringing the return of ACE SPEC cards to the battlefield!",
        promo: "featuring either Walking Wake or Iron Leaves"
      };
    } else if (t.includes('twilight masquerade')) {
      setMeta = {
        name: "Scarlet & Violet—Twilight Masquerade",
        theme: "Welcome to the land of Kitakami, where people and Pokémon live in harmony with nature. Uncover the mystery of the masked Legendary Pokémon Ogerpon ex!",
        promo: "featuring Teal Mask Ogerpon"
      };
    } else if (t.includes('destined rival')) {
      setMeta = {
        name: "Scarlet & Violet—Destined Rivals",
        theme: "Trainers, be on high alert! Team Rocket returns with over 80 cards related to the group. Cynthia, Steven, Ethan, and other legendary trainers join the clash.",
        promo: "featuring Cynthia's Garchomp ex"
      };
    } else if (setId === 'japanese' || t.includes('japanese')) {
      if (t.includes('mega brave')) {
        setMeta = {
          name: "Mega Brave",
          theme: "Unleash the power of Mega Evolution in this inaugural Japanese Mega expansion (released August 2025) featuring new Mega Evolution Pokémon ex and beautiful Art Rare collectibles."
        };
      } else if (t.includes('mega symphonia')) {
        setMeta = {
          name: "Mega Symphonia",
          theme: "Released alongside Mega Brave in August 2025, this expansion reintroduces Mega Evolution to the Japanese TCG with a focus on musical and artistic theme elements."
        };
      } else if (t.includes('inferno x')) {
        setMeta = {
          name: "Inferno X",
          theme: "Ignite your collection with powerful Fire-type ex cards, holographic Rares, and elusive Secret Rares in this factory-sealed Japanese import pack."
        };
      } else if (t.includes('nihil zero')) {
        setMeta = {
          name: "Nihil Zero (Munikisu Zero)",
          theme: "Based on Pokémon Legends: Z-A and released in Japan in January 2026, this set features Mega Zygarde ex, ancient Pokémon, and a unique raw art style."
        };
      }
    }
  }

  if (setMeta) {
    if (t.includes('elite trainer box') || t.includes('etb')) {
      const promoText = setMeta.promo ? `\n• 1 full-art foil promo card ${setMeta.promo}` : "";
      return `The Pokémon TCG: ${setMeta.name} Elite Trainer Box includes:
• 9 Pokémon TCG: ${setMeta.name} booster packs${promoText}
• 65 card sleeves featuring set artwork
• 45 Pokémon TCG Energy cards
• A player’s guide to the ${setMeta.name} expansion
• 6 damage-counter dice
• 1 competition-legal coin-flip die
• 2 plastic condition markers
• A collector’s box to hold everything, with 4 dividers to keep it organized
• A code card for Pokémon Trading Card Game Live`;
    }
    
    if (t.includes('booster box')) {
      return `${setMeta.theme}\n\nStart your adventure in the ${setMeta.name} expansion with a full display box! Contains 36 Pokémon TCG: ${setMeta.name} booster packs. Each pack contains 10 cards and 1 Basic Energy.`;
    }
    
    if (t.includes('booster bundle')) {
      return `Get a quick boost to your collection with this official Pokémon TCG: ${setMeta.name} Booster Bundle. Contains 6 booster packs from the ${setMeta.name} expansion, offering a great way to hunt for the top chase cards without any extra accessories.`;
    }
    
    if (t.includes('sleeved booster pack') || t.includes('booster pack') || t.includes('pack')) {
      if (setId === 'japanese' || t.includes('japanese')) {
        return `The Japanese ${setMeta.name} booster pack contains 5 random cards. ${setMeta.theme}`;
      }
      return `${setMeta.theme}\n\nExpand your collection with this authentic sleeved booster pack from the Pokémon TCG: ${setMeta.name} expansion. Each pack contains 10 cards and 1 Basic Energy.`;
    }
    
    if (t.includes('blister')) {
      return `Give your collection a boost! The Pokémon TCG: ${setMeta.name} 3-Pack Blister includes 3 booster packs from the expansion, 1 special foil promo card, and a collectible metallic flip coin.`;
    }
    
    if (t.includes('mini tin') || t.includes('tin')) {
      return `A collectible metal tin featuring stunning artwork from the ${setMeta.name} expansion. Inside, you will find 2 Pokémon TCG: ${setMeta.name} booster packs, 1 sticker card, and 1 Pokémon art card featuring the art from the tin.`;
    }
  }

  // Fallback
  return currentDesc;
};

// Update products
const updatedProducts = products.map(p => {
  return {
    ...p,
    description: getEnrichedDescription(p.title, p.description, p.setId, p.id)
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
