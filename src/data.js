export const SETS = [
  { id: 'graded-cards', name: 'Graded Cards', imgUrl: '/images/charizard.png', bannerUrl: '/images/charizard.png', color: '#FFD700', emoji: '🏆' },
  { id: 'singles', name: 'Singles', imgUrl: '/images/singles.jpg', bannerUrl: '/images/singles.jpg', color: '#4169E1', emoji: '🃏' },
  { id: 'all-pokemon', name: 'English Pokémon', imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pokémon_logo.svg/1200px-International_Pokémon_logo.svg.png', bannerUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pokémon_logo.svg/1200px-International_Pokémon_logo.svg.png', color: '#E3350D', emoji: '📦' },
  { id: 'perfect-order', parent: 'all-pokemon', name: 'Perfect Order', imgUrl: '/images/po-logo.png', bannerUrl: '/images/po-logo.png', color: '#1E90FF' },
  { id: 'phantasmal-flames', parent: 'all-pokemon', name: 'Phantasmal Flames', imgUrl: 'https://d1i787aglh9bmb.cloudfront.net/assets/img/me-expansions/me02/logo/en-us/me02-logo.png', bannerUrl: 'https://d1i787aglh9bmb.cloudfront.net/assets/img/me-expansions/me02/logo/en-us/me02-logo.png', color: '#7B2D8B' },
  { id: 'mega-evolution', parent: 'all-pokemon', name: 'Mega Evolution', imgUrl: 'https://images.pokemontcg.io/me1/symbol.png', bannerUrl: 'https://images.pokemontcg.io/me1/logo.png', color: '#E3350D' },
  { id: 'journey-together', parent: 'all-pokemon', name: 'Journey Together', imgUrl: 'https://images.pokemontcg.io/sv9/symbol.png', bannerUrl: 'https://images.pokemontcg.io/sv9/logo.png', color: '#2E8B57' },
  { id: 'bw-era', parent: 'all-pokemon', name: 'Black & White Era', imgUrl: 'https://d1i787aglh9bmb.cloudfront.net/assets/img/sv-expansions/sv10dot5/logo/en-us/sv10pt5-logo.png', bannerUrl: 'https://d1i787aglh9bmb.cloudfront.net/assets/img/sv-expansions/sv10dot5/logo/en-us/sv10pt5-logo.png', color: '#000000' },
  { id: 'prismatic', parent: 'all-pokemon', name: 'Prismatic Evolutions', imgUrl: 'https://images.pokemontcg.io/sv8pt5/symbol.png', bannerUrl: 'https://images.pokemontcg.io/sv8pt5/logo.png', color: '#ff66c4' },
  { id: 'surging-sparks', parent: 'all-pokemon', name: 'Surging Sparks', imgUrl: 'https://images.pokemontcg.io/sv8/symbol.png', bannerUrl: 'https://images.pokemontcg.io/sv8/logo.png', color: '#E0AA3E' },
  { id: '151', parent: 'all-pokemon', name: 'Scarlet & Violet 151', imgUrl: 'https://images.pokemontcg.io/sv3pt5/symbol.png', bannerUrl: 'https://images.pokemontcg.io/sv3pt5/logo.png', color: '#8A2BE2' },
  { id: 'misc', parent: 'all-pokemon', name: 'Miscellaneous / Collections', imgUrl: 'https://images.pokemontcg.io/sve/symbol.png', bannerUrl: 'https://images.pokemontcg.io/sve/logo.png', color: '#666666', emoji: '📦' },
  { id: 'japanese', name: 'Japanese Pokémon', imgUrl: '/images/japanese-box.png', bannerUrl: '/images/japanese-box.png', color: '#D0112b', emoji: '🇯🇵' },
  { id: 'chinese', name: 'Chinese Pokémon', imgUrl: '/images/chinese-box.png', bannerUrl: '/images/chinese-box.png', color: '#DA251D', emoji: '🇨🇳' },
  { id: 'other-tcg', name: 'Other / Future TCGs', imgUrl: '/images/singles.jpg', bannerUrl: '/images/singles.jpg', color: '#4B0082', emoji: '🎴' },
  { id: 'pokemon-merch', name: 'Pokémon Merchandise & Toys', imgUrl: '/images/merch.svg', bannerUrl: '/images/merch.svg', color: '#FF8C00', emoji: '🧸' }
];

export const PRODUCTS = [
  {
    "id": 101,
    "setId": "surging-sparks",
    "title": "Pokémon TCG: Scarlet & Violet-Surging Sparks Booster Pack",
    "price": "$7.99",
    "soldOut": false,
    "description": "Contains 10 cards from the Surging Sparks expansion. Each pack may include rare holographic, illustration rare, or special art rare cards.",
    "imgUrl": "https://images.squarespace-cdn.com/content/v1/68e06d2a2c7b551478df5338/224a05f2-8828-4f97-9299-1d207332261a/SuzieQ+LOGO+%289%29.png?format=500w"
  },
  {
    "id": 102,
    "setId": "surging-sparks",
    "title": "Pokémon TCG: Surging Sparks Elite Trainer Box",
    "price": "$65.99",
    "soldOut": true,
    "description": "Includes 9 Surging Sparks booster packs, 1 full-art promo card, 65 card sleeves, 45 energy cards, and a player's guide. Great for building competitive decks.",
    "imgUrl": "https://images.squarespace-cdn.com/content/v1/68e06d2a2c7b551478df5338/3f7eaa48-463e-4eb7-848b-6beab5e61491/SuzieQ+LOGO+%2816%29.png?format=500w"
  },
  {
    "id": 201,
    "setId": "151",
    "title": "Pokémon TCG: Scarlet & Violet 151 Booster Pack",
    "price": "$11.99",
    "soldOut": true,
    "description": "Contains 10 cards celebrating the original 151 Kanto Pokémon. Chase the iconic Charizard, Blastoise, and Venusaur illustration rares in this fan-favorite set.",
    "imgUrl": "https://images.squarespace-cdn.com/content/v1/68e06d2a2c7b551478df5338/99353457-f7de-440e-b6ba-da27f7cc9f5a/SuzieQ+LOGO+%286%29.png?format=500w"
  },
  {
    "id": 202,
    "setId": "151",
    "title": "Pokémon TCG: Scarlet & Violet—151 Elite Trainer Box",
    "price": "$165.99",
    "soldOut": true,
    "description": "Includes 11 Scarlet & Violet—151 booster packs, a full-art promo card, 65 card sleeves featuring Poké Ball designs, energy cards, damage counters, and a collector's box.",
    "imgUrl": "https://images.squarespace-cdn.com/content/v1/68e06d2a2c7b551478df5338/b51a206d-68bd-4fe3-bafb-fdf198028551/SuzieQ+LOGO+%285%29.png?format=500w"
  },
  {
    "id": 203,
    "setId": "151",
    "title": "Pokémon TCG: Scarlet & Violet—151 Mini Tin",
    "price": "$21.99",
    "soldOut": true,
    "description": "Compact collector's tin containing 2 Scarlet & Violet—151 booster packs and 1 art card. Each tin features a different original Kanto Pokémon design.",
    "imgUrl": "https://images.squarespace-cdn.com/content/v1/68e06d2a2c7b551478df5338/73b5a3ce-c96c-44e2-9535-6f54feabc5db/SuzieQ+LOGO+%281%29.png?format=500w"
  },
  {
    "id": 301,
    "setId": "prismatic",
    "title": "Pokémon TCG: Scarlet & Violet—Prismatic Evolutions Booster Bundle",
    "price": "$64.99",
    "soldOut": false,
    "description": "Includes 6 Prismatic Evolutions booster packs wrapped in exclusive bundle packaging.",
    "imgUrl": "https://images.squarespace-cdn.com/content/v1/68e06d2a2c7b551478df5338/1786c526-f588-4355-baeb-e42f2756edf4/SuzieQ+LOGO+%2839%29.png?format=500w"
  },
  {
    "id": 302,
    "setId": "prismatic",
    "title": "Pokémon TCG: Scarlet & Violet—Prismatic Evolutions Elite Trainer Box",
    "price": "$69.99",
    "soldOut": true,
    "description": "Contains 9 Prismatic Evolutions booster packs, a special holographic promo card, 65 card sleeves, energy cards, and a premium storage box featuring Eevee artwork.",
    "imgUrl": "https://images.squarespace-cdn.com/content/v1/68e06d2a2c7b551478df5338/cf3a8205-f4d4-4488-897a-e78baf4bc263/SuzieQ+LOGO+%287%29.png?format=500w"
  },
  {
    "id": 303,
    "setId": "prismatic",
    "title": "Pokémon TCG: Scarlet & Violet—Prismatic Evolutions Mini Tin",
    "price": "$14.99",
    "soldOut": true,
    "description": "A pocket-sized collector's tin with 2 Prismatic Evolutions booster packs and 1 art card. Perfect for collecting all Eeveelution designs.",
    "imgUrl": "https://images.squarespace-cdn.com/content/v1/68e06d2a2c7b551478df5338/05afc2f2-41a7-4475-a225-65d0a213e817/SuzieQ+LOGO+%2835%29.png?format=500w"
  },
  {
    "id": 351,
    "setId": "journey-together",
    "title": "Pokémon TCG: Scarlet & Violet-Journey Together Booster Pack",
    "price": "$6.99",
    "soldOut": false,
    "description": "Contains 10 cards from the Journey Together expansion. Features Trainer & Pokémon duo cards and new illustration rares celebrating iconic partnerships.",
    "imgUrl": "https://images.squarespace-cdn.com/content/v1/68e06d2a2c7b551478df5338/f5c77db2-def7-4c5b-b7d6-7e54b86dee44/JT+%282%29.png?format=500w"
  },
  {
    "id": 352,
    "setId": "journey-together",
    "title": "Pokémon TCG: Scarlet & Violet-Journey Together Booster Bundle",
    "price": "$38.99",
    "soldOut": true,
    "description": "Includes 6 Journey Together booster packs in a collectible bundle box. Great value for pulling rare Trainer duo cards.",
    "imgUrl": "https://images.squarespace-cdn.com/content/v1/68e06d2a2c7b551478df5338/0e5d7006-cef4-4105-b64e-3a5b3d8e58a4/SuzieQ+LOGO+%2841%29.png?format=500w"
  },
  {
    "id": 353,
    "setId": "journey-together",
    "title": "Pokémon TCG: Scarlet & Violet 9 Journey Together Elite Trainer Box",
    "price": "$65.99",
    "soldOut": true,
    "description": "Packed with 9 Journey Together booster packs, a full-art promo card, 65 card sleeves, energy cards, dice, and condition markers. Everything you need to play and collect.",
    "imgUrl": "https://images.squarespace-cdn.com/content/v1/68e06d2a2c7b551478df5338/55a7e684-ce92-425d-b893-286e4cae8179/SuzieQ+LOGO+%283%29.png?format=500w"
  },
  {
    "id": 401,
    "setId": "mega-evolution",
    "title": "Pokémon TCG: Mega Evolution Booster Pack",
    "price": "$8.99",
    "soldOut": false,
    "description": "Contains 10 cards from the Mega Evolution expansion. Chance to pull powerful Mega EX cards featuring fan-favorite Pokémon like Charizard, Lucario, and Gardevoir.",
    "imgUrl": "https://images.squarespace-cdn.com/content/v1/68e06d2a2c7b551478df5338/2603873e-f184-4adc-8aa7-94a9c4520bb5/ME+%282%29.png?format=500w"
  },
  {
    "id": 402,
    "setId": "mega-evolution",
    "title": "Pokémon TCG: Mega Evolution Booster Bundle",
    "price": "$38.99",
    "soldOut": true,
    "description": "Includes 6 Mega Evolution booster packs in exclusive bundle packaging. A solid way to start your Mega Evolution collection.",
    "imgUrl": "https://images.squarespace-cdn.com/content/v1/68e06d2a2c7b551478df5338/02df7a19-02a1-4fc3-86ce-88c92fa159a5/SuzieQ+LOGO+%2847%29.png?format=500w"
  },
  {
    "id": 403,
    "setId": "mega-evolution",
    "title": "Pokémon TCG: Mega Charizard X ex Ultra-Premium Collection",
    "price": "$164.99",
    "soldOut": true,
    "description": "The ultimate collector's item! Includes 16 booster packs, a metal Mega Charizard X card, premium accessories, and exclusive full-art promo cards.",
    "imgUrl": "https://images.squarespace-cdn.com/content/v1/68e06d2a2c7b551478df5338/4f78e0b9-dbe4-4d3d-8b06-aba438d6e4e9/SuzieQ+LOGO+%284%29.png?format=500w"
  },
  {
    "id": 405,
    "setId": "mega-evolution",
    "title": "Pokémon TCG: Mega Evolution Elite Trainer Box (Mega Lucario)",
    "price": "$84.99",
    "soldOut": false,
    "description": "Features Mega Lucario artwork. Includes 9 booster packs, a full-art promo card.",
    "imgUrl": "https://images.squarespace-cdn.com/content/v1/68e06d2a2c7b551478df5338/8f3ff6a1-bc2c-49aa-a80a-adffef6a3123/SuzieQ+LOGO+%2813%29.png?format=500w"
  },
  {
    "id": 406,
    "setId": "mega-evolution",
    "title": "Pokémon TCG: Mega Evolution Elite Trainer Box (Mega Gardevoir)",
    "price": "$84.99",
    "soldOut": false,
    "description": "Features Mega Gardevoir artwork. Includes 9 booster packs, a full-art promo card.",
    "imgUrl": "https://images.squarespace-cdn.com/content/v1/68e06d2a2c7b551478df5338/f8813c9a-f790-43e8-bdb7-e01b3d6932a1/SuzieQ+LOGO+%2814%29.png?format=500w"
  },
  {
    "id": 409,
    "setId": "mega-evolution",
    "title": "Pokémon TCG: Mega Heroes Mini Tin",
    "price": "$14.99",
    "soldOut": true,
    "description": "Collectible mini tin containing 2 Mega Evolution booster packs and 1 art card. Features different Mega Pokémon designs on each tin.",
    "imgUrl": "https://images.squarespace-cdn.com/content/v1/68e06d2a2c7b551478df5338/d57fbe9c-708f-4c55-a219-8af24b86706e/SuzieQ+LOGO+%2831%29.png?format=500w"
  },
  {
    "id": 410,
    "setId": "phantasmal-flames",
    "title": "Pokémon TCG: Mega Evolution-Phantasmal Flames Elite Trainer Box",
    "price": "$79.99",
    "soldOut": true,
    "description": "Includes 9 Phantasmal Flames booster packs, an exclusive promo card, 65 card sleeves, energy cards, and storage box. Features Ghost and Fire-type themed artwork.",
    "imgUrl": "https://images.squarespace-cdn.com/content/v1/68e06d2a2c7b551478df5338/a51eae64-e8b8-46c0-b3e0-dace5c6f33d3/SuzieQ+LOGO+%2815%29.png?format=500w"
  },
  {
    "id": 411,
    "setId": "phantasmal-flames",
    "title": "Pokémon TCG: Mega Evolutions-Phantasmal Flames Booster Bundle",
    "price": "$38.99",
    "soldOut": true,
    "description": "Includes 6 Phantasmal Flames booster packs. Chase the rare illustration cards exclusive to this expansion.",
    "imgUrl": "https://images.squarespace-cdn.com/content/v1/68e06d2a2c7b551478df5338/931f7b6e-91aa-44c2-aa2d-b8345eb01418/SuzieQ+LOGO+%2850%29.png?format=500w"
  },
  {
    "id": 412,
    "setId": "phantasmal-flames",
    "title": "Pokémon TCG: Mega Evolutions-Phantasmal Flames Booster Pack",
    "price": "$7.99",
    "soldOut": false,
    "description": "Contains 10 cards from the Phantasmal Flames expansion.",
    "imgUrl": "https://images.squarespace-cdn.com/content/v1/68e06d2a2c7b551478df5338/9c3cfcca-a812-49ec-8701-8b71a4b6616c/PF+%282%29.png?format=500w"
  },
  {
    "id": 501,
    "setId": "bw-era",
    "title": "Pokémon TCG: Scarlet & Violet—White Flare Elite Trainer Box",
    "price": "$68.99",
    "soldOut": true,
    "description": "Includes 9 White Flare booster packs, a full-art promo card, 65 card sleeves, energy cards, and a premium box. Features Reshiram-themed artwork from the Black & White era.",
    "imgUrl": "https://images.squarespace-cdn.com/content/v1/68e06d2a2c7b551478df5338/a7607e61-8abe-40e3-aff8-19eb155009cd/SuzieQ+LOGO+%2824%29.png?format=500w"
  },
  {
    "id": 502,
    "setId": "bw-era",
    "title": "Pokémon TCG: Scarlet & Violet—Black Bolt Elite Trainer Box",
    "price": "$68.99",
    "soldOut": true,
    "description": "Includes 9 Black Bolt booster packs, a full-art promo card, 65 card sleeves, energy cards, and a premium box. Features Zekrom-themed artwork from the Black & White era.",
    "imgUrl": "https://images.squarespace-cdn.com/content/v1/68e06d2a2c7b551478df5338/6014c06f-3e43-40f5-8700-b58c25d459a8/SuzieQ+LOGO+%2827%29.png?format=500w"
  },
  {
    "id": 503,
    "setId": "bw-era",
    "title": "Pokémon TCG: Scarlet & Violet-White Flare Booster Bundle",
    "price": "$38.99",
    "soldOut": true,
    "description": "Includes 6 White Flare booster packs in collectible bundle packaging. Pull powerful cards from the Black & White-inspired set.",
    "imgUrl": "https://images.squarespace-cdn.com/content/v1/68e06d2a2c7b551478df5338/04ebf0f4-25fd-4afb-adaa-7ea2006526f8/SuzieQ+LOGO+%2843%29.png?format=500w"
  },
  {
    "id": 504,
    "setId": "bw-era",
    "title": "Pokémon TCG: Scarlet & Violet-Black Bolt Booster Bundle",
    "price": "$56.99",
    "soldOut": false,
    "description": "Includes 6 Black Bolt booster packs in collectible bundle packaging.",
    "imgUrl": "https://images.squarespace-cdn.com/content/v1/68e06d2a2c7b551478df5338/127d72d8-2c4d-4574-a842-3f596d782f52/SuzieQ+LOGO+%2848%29.png?format=500w"
  },
  {
    "id": 505,
    "setId": "bw-era",
    "title": "Pokémon TCG: Scarlet & Violet-White Flare Booster Pack",
    "price": "$7.49",
    "soldOut": true,
    "description": "Contains 10 cards from the White Flare expansion. Features classic Pokémon with modern Scarlet & Violet mechanics.",
    "imgUrl": "https://images.squarespace-cdn.com/content/v1/68e06d2a2c7b551478df5338/998a969c-249d-4618-8e50-96f2a1c4b30a/WF+%282%29.png?format=500w"
  },
  {
    "id": 506,
    "setId": "bw-era",
    "title": "Pokémon TCG: Scarlet & Violet-Black Bolt Booster Pack",
    "price": "$7.49",
    "soldOut": true,
    "description": "Contains 10 cards from the Black Bolt expansion. Features classic Pokémon with modern Scarlet & Violet mechanics.",
    "imgUrl": "https://images.squarespace-cdn.com/content/v1/68e06d2a2c7b551478df5338/5ddb0c36-903d-4eb6-b61e-ebaebf64b36b/BB+%282%29.png?format=500w"
  },
  {
    "id": 601,
    "setId": "misc",
    "title": "Pokémon TCG: Scarlet & Violet—Twilight Masquerade Elite Trainer Box",
    "price": "$65.99",
    "soldOut": true,
    "description": "Includes 9 Twilight Masquerade booster packs, a full-art promo card, 65 card sleeves, energy cards, and accessories. Features mysterious mask-themed artwork.",
    "imgUrl": "https://images.squarespace-cdn.com/content/v1/68e06d2a2c7b551478df5338/8986f12b-dec4-4456-aebb-4096283dbc8b/SuzieQ+LOGO+%2817%29.png?format=500w"
  },
  {
    "id": 602,
    "setId": "misc",
    "title": "Pokémon TCG: Scarlet & Violet—Temporal Forces Elite Trainer Box",
    "price": "$65.99",
    "soldOut": true,
    "description": "Includes 9 Temporal Forces booster packs, a full-art promo card, 65 card sleeves, energy cards, and a collector's box. Chase the rare ACE SPEC cards.",
    "imgUrl": "https://images.squarespace-cdn.com/content/v1/68e06d2a2c7b551478df5338/94b8cbd4-4f6d-45fb-a36f-d88fd144de00/SuzieQ+LOGO+%2814%29.png?format=500w"
  },
  {
    "id": 603,
    "setId": "misc",
    "title": "Pokémon TCG: Archaludon ex Box",
    "price": "$29.99",
    "soldOut": false,
    "description": "Contains a foil promo Archaludon ex card, 4 booster packs, and an oversized card.",
    "imgUrl": "https://images.squarespace-cdn.com/content/v1/68e06d2a2c7b551478df5338/64d7fc24-f6c5-4157-86f2-e48e4329c4b1/SuzieQ+LOGO+%288%29.png?format=500w"
  },
  {
    "id": 604,
    "setId": "misc",
    "title": "Pokémon TCG: Reshiram ex Box",
    "price": "$32.99",
    "soldOut": true,
    "description": "Contains a foil promo Reshiram ex card, 4 booster packs from various Scarlet & Violet sets, and a code card for the online game.",
    "imgUrl": "https://images.squarespace-cdn.com/content/v1/68e06d2a2c7b551478df5338/2164b2bc-b83d-4ba1-95dc-583fe2d9aeb9/SuzieQ+LOGO+%287%29.png?format=500w"
  },
  {
    "id": 605,
    "setId": "misc",
    "title": "Pokémon TCG: ex Battle Deck - Tapu Koko",
    "price": "$14.99",
    "soldOut": false,
    "description": "A ready-to-play 60-card deck featuring Tapu Koko ex. Includes damage counters, a coin, a deck box, and a quick-start guide — perfect for beginners.",
    "imgUrl": "https://images.squarespace-cdn.com/content/v1/68e06d2a2c7b551478df5338/d7b1a8c3-575f-47ce-96cd-872a5a44635d/SuzieQ+LOGO+%285%29.png?format=500w"
  },
  {
    "id": 606,
    "setId": "misc",
    "title": "Pokémon TCG: ex Battle Deck - Iron Leaves",
    "price": "$14.99",
    "soldOut": false,
    "description": "A ready-to-play 60-card deck featuring Iron Leaves ex. Includes damage counters, a coin, a deck box, and a quick-start guide — perfect for beginners.",
    "imgUrl": "https://images.squarespace-cdn.com/content/v1/68e06d2a2c7b551478df5338/adbc1830-d516-4719-b325-0a9840f6ebfd/SuzieQ+LOGO.png?format=500w"
  },
  {
    "id": 607,
    "setId": "misc",
    "title": "Pokémon TCG: Unova Mini Tin",
    "price": "$20.99",
    "soldOut": false,
    "description": "Collectible mini tin featuring Unova region Pokémon artwork. Contains 2 booster packs and 1 art card. Collect all designs!",
    "imgUrl": "https://images.squarespace-cdn.com/content/v1/68e06d2a2c7b551478df5338/1971202f-3b55-40c3-b97d-2c666ec4eda5/SuzieQ+LOGO+%2830%29.png?format=500w"
  },
  {
    "id": 608,
    "setId": "misc",
    "title": "Pokémon TCG: Scarlet & Violet— Destined Rivals Elite Trainer Box",
    "price": "$65.99",
    "soldOut": true,
    "description": "Includes 9 Destined Rivals booster packs, a full-art promo card, 65 card sleeves, energy cards, dice, and a premium collector's box.",
    "imgUrl": "https://images.squarespace-cdn.com/content/v1/68e06d2a2c7b551478df5338/657531d7-0a47-4484-856b-ef1220919b74/SuzieQ+LOGO.png?format=500w"
  },
  {
    "id": 701,
    "setId": "japanese",
    "title": "Japanese Pokémon TCG Booster Box (Placeholder)",
    "price": "$59.99",
    "soldOut": false,
    "description": "Japanese booster box containing 30 packs with 5 cards each. Japanese sets are known for exclusive artwork and higher pull rates.",
    "imgUrl": ""
  },
  {
    "id": 702,
    "setId": "japanese",
    "title": "Japanese Pokémon TCG Single Pack (Placeholder)",
    "price": "$4.99",
    "soldOut": false,
    "description": "A single Japanese booster pack with 5 cards. Imported directly from Japan with authentic packaging.",
    "imgUrl": ""
  },
  {
    "id": 801,
    "setId": "chinese",
    "title": "Simplified Chinese Pokémon TCG Gift Box (Placeholder)",
    "price": "$85.99",
    "soldOut": false,
    "description": "Premium gift box from the Simplified Chinese Pokémon TCG line. Contains multiple booster packs, promo cards, and exclusive accessories.",
    "imgUrl": ""
  },
  {
    "id": 802,
    "setId": "chinese",
    "title": "Traditional Chinese Pokémon Booster Box (Placeholder)",
    "price": "$45.99",
    "soldOut": false,
    "description": "Traditional Chinese booster box with 30 packs. Features region-exclusive artwork and card designs.",
    "imgUrl": ""
  },
  {
    "id": 901,
    "setId": "other-tcg",
    "title": "One Piece Card Game Booster Box (Placeholder)",
    "price": "$110.00",
    "soldOut": false,
    "description": "Contains 24 booster packs from the One Piece Card Game. Each pack has 6 cards with a chance to pull rare leader and secret rare cards.",
    "imgUrl": ""
  },
  {
    "id": 902,
    "setId": "other-tcg",
    "title": "Disney Lorcana Set Pack (Placeholder)",
    "price": "$6.99",
    "soldOut": false,
    "description": "A single Disney Lorcana booster pack with 12 cards. Collect enchanted and legendary Disney characters in card form.",
    "imgUrl": ""
  },
  {
    "id": 1001,
    "setId": "pokemon-merch",
    "title": "Pikachu 8-inch Plush (Placeholder)",
    "price": "$14.99",
    "soldOut": false,
    "description": "Soft and cuddly 8-inch Pikachu plush toy. Perfect for display or cuddling.",
    "imgUrl": ""
  },
  {
    "id": 1002,
    "setId": "pokemon-merch",
    "title": "Poké Ball Replica (Placeholder)",
    "price": "$29.99",
    "soldOut": false,
    "description": "High-quality die-cast Poké Ball replica with touch and proximity-sensing light features.",
    "imgUrl": ""
  },
  {
    "id": 1101,
    "setId": "perfect-order",
    "title": "Pokémon TCG: Mega Evolution—Perfect Order Elite Trainer Box",
    "price": "$49.99",
    "soldOut": false,
    "description": "Includes 9 Perfect Order booster packs, a full-art promo card, 65 card sleeves featuring Mega Zygarde, energy cards, and a premium collector's box.",
    "imgUrl": "/images/po-etb.png"
  },
  {
    "id": 1102,
    "setId": "perfect-order",
    "title": "Pokémon TCG: Mega Evolution—Perfect Order 3-Pack Blister",
    "price": "$14.99",
    "soldOut": false,
    "description": "Contains 3 Perfect Order booster packs, a shiny coin, and a special foil promo card to boost your collection.",
    "imgUrl": "/images/po-blister.jpg"
  },
  {
    "id": 1103,
    "setId": "perfect-order",
    "title": "Pokémon TCG: Mega Evolution—Perfect Order Booster Bundle",
    "price": "$26.99",
    "soldOut": false,
    "description": "Expand your collection with this Booster Bundle containing 6 booster packs from the Mega Evolution—Perfect Order expansion.",
    "imgUrl": "/images/po-bundle.png"
  },
  {
    "id": 1104,
    "setId": "perfect-order",
    "title": "Pokémon TCG: Mega Evolution—Perfect Order Booster Pack",
    "price": "$4.49",
    "soldOut": false,
    "description": "Contains 10 cards from the Perfect Order expansion. Uncover powerful new Pokémon ex and stunning illustration rares.",
    "imgUrl": "/images/po-booster.png"
  },
  {
    "id": 1105,
    "setId": "perfect-order",
    "title": "Pokémon TCG: Mega Evolution—Perfect Order Mini Tin",
    "price": "$9.99",
    "soldOut": false,
    "description": "A collectible mini tin that perfectly stores your favorite cards! Includes 2 booster packs and 1 matching Pokémon art card.",
    "imgUrl": "/images/po-minitin.jpg"
  },
  {
    "id": 103,
    "setId": "surging-sparks",
    "title": "Pokémon TCG: Scarlet & Violet-Surging Sparks Booster Box",
    "price": "$234.99",
    "soldOut": false,
    "description": "Contains 36 Surging Sparks booster packs.",
    "imgUrl": "/images/po-logo.png"
  },
  {
    "id": 413,
    "setId": "mega-evolution",
    "title": "Pokémon TCG: Mega Evolution Booster Pack",
    "price": "$36.99",
    "soldOut": false,
    "description": "Set of 5 Mega Evolution booster packs.",
    "imgUrl": "/images/po-logo.png"
  },
  {
    "id": 609,
    "setId": "misc",
    "title": "Pokémon TCG: Pokemon Day 2026 Collection",
    "price": "$29.99",
    "soldOut": false,
    "description": "Commemorative Pokémon Day collection offering an array of packs and exclusive promos.",
    "imgUrl": "/images/po-logo.png"
  },
  {
    "id": 1003,
    "setId": "pokemon-merch",
    "title": "Cute Manta Ray Plush Bag Charm - Perfect Gift for Marine Lovers",
    "price": "$8.99",
    "soldOut": false,
    "description": "Adorable Manta Ray plush bag charm.",
    "imgUrl": "/images/manta-ray.png"
  },
  {
    "id": 414,
    "setId": "mega-evolution",
    "title": "Pokémon TCG: Mega Evolution - Ascended Heroes Collection",
    "price": "$24.99",
    "soldOut": false,
    "description": "An exclusive box celebrating the ascended heroes of the Mega Evolution timeline.",
    "imgUrl": "/images/ascended-heroes.png"
  },
  {
    "id": 304,
    "setId": "prismatic",
    "title": "Pokémon TCG: Scarlet & Violet - Prismatic Evolutions Surprise Box",
    "price": "$46.99",
    "soldOut": false,
    "description": "A mystery surprise box full of Prismatic Evolutions boosters and collectibles.",
    "imgUrl": "/images/po-logo.png"
  },
  {
    "id": 1201,
    "setId": "graded-cards",
    "title": "PSA 10 GEM MINT 2022 Pokemon Japanese Zamazenta V #232 VSTAR Universe",
    "price": "$54.99",
    "soldOut": false,
    "description": "Professionally graded PSA 10 Gem Mint Japanese Zamazenta V card.",
    "imgUrl": "/images/zamazenta-psa.png"
  },
  {
    "id": 305,
    "setId": "prismatic",
    "title": "Pokémon TCG: Scarlet & Violet - Prismatic Evolutions Booster Pack",
    "price": "$10.99",
    "soldOut": false,
    "description": "Contains 10 cards from the gorgeous Prismatic Evolutions set.",
    "imgUrl": "/images/po-logo.png"
  },
  {
    "id": 1004,
    "setId": "pokemon-merch",
    "title": "Re-Ment Terrarium Mini Figure Blind Box EX Paldea - Pokémon Licensed Collectible",
    "price": "$15.99",
    "soldOut": false,
    "description": "Official blind box terrarium figure from the Paldea region.",
    "imgUrl": "/images/rement-paldea.png"
  },
  {
    "id": 1005,
    "setId": "pokemon-merch",
    "title": "Re-Ment Terrarium Mini Figure Blind Box - Pokémon Licensed Collectible",
    "price": "$15.99",
    "soldOut": false,
    "description": "Official classic blind box terrarium figure.",
    "imgUrl": "/images/rement-classic.png"
  },
  {
    "id": 610,
    "setId": "misc",
    "title": "Pokémon TCG: Suicune Knock Out Collection",
    "price": "$18.99",
    "soldOut": false,
    "description": "Suicune Knock Out Collection featuring 2 booster packs and 3 foil promo cards.",
    "imgUrl": "/images/suicune-ko.png"
  },
  {
    "id": 611,
    "setId": "misc",
    "title": "Pokémon TCG: Kyogre Knock Out Collection",
    "price": "$19.99",
    "soldOut": false,
    "description": "Kyogre Knock Out Collection featuring 2 booster packs and 3 foil promo cards.",
    "imgUrl": "/images/kyogre-ko.png"
  },
  {
    "id": 612,
    "setId": "misc",
    "title": "Pokémon TCG: 2-Pack Blister [Raikou]",
    "price": "$22.99",
    "soldOut": false,
    "description": "Includes 2 booster packs and a special Raikou promotional coin and card.",
    "imgUrl": "/images/po-logo.png"
  },
  {
    "id": 613,
    "setId": "misc",
    "title": "Pokémon TCG: Mega Charizard X/Y ex Tin",
    "price": "$39.99",
    "soldOut": false,
    "description": "A beautifully crafted tin featuring the mighty Mega Charizard.",
    "imgUrl": "/images/mega-charizard-tin.png"
  },
  {
    "id": 1202,
    "setId": "graded-cards",
    "title": "N's Zorua #108 Pokemon Japanese Battle Partners PSA GEM MINT 10",
    "price": "$35.99",
    "soldOut": false,
    "description": "Immaculate PSA 10 Graded N's Zorua from the Japanese Battle Partners set.",
    "imgUrl": "/images/zorua-psa.png"
  },
  {
    "id": 104,
    "setId": "surging-sparks",
    "title": "Pokémon TCG: Scarlet & Violet Surging Sparks Booster Bundle",
    "price": "$48.99",
    "soldOut": false,
    "description": "Contains 6 Surging Sparks booster packs to boost your collection.",
    "imgUrl": "/images/po-logo.png"
  },
  {
    "id": 1203,
    "setId": "graded-cards",
    "title": "2014 Pokémon TCG Dragonite EX #74 MINT PSA 9",
    "price": "$48.99",
    "soldOut": false,
    "description": "Near Mint PSA 9 Dragonite EX from 2014.",
    "imgUrl": "/images/dragonite-psa.png"
  },
  {
    "id": 1204,
    "setId": "graded-cards",
    "title": "2023 Pokémon TCG Roaring Moon EX Special Illustration Rare Card #251 MINT PSA 9",
    "price": "$49.99",
    "soldOut": false,
    "description": "A beautiful Roaring Moon EX Special Illustration Rare piece graded PSA 9.",
    "imgUrl": "/images/roaring-moon-psa.png"
  },
  {
    "id": 614,
    "setId": "misc",
    "title": "Pokémon TCG: Paldea Adventure Chest",
    "price": "$79.99",
    "soldOut": false,
    "description": "A massive chest of Pokémon TCG treasures from the Paldea region.",
    "imgUrl": "/images/paldea-chest.png"
  }
];
