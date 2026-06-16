export const SETS = [
  {
    id: "graded-cards",
    name: "Graded Cards",
    imgUrl: "/images/charizard.png",
    bannerUrl: "/images/charizard.png",
    color: "#FFD700",
    emoji: "🏆"
  },
  {
    id: "singles",
    name: "Singles",
    imgUrl: "/images/singles.jpg",
    bannerUrl: "/images/singles.jpg",
    color: "#4169E1",
    emoji: "🃏"
  },
  {
    id: "all-pokemon",
    name: "English Pokémon",
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pokémon_logo.svg/1200px-International_Pokémon_logo.svg.png",
    bannerUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pokémon_logo.svg/1200px-International_Pokémon_logo.svg.png",
    color: "#E3350D",
    emoji: "📦"
  },
  {
    id: "perfect-order",
    parent: "all-pokemon",
    name: "Perfect Order",
    imgUrl: "/images/po-logo.png",
    bannerUrl: "/images/po-logo.png",
    color: "#1E90FF"
  },
  {
    id: "phantasmal-flames",
    parent: "all-pokemon",
    name: "Phantasmal Flames",
    imgUrl: "https://d1i787aglh9bmb.cloudfront.net/assets/img/me-expansions/me02/logo/en-us/me02-logo.png",
    bannerUrl: "https://d1i787aglh9bmb.cloudfront.net/assets/img/me-expansions/me02/logo/en-us/me02-logo.png",
    color: "#7B2D8B"
  },
  {
    id: "mega-evolution",
    parent: "all-pokemon",
    name: "Mega Evolution",
    imgUrl: "https://images.pokemontcg.io/me1/symbol.png",
    bannerUrl: "https://images.pokemontcg.io/me1/logo.png",
    color: "#E3350D"
  },
  {
    id: "journey-together",
    parent: "all-pokemon",
    name: "Journey Together",
    imgUrl: "https://images.pokemontcg.io/sv9/symbol.png",
    bannerUrl: "https://images.pokemontcg.io/sv9/logo.png",
    color: "#2E8B57"
  },
  {
    id: "bw-era",
    parent: "all-pokemon",
    name: "Black & White Era",
    imgUrl: "https://d1i787aglh9bmb.cloudfront.net/assets/img/sv-expansions/sv10dot5/logo/en-us/sv10pt5-logo.png",
    bannerUrl: "https://d1i787aglh9bmb.cloudfront.net/assets/img/sv-expansions/sv10dot5/logo/en-us/sv10pt5-logo.png",
    color: "#000000"
  },
  {
    id: "prismatic",
    parent: "all-pokemon",
    name: "Prismatic Evolutions",
    imgUrl: "https://images.pokemontcg.io/sv8pt5/symbol.png",
    bannerUrl: "https://images.pokemontcg.io/sv8pt5/logo.png",
    color: "#ff66c4"
  },
  {
    id: "surging-sparks",
    parent: "all-pokemon",
    name: "Surging Sparks",
    imgUrl: "https://images.pokemontcg.io/sv8/symbol.png",
    bannerUrl: "https://images.pokemontcg.io/sv8/logo.png",
    color: "#E0AA3E"
  },
  {
    id: "151",
    parent: "all-pokemon",
    name: "Scarlet & Violet 151",
    imgUrl: "https://images.pokemontcg.io/sv3pt5/symbol.png",
    bannerUrl: "https://images.pokemontcg.io/sv3pt5/logo.png",
    color: "#8A2BE2"
  },
  {
    id: "misc",
    parent: "all-pokemon",
    name: "Miscellaneous / Collections",
    imgUrl: "https://images.pokemontcg.io/sve/symbol.png",
    bannerUrl: "https://images.pokemontcg.io/sve/logo.png",
    color: "#666666",
    emoji: "📦"
  },
  {
    id: "japanese",
    name: "Japanese Pokémon",
    imgUrl: "/images/japanese-box.png",
    bannerUrl: "/images/japanese-box.png",
    color: "#D0112b",
    emoji: "🇯🇵"
  },
  {
    id: "chinese",
    name: "Chinese Pokémon",
    imgUrl: "/images/chinese-box.png",
    bannerUrl: "/images/chinese-box.png",
    color: "#DA251D",
    emoji: "🇨🇳"
  },
  {
    id: "other-tcg",
    name: "Other / Future TCGs",
    imgUrl: "/images/one-piece-group.jpg",
    bannerUrl: "/images/one-piece-group.jpg",
    color: "#4B0082",
    emoji: "🎴"
  },
  {
    id: "pokemon-merch",
    name: "Merchandise & Toys",
    imgUrl: "/images/merch.svg",
    bannerUrl: "/images/merch.svg",
    color: "#FF8C00",
    emoji: "🧸"
  }
];

export const PRODUCTS = [

  {
    "id": 101,
    "setId": "surging-sparks",
    "title": "Pokémon TCG: Scarlet & Violet-Surging Sparks Booster Pack",
    "price": "$6.99",
    "soldOut": false,
    "description": "Contains 10 cards from the Surging Sparks expansion. Each pack may include rare holographic, illustration rare, or special art rare cards.",
    "imgUrl": "https://images.squarespace-cdn.com/content/v1/68e06d2a2c7b551478df5338/224a05f2-8828-4f97-9299-1d207332261a/SuzieQ+LOGO+%289%29.png?format=500w",
    "stock": 28
  },
  {
    "id": 102,
    "setId": "surging-sparks",
    "title": "Pokémon TCG: Surging Sparks Elite Trainer Box",
    "price": "$72.99",
    "soldOut": true,
    "description": "Includes 9 Surging Sparks booster packs, 1 full-art promo card, 65 card sleeves, 45 energy cards, and a player's guide. Great for building competitive decks.",
    "imgUrl": "https://images.squarespace-cdn.com/content/v1/68e06d2a2c7b551478df5338/3f7eaa48-463e-4eb7-848b-6beab5e61491/SuzieQ+LOGO+%2816%29.png?format=500w",
    "stock": 0
  },
  {
    "id": 201,
    "setId": "151",
    "title": "Pokémon TCG: Scarlet & Violet 151 Booster Pack",
    "price": "$12.99",
    "soldOut": true,
    "description": "Contains 10 cards celebrating the original 151 Kanto Pokémon. Chase the iconic Charizard, Blastoise, and Venusaur illustration rares in this fan-favorite set.",
    "imgUrl": "https://images.squarespace-cdn.com/content/v1/68e06d2a2c7b551478df5338/99353457-f7de-440e-b6ba-da27f7cc9f5a/SuzieQ+LOGO+%286%29.png?format=500w",
    "stock": 0
  },
  {
    "id": 202,
    "setId": "151",
    "title": "Pokémon TCG: Scarlet & Violet—151 Elite Trainer Box",
    "price": "$165.99",
    "soldOut": true,
    "description": "Includes 11 Scarlet & Violet—151 booster packs, a full-art promo card, 65 card sleeves featuring Poké Ball designs, energy cards, damage counters, and a collector's box.",
    "imgUrl": "https://images.squarespace-cdn.com/content/v1/68e06d2a2c7b551478df5338/b51a206d-68bd-4fe3-bafb-fdf198028551/SuzieQ+LOGO+%285%29.png?format=500w",
    "stock": 0
  },
  {
    "id": 203,
    "setId": "151",
    "title": "Pokémon TCG: Scarlet & Violet—151 Mini Tin",
    "price": "$21.99",
    "soldOut": true,
    "description": "Compact collector's tin containing 2 Scarlet & Violet—151 booster packs and 1 art card. Each tin features a different original Kanto Pokémon design.",
    "imgUrl": "https://images.squarespace-cdn.com/content/v1/68e06d2a2c7b551478df5338/73b5a3ce-c96c-44e2-9535-6f54feabc5db/SuzieQ+LOGO+%281%29.png?format=500w",
    "stock": 0
  },
  {
    "id": 301,
    "setId": "prismatic",
    "title": "Pokémon TCG: Scarlet & Violet—Prismatic Evolutions Booster Bundle",
    "price": "$64.99",
    "soldOut": true,
    "description": "Get a quick boost to your collection with this official Pokémon TCG Booster Bundle. Contains 6 booster packs from the set, offering a great way to hunt for the top chase cards, rare holos, and special illustration cards without any extra filler accessories.",
    "imgUrl": "https://images.squarespace-cdn.com/content/v1/68e06d2a2c7b551478df5338/1786c526-f588-4355-baeb-e42f2756edf4/SuzieQ+LOGO+%2839%29.png?format=500w",
    "stock": 0
  },
  {
    "id": 302,
    "setId": "prismatic",
    "title": "Pokémon TCG: Scarlet & Violet—Prismatic Evolutions Elite Trainer Box",
    "price": "$129.99",
    "soldOut": true,
    "description": "Contains 9 Prismatic Evolutions booster packs, a special holographic promo card, 65 card sleeves, energy cards, and a premium storage box featuring Eevee artwork.",
    "imgUrl": "https://images.squarespace-cdn.com/content/v1/68e06d2a2c7b551478df5338/cf3a8205-f4d4-4488-897a-e78baf4bc263/SuzieQ+LOGO+%287%29.png?format=500w",
    "stock": 0
  },
  {
    "id": 303,
    "setId": "prismatic",
    "title": "Pokémon TCG: Scarlet & Violet—Prismatic Evolutions Mini Tin",
    "price": "$22.99",
    "soldOut": true,
    "description": "A pocket-sized collector's tin with 2 Prismatic Evolutions booster packs and 1 art card. Perfect for collecting all Eeveelution designs.",
    "imgUrl": "https://images.squarespace-cdn.com/content/v1/68e06d2a2c7b551478df5338/05afc2f2-41a7-4475-a225-65d0a213e817/SuzieQ+LOGO+%2835%29.png?format=500w",
    "stock": 0
  },
  {
    "id": 351,
    "setId": "journey-together",
    "title": "Pokémon TCG: Scarlet & Violet-Journey Together Booster Pack",
    "price": "$6.99",
    "soldOut": true,
    "description": "Contains 10 cards from the Journey Together expansion. Features Trainer & Pokémon duo cards and new illustration rares celebrating iconic partnerships.",
    "imgUrl": "https://images.squarespace-cdn.com/content/v1/68e06d2a2c7b551478df5338/f5c77db2-def7-4c5b-b7d6-7e54b86dee44/JT+%282%29.png?format=500w",
    "stock": 0
  },
  {
    "id": 352,
    "setId": "journey-together",
    "title": "Pokémon TCG: Scarlet & Violet-Journey Together Booster Bundle",
    "price": "$38.99",
    "soldOut": true,
    "description": "Get a quick boost to your collection with this official Pokémon TCG Booster Bundle. Contains 6 booster packs from the set, offering a great way to hunt for the top chase cards, rare holos, and special illustration cards without any extra filler accessories.",
    "imgUrl": "https://images.squarespace-cdn.com/content/v1/68e06d2a2c7b551478df5338/0e5d7006-cef4-4105-b64e-3a5b3d8e58a4/SuzieQ+LOGO+%2841%29.png?format=500w",
    "stock": 0
  },
  {
    "id": 353,
    "setId": "journey-together",
    "title": "Pokémon TCG: Scarlet & Violet 9 Journey Together Elite Trainer Box",
    "price": "$65.99",
    "soldOut": true,
    "description": "Packed with 9 Journey Together booster packs, a full-art promo card, 65 card sleeves, energy cards, dice, and condition markers. Everything you need to play and collect.",
    "imgUrl": "https://images.squarespace-cdn.com/content/v1/68e06d2a2c7b551478df5338/55a7e684-ce92-425d-b893-286e4cae8179/SuzieQ+LOGO+%283%29.png?format=500w",
    "stock": 0
  },
  {
    "id": 401,
    "setId": "mega-evolution",
    "title": "Pokémon TCG: Mega Evolution Booster Pack",
    "price": "$7.99",
    "soldOut": false,
    "description": "Contains 10 cards from the Mega Evolution expansion. Chance to pull powerful Mega EX cards featuring fan-favorite Pokémon like Charizard, Lucario, and Gardevoir.",
    "imgUrl": "https://images.squarespace-cdn.com/content/v1/68e06d2a2c7b551478df5338/2603873e-f184-4adc-8aa7-94a9c4520bb5/ME+%282%29.png?format=500w",
    "stock": 25
  },
  {
    "id": 402,
    "setId": "mega-evolution",
    "title": "Pokémon TCG: Mega Evolution Booster Bundle",
    "price": "$38.99",
    "soldOut": true,
    "description": "Includes 6 Mega Evolution booster packs in exclusive bundle packaging. A solid way to start your Mega Evolution collection.",
    "imgUrl": "/images/me-booster-bundle.jpg",
    "stock": 0
  },
  {
    "id": 403,
    "setId": "mega-evolution",
    "title": "Pokémon TCG: Mega Charizard X ex Ultra-Premium Collection",
    "price": "$164.99",
    "soldOut": true,
    "description": "The ultimate collector's item! Includes 16 booster packs, a metal Mega Charizard X card, premium accessories, and exclusive full-art promo cards.",
    "imgUrl": "https://images.squarespace-cdn.com/content/v1/68e06d2a2c7b551478df5338/4f78e0b9-dbe4-4d3d-8b06-aba438d6e4e9/SuzieQ+LOGO+%284%29.png?format=500w",
    "stock": 0
  },
  {
    "id": 405,
    "setId": "mega-evolution",
    "title": "Pokémon TCG: Mega Evolution Elite Trainer Box (Mega Lucario)",
    "price": "$84.99",
    "soldOut": true,
    "description": "The ultimate package for collectors, players, and trainers. This official Pokémon TCG Elite Trainer Box contains 9 booster packs, 1 full-art foil promo card, 65 premium card sleeves featuring set artwork, 45 Energy cards, 6 damage-counter dice, 1 competition-legal coin-flip die, condition markers, a player's guide, and a sturdy collector's box with dividers to keep your cards organized.",
    "imgUrl": "https://images.squarespace-cdn.com/content/v1/68e06d2a2c7b551478df5338/8f3ff6a1-bc2c-49aa-a80a-adffef6a3123/SuzieQ+LOGO+%2813%29.png?format=500w",
    "stock": 0
  },
  {
    "id": 406,
    "setId": "mega-evolution",
    "title": "Pokémon TCG: Mega Evolution Elite Trainer Box (Mega Gardevoir)",
    "price": "$84.99",
    "soldOut": true,
    "description": "The ultimate package for collectors, players, and trainers. This official Pokémon TCG Elite Trainer Box contains 9 booster packs, 1 full-art foil promo card, 65 premium card sleeves featuring set artwork, 45 Energy cards, 6 damage-counter dice, 1 competition-legal coin-flip die, condition markers, a player's guide, and a sturdy collector's box with dividers to keep your cards organized.",
    "imgUrl": "https://images.squarespace-cdn.com/content/v1/68e06d2a2c7b551478df5338/f8813c9a-f790-43e8-bdb7-e01b3d6932a1/SuzieQ+LOGO+%2814%29.png?format=500w",
    "stock": 0
  },
  {
    "id": 409,
    "setId": "mega-evolution",
    "title": "Pokémon TCG: Mega Heroes Mini Tin",
    "price": "$19.99",
    "soldOut": true,
    "description": "Collectible mini tin containing 2 Mega Evolution booster packs and 1 art card. Features different Mega Pokémon designs on each tin.",
    "imgUrl": "https://images.squarespace-cdn.com/content/v1/68e06d2a2c7b551478df5338/d57fbe9c-708f-4c55-a219-8af24b86706e/SuzieQ+LOGO+%2831%29.png?format=500w",
    "stock": 0
  },
  {
    "id": 410,
    "setId": "phantasmal-flames",
    "title": "Pokémon TCG: Mega Evolution-Phantasmal Flames Elite Trainer Box",
    "price": "$82.99",
    "soldOut": true,
    "description": "Includes 9 Phantasmal Flames booster packs, an exclusive promo card, 65 card sleeves, energy cards, and storage box. Features Ghost and Fire-type themed artwork.",
    "imgUrl": "https://images.squarespace-cdn.com/content/v1/68e06d2a2c7b551478df5338/a51eae64-e8b8-46c0-b3e0-dace5c6f33d3/SuzieQ+LOGO+%2815%29.png?format=500w",
    "stock": 0
  },
  {
    "id": 411,
    "setId": "phantasmal-flames",
    "title": "Pokémon TCG: Mega Evolutions-Phantasmal Flames Booster Bundle",
    "price": "$63.99",
    "soldOut": true,
    "description": "Get a quick boost to your collection with this official Pokémon TCG Booster Bundle. Contains 6 booster packs from the set, offering a great way to hunt for the top chase cards, rare holos, and special illustration cards without any extra filler accessories.",
    "imgUrl": "https://images.squarespace-cdn.com/content/v1/68e06d2a2c7b551478df5338/931f7b6e-91aa-44c2-aa2d-b8345eb01418/SuzieQ+LOGO+%2850%29.png?format=500w",
    "stock": 0
  },
  {
    "id": 412,
    "setId": "phantasmal-flames",
    "title": "Pokémon TCG: Mega Evolutions-Phantasmal Flames Booster Pack",
    "price": "$7.99",
    "soldOut": true,
    "description": "Expand your collection with this authentic Pokémon TCG booster pack. Each pack contains 10 cards and 1 Basic Energy. Look for rare Holo Rares, Ultra Rares, and Special Illustration Rares. Perfect for players and collectors alike!",
    "imgUrl": "https://images.squarespace-cdn.com/content/v1/68e06d2a2c7b551478df5338/9c3cfcca-a812-49ec-8701-8b71a4b6616c/PF+%282%29.png?format=500w",
    "stock": 0
  },
  {
    "id": 501,
    "setId": "bw-era",
    "title": "Pokémon TCG: Scarlet & Violet—White Flare Elite Trainer Box",
    "price": "$82.99",
    "soldOut": true,
    "description": "Includes 9 White Flare booster packs, a full-art promo card, 65 card sleeves, energy cards, and a premium box. Features Reshiram-themed artwork from the Black & White era.",
    "imgUrl": "https://images.squarespace-cdn.com/content/v1/68e06d2a2c7b551478df5338/a7607e61-8abe-40e3-aff8-19eb155009cd/SuzieQ+LOGO+%2824%29.png?format=500w",
    "stock": 0
  },
  {
    "id": 502,
    "setId": "bw-era",
    "title": "Pokémon TCG: Scarlet & Violet—Black Bolt Elite Trainer Box",
    "price": "$82.99",
    "soldOut": true,
    "description": "Includes 9 Black Bolt booster packs, a full-art promo card, 65 card sleeves, energy cards, and a premium box. Features Zekrom-themed artwork from the Black & White era.",
    "imgUrl": "https://images.squarespace-cdn.com/content/v1/68e06d2a2c7b551478df5338/6014c06f-3e43-40f5-8700-b58c25d459a8/SuzieQ+LOGO+%2827%29.png?format=500w",
    "stock": 0
  },
  {
    "id": 503,
    "setId": "bw-era",
    "title": "Pokémon TCG: Scarlet & Violet-White Flare Booster Bundle",
    "price": "$56.99",
    "soldOut": true,
    "description": "Includes 6 White Flare booster packs in collectible bundle packaging. Pull powerful cards from the Black & White-inspired set.",
    "imgUrl": "https://images.squarespace-cdn.com/content/v1/68e06d2a2c7b551478df5338/04ebf0f4-25fd-4afb-adaa-7ea2006526f8/SuzieQ+LOGO+%2843%29.png?format=500w",
    "stock": 0
  },
  {
    "id": 504,
    "setId": "bw-era",
    "title": "Pokémon TCG: Scarlet & Violet-Black Bolt Booster Bundle",
    "price": "$56.99",
    "soldOut": true,
    "description": "Get a quick boost to your collection with this official Pokémon TCG Booster Bundle. Contains 6 booster packs from the set, offering a great way to hunt for the top chase cards, rare holos, and special illustration cards without any extra filler accessories.",
    "imgUrl": "https://images.squarespace-cdn.com/content/v1/68e06d2a2c7b551478df5338/127d72d8-2c4d-4574-a842-3f596d782f52/SuzieQ+LOGO+%2848%29.png?format=500w",
    "stock": 0
  },
  {
    "id": 505,
    "setId": "bw-era",
    "title": "Pokémon TCG: Scarlet & Violet-White Flare Booster Pack",
    "price": "$8.99",
    "soldOut": true,
    "description": "Expand your collection with this authentic Pokémon TCG booster pack. Each pack contains 10 cards and 1 Basic Energy. Look for rare Holo Rares, Ultra Rares, and Special Illustration Rares. Perfect for players and collectors alike!",
    "imgUrl": "https://images.squarespace-cdn.com/content/v1/68e06d2a2c7b551478df5338/998a969c-249d-4618-8e50-96f2a1c4b30a/WF+%282%29.png?format=500w",
    "stock": 0
  },
  {
    "id": 506,
    "setId": "bw-era",
    "title": "Pokémon TCG: Scarlet & Violet-Black Bolt Booster Pack",
    "price": "$8.99",
    "soldOut": true,
    "description": "Expand your collection with this authentic Pokémon TCG booster pack. Each pack contains 10 cards and 1 Basic Energy. Look for rare Holo Rares, Ultra Rares, and Special Illustration Rares. Perfect for players and collectors alike!",
    "imgUrl": "https://images.squarespace-cdn.com/content/v1/68e06d2a2c7b551478df5338/5ddb0c36-903d-4eb6-b61e-ebaebf64b36b/BB+%282%29.png?format=500w",
    "stock": 0
  },
  {
    "id": 601,
    "setId": "misc",
    "title": "Pokémon TCG: Scarlet & Violet—Twilight Masquerade Elite Trainer Box",
    "price": "$72.99",
    "soldOut": true,
    "description": "Includes 9 Twilight Masquerade booster packs, a full-art promo card, 65 card sleeves, energy cards, and accessories. Features mysterious mask-themed artwork.",
    "imgUrl": "https://images.squarespace-cdn.com/content/v1/68e06d2a2c7b551478df5338/8986f12b-dec4-4456-aebb-4096283dbc8b/SuzieQ+LOGO+%2817%29.png?format=500w",
    "stock": 0
  },
  {
    "id": 602,
    "setId": "misc",
    "title": "Pokémon TCG: Scarlet & Violet—Temporal Forces Elite Trainer Box",
    "price": "$65.99",
    "soldOut": true,
    "description": "Includes 9 Temporal Forces booster packs, a full-art promo card, 65 card sleeves, energy cards, and a collector's box. Chase the rare ACE SPEC cards.",
    "imgUrl": "https://images.squarespace-cdn.com/content/v1/68e06d2a2c7b551478df5338/94b8cbd4-4f6d-45fb-a36f-d88fd144de00/SuzieQ+LOGO+%2814%29.png?format=500w",
    "stock": 0
  },
  {
    "id": 603,
    "setId": "misc",
    "title": "Pokémon TCG: Archaludon ex Box",
    "price": "$29.99",
    "soldOut": true,
    "description": "Contains a foil promo Archaludon ex card, 4 booster packs, and an oversized card.",
    "imgUrl": "https://images.squarespace-cdn.com/content/v1/68e06d2a2c7b551478df5338/64d7fc24-f6c5-4157-86f2-e48e4329c4b1/SuzieQ+LOGO+%288%29.png?format=500w",
    "stock": 0
  },
  {
    "id": 604,
    "setId": "misc",
    "title": "Pokémon TCG: Reshiram ex Box",
    "price": "$32.99",
    "soldOut": true,
    "description": "Contains a foil promo Reshiram ex card, 4 booster packs from various Scarlet & Violet sets, and a code card for the online game.",
    "imgUrl": "https://images.squarespace-cdn.com/content/v1/68e06d2a2c7b551478df5338/2164b2bc-b83d-4ba1-95dc-583fe2d9aeb9/SuzieQ+LOGO+%287%29.png?format=500w",
    "stock": 0
  },
  {
    "id": 605,
    "setId": "misc",
    "title": "Pokémon TCG: ex Battle Deck - Tapu Koko",
    "price": "$14.99",
    "soldOut": false,
    "description": "A ready-to-play 60-card deck featuring Tapu Koko ex. Includes damage counters, a coin, a deck box, and a quick-start guide — perfect for beginners.",
    "imgUrl": "https://images.squarespace-cdn.com/content/v1/68e06d2a2c7b551478df5338/d7b1a8c3-575f-47ce-96cd-872a5a44635d/SuzieQ+LOGO+%285%29.png?format=500w",
    "stock": 1
  },
  {
    "id": 606,
    "setId": "misc",
    "title": "Pokémon TCG: ex Battle Deck - Iron Leaves",
    "price": "$14.99",
    "soldOut": false,
    "description": "A ready-to-play 60-card deck featuring Iron Leaves ex. Includes damage counters, a coin, a deck box, and a quick-start guide — perfect for beginners.",
    "imgUrl": "https://images.squarespace-cdn.com/content/v1/68e06d2a2c7b551478df5338/adbc1830-d516-4719-b325-0a9840f6ebfd/SuzieQ+LOGO.png?format=500w",
    "stock": 1
  },
  {
    "id": 607,
    "setId": "misc",
    "title": "Pokémon TCG: Unova Mini Tin",
    "price": "$20.99",
    "soldOut": true,
    "description": "Collectible mini tin featuring Unova region Pokémon artwork. Contains 2 booster packs and 1 art card. Collect all designs!",
    "imgUrl": "https://images.squarespace-cdn.com/content/v1/68e06d2a2c7b551478df5338/1971202f-3b55-40c3-b97d-2c666ec4eda5/SuzieQ+LOGO+%2830%29.png?format=500w",
    "stock": 0
  },
  {
    "id": 608,
    "setId": "misc",
    "title": "Pokémon TCG: Scarlet & Violet— Destined Rivals Elite Trainer Box",
    "price": "$165.99",
    "soldOut": true,
    "description": "Includes 9 Destined Rivals booster packs, a full-art promo card, 65 card sleeves, energy cards, dice, and a premium collector's box.",
    "imgUrl": "https://images.squarespace-cdn.com/content/v1/68e06d2a2c7b551478df5338/657531d7-0a47-4484-856b-ef1220919b74/SuzieQ+LOGO.png?format=500w",
    "stock": 0
  },
  {
    "id": 1101,
    "setId": "perfect-order",
    "title": "Pokémon TCG: Mega Evolution—Perfect Order Elite Trainer Box",
    "price": "$79.99",
    "soldOut": false,
    "description": "Includes 9 Perfect Order booster packs, a full-art promo card, 65 card sleeves featuring Mega Zygarde, energy cards, and a premium collector's box.",
    "imgUrl": "/images/po-etb.png",
    "stock": 1
  },
  {
    "id": 1102,
    "setId": "perfect-order",
    "title": "Pokémon TCG: Mega Evolution—Perfect Order 3-Pack Blister",
    "price": "$24.99",
    "soldOut": false,
    "description": "Expand your collection with this authentic Pokémon TCG booster pack. Each pack contains 10 cards and 1 Basic Energy. Look for rare Holo Rares, Ultra Rares, and Special Illustration Rares. Perfect for players and collectors alike!",
    "imgUrl": "/images/po-blister.jpg",
    "stock": 3
  },
  {
    "id": 1103,
    "setId": "perfect-order",
    "title": "Pokémon TCG: Mega Evolution—Perfect Order Booster Bundle",
    "price": "$46.99",
    "soldOut": false,
    "description": "Expand your collection with this Booster Bundle containing 6 booster packs from the Mega Evolution—Perfect Order expansion.",
    "imgUrl": "/images/po-bundle.png",
    "stock": 3
  },
  {
    "id": 1104,
    "setId": "perfect-order",
    "title": "Pokémon TCG: Mega Evolution—Perfect Order Booster Pack",
    "price": "$6.99",
    "soldOut": false,
    "description": "Expand your collection with this authentic Pokémon TCG booster pack. Each pack contains 10 cards and 1 Basic Energy. Look for rare Holo Rares, Ultra Rares, and Special Illustration Rares. Perfect for players and collectors alike!",
    "imgUrl": "/images/po-booster.png",
    "stock": 36
  },
  {
    "id": 1105,
    "setId": "perfect-order",
    "title": "Pokémon TCG: Mega Evolution—Perfect Order Mini Tin",
    "price": "$18.99",
    "soldOut": true,
    "description": "A collectible mini tin that perfectly stores your favorite cards! Includes 2 booster packs and 1 matching Pokémon art card.",
    "imgUrl": "/images/po-minitin.jpg",
    "stock": 0
  },
  {
    "id": 103,
    "setId": "surging-sparks",
    "title": "Pokémon TCG: Scarlet & Violet-Surging Sparks Booster Box",
    "price": "$234.99",
    "soldOut": true,
    "description": "Launch your deck building or booster opening experience to the next level with a full factory-sealed booster box. Contains 36 booster packs, each loaded with 10 cards and a basic Energy or VSTAR marker. Hunt for the most coveted Secret Rares, Special Illustration Rares, and Gold cards from the expansion in this complete box.",
    "imgUrl": "https://i.ibb.co/JjFR8NVL/02801f936817.png",
    "stock": 0,
    "galleryUrls": [
      "https://i.ibb.co/JjFR8NVL/02801f936817.png"
    ],
    "shippingWeight": ""
  },
  {
    "id": 609,
    "setId": "misc",
    "title": "Pokémon TCG: Pokemon Day 2026 Collection",
    "price": "$29.99",
    "soldOut": true,
    "description": "Commemorative Pokémon Day collection offering an array of packs and exclusive promos.",
    "imgUrl": "/images/pokemon-day-2026.png",
    "stock": 0
  },
  {
    "id": 1003,
    "setId": "pokemon-merch",
    "title": "Cute Manta Ray Plush Bag Charm - Perfect Gift for Marine Lovers",
    "price": "$8.99",
    "soldOut": false,
    "description": "Adorable Manta Ray plush bag charm.",
    "imgUrl": "/images/manta-ray.png",
    "stock": 7
  },
  {
    "id": 414,
    "setId": "ascended-heroes",
    "title": "Pokémon TCG: Mega Evolution—Ascended Heroes Collection",
    "price": "$49.99",
    "soldOut": true,
    "description": "An exclusive box celebrating the ascended heroes of the Mega Evolution timeline.",
    "imgUrl": "https://i.ibb.co/0VXYScYd/2c68da566dfc.png",
    "stock": 0,
    "galleryUrls": [
      "https://i.ibb.co/0VXYScYd/2c68da566dfc.png"
    ],
    "shippingWeight": ""
  },
  {
    "id": 304,
    "setId": "prismatic",
    "title": "Pokémon TCG: Scarlet & Violet - Prismatic Evolutions Surprise Box",
    "price": "$46.99",
    "soldOut": true,
    "description": "Open up a world of fun with this special Surprise Box! Contains 4 booster packs, 1 premium foil promo card, and additional deck accessories. A perfect gift for any Pokémon fan looking for a fun opening experience.",
    "imgUrl": "",
    "stock": 0,
    "hidden": true,
    "galleryUrls": [],
    "shippingWeight": ""
  },
  {
    "id": 305,
    "setId": "prismatic",
    "title": "Pokémon TCG: Scarlet & Violet - Prismatic Evolutions Booster Pack",
    "price": "$10.99",
    "soldOut": true,
    "description": "Expand your collection with this authentic Pokémon TCG booster pack. Each pack contains 10 cards and 1 Basic Energy. Look for rare Holo Rares, Ultra Rares, and Special Illustration Rares. Perfect for players and collectors alike!",
    "imgUrl": "/images/ss-booster-bundle.jpg",
    "stock": 0
  },
  {
    "id": 1004,
    "setId": "pokemon-merch",
    "title": "Re-Ment Terrarium Mini Figure Blind Box EX Paldea - Pokémon Licensed Collectible",
    "price": "$15.99",
    "soldOut": false,
    "description": "Series 13 Line-Up\n·Pikachu & Eevee\n·Latias\n·Aron\n·Quilava\n·Oshawott\n·Jolteon\nBlind Box Surprise Format 🎁\n·Buy 1 box, receive 1 random design.\n·Buy a full set (6 boxes), receive all 6 different designs (no duplicates).",
    "imgUrl": "https://i.ibb.co/27xp4NNv/8ae6c3e377ee.png",
    "stock": 25,
    "galleryUrls": [
      "https://i.ibb.co/27xp4NNv/8ae6c3e377ee.png",
      "https://i.ibb.co/pvyy9zsC/3a688343bb8e.png",
      "/images/rement-paldea.png"
    ],
    "shippingWeight": ""
  },
  {
    "id": 1005,
    "setId": "pokemon-merch",
    "title": "Re-Ment Terrarium Mini Figure Blind Box - Pokémon Licensed Collectible",
    "price": "$15.99",
    "soldOut": false,
    "description": "Unique Designs Included\n·Pikachu & Pawmi\n·Fuecoco\n·Quaxly\n·Sprigatito\n·Tatsugiri\n·Clodsire\nBlind Box Surprise Format",
    "imgUrl": "https://i.ibb.co/mCGLnQJv/91ffb803c4ba.png",
    "stock": 25,
    "galleryUrls": [
      "https://i.ibb.co/mCGLnQJv/91ffb803c4ba.png",
      "https://i.ibb.co/RktnmDfq/a4ffeea891dc.png",
      "https://i.ibb.co/PJh8bp2/1f91bad6385e.png"
    ],
    "shippingWeight": ""
  },
  {
    "id": 610,
    "setId": "misc",
    "title": "Pokémon TCG: Suicune Knock Out Collection",
    "price": "$18.99",
    "soldOut": true,
    "description": "A special Knock Out Collection box containing 2 official Pokémon TCG booster packs, 1 collector's metallic coin, and 3 foil promo cards featuring classic fan-favorite Pokémon. A perfect addition to any collection or gift for new collectors!",
    "imgUrl": "/images/suicune-ko.png",
    "stock": 0
  },
  {
    "id": 611,
    "setId": "misc",
    "title": "Pokémon TCG: Kyogre Knock Out Collection",
    "price": "$19.99",
    "soldOut": false,
    "description": "A special Knock Out Collection box containing 2 official Pokémon TCG booster packs, 1 collector's metallic coin, and 3 foil promo cards featuring classic fan-favorite Pokémon. A perfect addition to any collection or gift for new collectors!",
    "imgUrl": "/images/kyogre-ko.png",
    "stock": 1
  },
  {
    "id": 612,
    "setId": "misc",
    "title": "Pokémon TCG: 2-Pack Blister [Raikou]",
    "price": "$19.99",
    "soldOut": false,
    "description": "Expand your collection with this authentic Pokémon TCG booster pack. Each pack contains 10 cards and 1 Basic Energy. Look for rare Holo Rares, Ultra Rares, and Special Illustration Rares. Perfect for players and collectors alike!",
    "imgUrl": "/images/raikou-blister.png",
    "stock": 8
  },
  {
    "id": 613,
    "setId": "misc",
    "title": "Pokémon TCG: Mega Charizard X/Y ex Tin",
    "price": "$39.99",
    "soldOut": true,
    "description": "A sturdy, collectible metal tin featuring stunning Pokémon artwork. Contains 4 or 5 booster packs and a special foil promo card of the featured Pokémon. Perfect for storing cards and adding a premium collectible to your display shelf.",
    "imgUrl": "/images/mega-charizard-tin.png",
    "stock": 0
  },
  {
    "id": 104,
    "setId": "surging-sparks",
    "title": "Pokémon TCG: Scarlet & Violet Surging Sparks Booster Bundle",
    "price": "$48.99",
    "soldOut": true,
    "description": "Get a quick boost to your collection with this official Pokémon TCG Booster Bundle. Contains 6 booster packs from the set, offering a great way to hunt for the top chase cards, rare holos, and special illustration cards without any extra filler accessories.",
    "imgUrl": "/images/pe-sleeved.jpg",
    "stock": 0
  },
  {
    "id": 614,
    "setId": "misc",
    "title": "Pokémon TCG: Paldea Adventure Chest",
    "price": "$79.99",
    "soldOut": true,
    "description": "Uncover a treasure trove of Pokémon goodies with the Adventure Chest. Contains 6 booster packs, 7 foil promo cards, 1 sticker sheet, 1 mini portfolio to store your cards, 1 squishy toy, and a beautiful collector's chest to store your entire collection.",
    "imgUrl": "/images/paldea-chest.png",
    "stock": 0
  },
  {
    "id": 415,
    "setId": "mega-evolution",
    "title": "Pokémon TCG: Mega Evolution Sleeved Booster Pack",
    "price": "$8.49",
    "soldOut": true,
    "description": "A single sleeved booster pack containing 10 cards from the Mega Evolution expansion. Case-fresh and tamper-evident packaging.",
    "imgUrl": "/images/me-sleeved.jpg",
    "stock": 0
  },
  {
    "id": 416,
    "setId": "phantasmal-flames",
    "title": "Pokémon TCG: Phantasmal Flames Sleeved Booster Pack",
    "price": "$8.49",
    "soldOut": true,
    "description": "A single sleeved booster pack from the Phantasmal Flames set. Expand your collection with these haunted and fiery rare pulls!",
    "imgUrl": "/images/pf-sleeved.jpg",
    "stock": 0
  },
  {
    "id": 1106,
    "setId": "perfect-order",
    "title": "Pokémon TCG: Perfect Order Sleeved Booster Pack",
    "price": "$7.49",
    "soldOut": true,
    "description": "Expand your collection with this authentic Pokémon TCG booster pack. Each pack contains 10 cards and 1 Basic Energy. Look for rare Holo Rares, Ultra Rares, and Special Illustration Rares. Perfect for players and collectors alike!",
    "imgUrl": "/images/po-sleeved.png",
    "stock": 0
  },
  {
    "id": 1301,
    "setId": "ascended-heroes",
    "title": "Pokémon TCG: Mega Evolution—Ascended Heroes 2-Pack Blister",
    "price": "$22.99",
    "soldOut": true,
    "description": "Contains 2 Ascended Heroes booster packs, a collectible coin, and a special foil promo card featuring Tangela. A great entry point for the newest Mega Evolution expansion.",
    "imgUrl": "https://i.ibb.co/cSKk2v9y/c97e6cf95e77.png",
    "stock": 0,
    "galleryUrls": [
      "https://i.ibb.co/cSKk2v9y/c97e6cf95e77.png"
    ],
    "shippingWeight": ""
  },
  {
    "id": 1302,
    "setId": "ascended-heroes",
    "title": "Pokémon TCG: Mega Evolution—Ascended Heroes Tech Sticker Collection",
    "price": "$34.99",
    "soldOut": true,
    "description": "Includes 3 Ascended Heroes booster packs, a set of exclusive Pokémon tech stickers, and a special foil promo card.",
    "imgUrl": "https://i.ibb.co/Rk0FpnQb/a1ccdc351ac1.png",
    "stock": 0,
    "galleryUrls": [
      "https://i.ibb.co/Rk0FpnQb/a1ccdc351ac1.png"
    ],
    "shippingWeight": ""
  },
  {
    "id": 1303,
    "setId": "ascended-heroes",
    "title": "Pokémon TCG: Mega Evolution—Ascended Heroes Mini Tin",
    "price": "$24.99",
    "soldOut": true,
    "description": "Collectible mini tin containing 2 Ascended Heroes booster packs and 1 art card. Collect all 5 designs featuring fan-favorite Pokémon!",
    "imgUrl": "https://i.ibb.co/TM74jRQ3/78f2520a8295.png",
    "stock": 0,
    "galleryUrls": [
      "https://i.ibb.co/TM74jRQ3/78f2520a8295.png"
    ],
    "shippingWeight": ""
  },
  {
    "id": 1304,
    "setId": "ascended-heroes",
    "title": "Pokémon TCG: Mega Evolution—Ascended Heroes Elite Trainer Box",
    "price": "$159.99",
    "soldOut": false,
    "description": "The ultimate Ascended Heroes experience! Includes 9 booster packs, a full-art promo card, 65 card sleeves, energy cards, dice, damage counters, and a premium collector's box featuring legendary artwork.",
    "imgUrl": "https://i.ibb.co/QFqjsyCQ/fe17944ec0ef.png",
    "stock": 1,
    "galleryUrls": [
      "https://i.ibb.co/QFqjsyCQ/fe17944ec0ef.png"
    ],
    "shippingWeight": ""
  },
  {
    "id": 1305,
    "title": "Mystery Graded Card #1",
    "price": ".00",
    "imgUrl": "/images/graded-cards/slab-1.png",
    "setId": "graded-cards",
    "condition": "PSA 10",
    "stock": 1,
    "isPreorder": false,
    "soldOut": false,
    "description": "Expand your collection with a premium, officially certified and graded Pokémon card. Every slab is preserved in an archival-grade protective shell, rated in Mint condition (PSA 10 / CGC Gem Mint). Ideal for investment, long-term preservation, and display in any serious collector's gallery. Card selection is random and features top fan-favorites from modern and vintage sets.",
    "hidden": true,
    "galleryUrls": [
      "/images/graded-cards/slab-1.png"
    ],
    "shippingWeight": ""
  },
  {
    "id": 1306,
    "title": "Mystery Graded Card #2",
    "price": ".00",
    "imgUrl": "/images/graded-cards/slab-2.png",
    "setId": "graded-cards",
    "condition": "PSA 10",
    "stock": 1,
    "isPreorder": false,
    "soldOut": false,
    "description": "Expand your collection with a premium, officially certified and graded Pokémon card. Every slab is preserved in an archival-grade protective shell, rated in Mint condition (PSA 10 / CGC Gem Mint). Ideal for investment, long-term preservation, and display in any serious collector's gallery. Card selection is random and features top fan-favorites from modern and vintage sets.",
    "hidden": true,
    "galleryUrls": [
      "/images/graded-cards/slab-2.png"
    ],
    "shippingWeight": ""
  },
  {
    "id": 1307,
    "title": "Mystery Graded Card #3",
    "price": ".00",
    "imgUrl": "/images/graded-cards/slab-3.png",
    "setId": "graded-cards",
    "condition": "PSA 10",
    "stock": 1,
    "isPreorder": false,
    "soldOut": false,
    "description": "Expand your collection with a premium, officially certified and graded Pokémon card. Every slab is preserved in an archival-grade protective shell, rated in Mint condition (PSA 10 / CGC Gem Mint). Ideal for investment, long-term preservation, and display in any serious collector's gallery. Card selection is random and features top fan-favorites from modern and vintage sets.",
    "hidden": true,
    "galleryUrls": [
      "/images/graded-cards/slab-3.png"
    ],
    "shippingWeight": ""
  },
  {
    "id": 1308,
    "title": "Mystery Graded Card #4",
    "price": ".00",
    "imgUrl": "/images/graded-cards/slab-4.png",
    "setId": "graded-cards",
    "condition": "PSA 10",
    "stock": 1,
    "isPreorder": false,
    "soldOut": false,
    "description": "Expand your collection with a premium, officially certified and graded Pokémon card. Every slab is preserved in an archival-grade protective shell, rated in Mint condition (PSA 10 / CGC Gem Mint). Ideal for investment, long-term preservation, and display in any serious collector's gallery. Card selection is random and features top fan-favorites from modern and vintage sets.",
    "hidden": true,
    "galleryUrls": [
      "/images/graded-cards/slab-4.png"
    ],
    "shippingWeight": ""
  },
  {
    "id": 1309,
    "title": "Mystery Graded Card #5",
    "price": ".00",
    "imgUrl": "/images/graded-cards/slab-5.png",
    "setId": "graded-cards",
    "condition": "PSA 10",
    "stock": 1,
    "isPreorder": false,
    "soldOut": false,
    "description": "Expand your collection with a premium, officially certified and graded Pokémon card. Every slab is preserved in an archival-grade protective shell, rated in Mint condition (PSA 10 / CGC Gem Mint). Ideal for investment, long-term preservation, and display in any serious collector's gallery. Card selection is random and features top fan-favorites from modern and vintage sets.",
    "hidden": true,
    "galleryUrls": [
      "/images/graded-cards/slab-5.png"
    ],
    "shippingWeight": ""
  },
  {
    "id": 1310,
    "title": "Mystery Graded Card #6",
    "price": ".00",
    "imgUrl": "/images/graded-cards/slab-6.png",
    "setId": "graded-cards",
    "condition": "PSA 10",
    "stock": 1,
    "isPreorder": false,
    "soldOut": false,
    "description": "Expand your collection with a premium, officially certified and graded Pokémon card. Every slab is preserved in an archival-grade protective shell, rated in Mint condition (PSA 10 / CGC Gem Mint). Ideal for investment, long-term preservation, and display in any serious collector's gallery. Card selection is random and features top fan-favorites from modern and vintage sets.",
    "hidden": true,
    "galleryUrls": [
      "/images/graded-cards/slab-6.png"
    ],
    "shippingWeight": ""
  },
  {
    "id": 1311,
    "title": "Mystery Graded Card #7",
    "price": ".00",
    "imgUrl": "/images/graded-cards/slab-7.png",
    "setId": "graded-cards",
    "condition": "PSA 10",
    "stock": 1,
    "isPreorder": false,
    "soldOut": false,
    "description": "Expand your collection with a premium, officially certified and graded Pokémon card. Every slab is preserved in an archival-grade protective shell, rated in Mint condition (PSA 10 / CGC Gem Mint). Ideal for investment, long-term preservation, and display in any serious collector's gallery. Card selection is random and features top fan-favorites from modern and vintage sets.",
    "hidden": true,
    "galleryUrls": [
      "/images/graded-cards/slab-7.png"
    ],
    "shippingWeight": ""
  },
  {
    "id": 1312,
    "title": "Mystery Graded Card #8",
    "price": ".00",
    "imgUrl": "/images/graded-cards/slab-8.png",
    "setId": "graded-cards",
    "condition": "PSA 10",
    "stock": 1,
    "isPreorder": false,
    "soldOut": false,
    "description": "Expand your collection with a premium, officially certified and graded Pokémon card. Every slab is preserved in an archival-grade protective shell, rated in Mint condition (PSA 10 / CGC Gem Mint). Ideal for investment, long-term preservation, and display in any serious collector's gallery. Card selection is random and features top fan-favorites from modern and vintage sets.",
    "hidden": true,
    "galleryUrls": [
      "/images/graded-cards/slab-8.png"
    ],
    "shippingWeight": ""
  },
  {
    "id": 1313,
    "title": "Mystery Graded Card #9",
    "price": ".00",
    "imgUrl": "/images/graded-cards/slab-9.png",
    "setId": "graded-cards",
    "condition": "PSA 10",
    "stock": 1,
    "isPreorder": false,
    "soldOut": false,
    "description": "Expand your collection with a premium, officially certified and graded Pokémon card. Every slab is preserved in an archival-grade protective shell, rated in Mint condition (PSA 10 / CGC Gem Mint). Ideal for investment, long-term preservation, and display in any serious collector's gallery. Card selection is random and features top fan-favorites from modern and vintage sets.",
    "hidden": true,
    "galleryUrls": [
      "/images/graded-cards/slab-9.png"
    ],
    "shippingWeight": ""
  },
  {
    "id": 1314,
    "title": "Mystery Graded Card #10",
    "price": ".00",
    "imgUrl": "/images/graded-cards/slab-10.png",
    "setId": "graded-cards",
    "condition": "PSA 10",
    "stock": 1,
    "isPreorder": false,
    "soldOut": false,
    "description": "Expand your collection with a premium, officially certified and graded Pokémon card. Every slab is preserved in an archival-grade protective shell, rated in Mint condition (PSA 10 / CGC Gem Mint). Ideal for investment, long-term preservation, and display in any serious collector's gallery. Card selection is random and features top fan-favorites from modern and vintage sets.",
    "hidden": true,
    "galleryUrls": [
      "/images/graded-cards/slab-10.png"
    ],
    "shippingWeight": ""
  },
  {
    "id": 1315,
    "title": "Mystery Graded Card #11",
    "price": ".00",
    "imgUrl": "/images/graded-cards/slab-11.png",
    "setId": "graded-cards",
    "condition": "PSA 10",
    "stock": 1,
    "isPreorder": false,
    "soldOut": false,
    "description": "Expand your collection with a premium, officially certified and graded Pokémon card. Every slab is preserved in an archival-grade protective shell, rated in Mint condition (PSA 10 / CGC Gem Mint). Ideal for investment, long-term preservation, and display in any serious collector's gallery. Card selection is random and features top fan-favorites from modern and vintage sets.",
    "hidden": true,
    "galleryUrls": [
      "/images/graded-cards/slab-11.png"
    ],
    "shippingWeight": ""
  },
  {
    "id": 1316,
    "title": "Mystery Graded Card #12",
    "price": ".00",
    "imgUrl": "/images/graded-cards/slab-12.png",
    "setId": "graded-cards",
    "condition": "PSA 10",
    "stock": 1,
    "isPreorder": false,
    "soldOut": false,
    "description": "Expand your collection with a premium, officially certified and graded Pokémon card. Every slab is preserved in an archival-grade protective shell, rated in Mint condition (PSA 10 / CGC Gem Mint). Ideal for investment, long-term preservation, and display in any serious collector's gallery. Card selection is random and features top fan-favorites from modern and vintage sets.",
    "hidden": true,
    "galleryUrls": [
      "/images/graded-cards/slab-12.png"
    ],
    "shippingWeight": ""
  },
  {
    "id": 1317,
    "title": "Mystery Graded Card #13",
    "price": ".00",
    "imgUrl": "/images/graded-cards/slab-13.png",
    "setId": "graded-cards",
    "condition": "PSA 10",
    "stock": 1,
    "isPreorder": false,
    "soldOut": false,
    "description": "Expand your collection with a premium, officially certified and graded Pokémon card. Every slab is preserved in an archival-grade protective shell, rated in Mint condition (PSA 10 / CGC Gem Mint). Ideal for investment, long-term preservation, and display in any serious collector's gallery. Card selection is random and features top fan-favorites from modern and vintage sets.",
    "hidden": true,
    "galleryUrls": [
      "/images/graded-cards/slab-13.png"
    ],
    "shippingWeight": ""
  },
  {
    "id": 1318,
    "title": "Mystery Graded Card #14",
    "price": ".00",
    "imgUrl": "/images/graded-cards/slab-14.png",
    "setId": "graded-cards",
    "condition": "PSA 10",
    "stock": 1,
    "isPreorder": false,
    "soldOut": false,
    "description": "Expand your collection with a premium, officially certified and graded Pokémon card. Every slab is preserved in an archival-grade protective shell, rated in Mint condition (PSA 10 / CGC Gem Mint). Ideal for investment, long-term preservation, and display in any serious collector's gallery. Card selection is random and features top fan-favorites from modern and vintage sets.",
    "hidden": true,
    "galleryUrls": [
      "/images/graded-cards/slab-14.png"
    ],
    "shippingWeight": ""
  },
  {
    "id": 1319,
    "title": "Mystery Graded Card #15",
    "price": ".00",
    "imgUrl": "/images/graded-cards/slab-15.png",
    "setId": "graded-cards",
    "condition": "PSA 10",
    "stock": 1,
    "isPreorder": false,
    "soldOut": false,
    "description": "Expand your collection with a premium, officially certified and graded Pokémon card. Every slab is preserved in an archival-grade protective shell, rated in Mint condition (PSA 10 / CGC Gem Mint). Ideal for investment, long-term preservation, and display in any serious collector's gallery. Card selection is random and features top fan-favorites from modern and vintage sets.",
    "hidden": true,
    "galleryUrls": [
      "/images/graded-cards/slab-15.png"
    ],
    "shippingWeight": ""
  },
  {
    "id": 1320,
    "title": "Mystery Graded Card #16",
    "price": ".00",
    "imgUrl": "/images/graded-cards/slab-16.png",
    "setId": "graded-cards",
    "condition": "PSA 10",
    "stock": 1,
    "isPreorder": false,
    "soldOut": false,
    "description": "Expand your collection with a premium, officially certified and graded Pokémon card. Every slab is preserved in an archival-grade protective shell, rated in Mint condition (PSA 10 / CGC Gem Mint). Ideal for investment, long-term preservation, and display in any serious collector's gallery. Card selection is random and features top fan-favorites from modern and vintage sets.",
    "hidden": true,
    "galleryUrls": [
      "/images/graded-cards/slab-16.png"
    ],
    "shippingWeight": ""
  },
  {
    "id": 1321,
    "title": "Mystery Graded Card #17",
    "price": ".00",
    "imgUrl": "/images/graded-cards/slab-17.png",
    "setId": "graded-cards",
    "condition": "PSA 10",
    "stock": 1,
    "isPreorder": false,
    "soldOut": false,
    "description": "Expand your collection with a premium, officially certified and graded Pokémon card. Every slab is preserved in an archival-grade protective shell, rated in Mint condition (PSA 10 / CGC Gem Mint). Ideal for investment, long-term preservation, and display in any serious collector's gallery. Card selection is random and features top fan-favorites from modern and vintage sets.",
    "hidden": true,
    "galleryUrls": [
      "/images/graded-cards/slab-17.png"
    ],
    "shippingWeight": ""
  },
  {
    "id": 1322,
    "title": "Mystery Graded Card #18",
    "price": ".00",
    "imgUrl": "/images/graded-cards/slab-18.png",
    "setId": "graded-cards",
    "condition": "PSA 10",
    "stock": 1,
    "isPreorder": false,
    "soldOut": false,
    "description": "Expand your collection with a premium, officially certified and graded Pokémon card. Every slab is preserved in an archival-grade protective shell, rated in Mint condition (PSA 10 / CGC Gem Mint). Ideal for investment, long-term preservation, and display in any serious collector's gallery. Card selection is random and features top fan-favorites from modern and vintage sets.",
    "hidden": true,
    "galleryUrls": [
      "/images/graded-cards/slab-18.png"
    ],
    "shippingWeight": ""
  },
  {
    "id": 1323,
    "title": "Mystery Graded Card #19",
    "price": ".00",
    "imgUrl": "/images/graded-cards/slab-19.png",
    "setId": "graded-cards",
    "condition": "PSA 10",
    "stock": 1,
    "isPreorder": false,
    "soldOut": false,
    "description": "Expand your collection with a premium, officially certified and graded Pokémon card. Every slab is preserved in an archival-grade protective shell, rated in Mint condition (PSA 10 / CGC Gem Mint). Ideal for investment, long-term preservation, and display in any serious collector's gallery. Card selection is random and features top fan-favorites from modern and vintage sets.",
    "hidden": true,
    "galleryUrls": [
      "/images/graded-cards/slab-19.png"
    ],
    "shippingWeight": ""
  },
  {
    "id": 1324,
    "title": "Mystery Graded Card #20",
    "price": ".00",
    "imgUrl": "/images/graded-cards/slab-20.png",
    "setId": "graded-cards",
    "condition": "PSA 10",
    "stock": 1,
    "isPreorder": false,
    "soldOut": false,
    "description": "Expand your collection with a premium, officially certified and graded Pokémon card. Every slab is preserved in an archival-grade protective shell, rated in Mint condition (PSA 10 / CGC Gem Mint). Ideal for investment, long-term preservation, and display in any serious collector's gallery. Card selection is random and features top fan-favorites from modern and vintage sets.",
    "hidden": true,
    "galleryUrls": [
      "/images/graded-cards/slab-20.png"
    ],
    "shippingWeight": ""
  },
  {
    "id": 1325,
    "title": "Mystery Graded Card #21",
    "price": ".00",
    "imgUrl": "/images/graded-cards/slab-21.png",
    "setId": "graded-cards",
    "condition": "PSA 10",
    "stock": 1,
    "isPreorder": false,
    "soldOut": false,
    "description": "Expand your collection with a premium, officially certified and graded Pokémon card. Every slab is preserved in an archival-grade protective shell, rated in Mint condition (PSA 10 / CGC Gem Mint). Ideal for investment, long-term preservation, and display in any serious collector's gallery. Card selection is random and features top fan-favorites from modern and vintage sets.",
    "hidden": true,
    "galleryUrls": [
      "/images/graded-cards/slab-21.png"
    ],
    "shippingWeight": ""
  },
  {
    "id": 1326,
    "title": "Destined rival Single booster pack",
    "price": "8.99",
    "setId": "misc",
    "imgUrl": "https://i.ibb.co/XZVV03wk/81dfd5932fa2.png",
    "description": "Expand your collection with this authentic Pokémon TCG booster pack. Each pack contains 10 cards and 1 Basic Energy. Look for rare Holo Rares, Ultra Rares, and Special Illustration Rares. Perfect for players and collectors alike!",
    "stock": 2,
    "hidden": false,
    "galleryUrls": [
      "https://i.ibb.co/XZVV03wk/81dfd5932fa2.png"
    ],
    "soldOut": false,
    "shippingWeight": ""
  },
  {
    "id": 1327,
    "title": "Pokémon TCG: Scarlet & Violet—Prismatic Evolutions Poster collection ",
    "price": "39.99",
    "setId": "prismatic",
    "imgUrl": "https://i.ibb.co/93wd9GtQ/dfcc21797ea7.png",
    "description": "The Pokémon TCG: Scarlet & Violet—Prismatic Evolutions Poster Collection includes:\n• 3 foil promo cards featuring Flareon, Vaporeon, and Jolteon\n• 1 poster featuring 27 card illustrations of Eevee and its Evolutions\n• 3 Pokémon TCG: Scarlet & Violet—Prismatic Evolutions booster packs\n• A code card for Pokémon TCG Live",
    "stock": 0,
    "hidden": false,
    "galleryUrls": [
      "https://i.ibb.co/93wd9GtQ/dfcc21797ea7.png"
    ],
    "soldOut": true,
    "shippingWeight": ""
  },
  {
    "id": 1328,
    "title": "Mega Latias ex Box - Miscellaneous Cards",
    "price": "39.99",
    "setId": "graded-cards",
    "imgUrl": "https://i.ibb.co/7JSjB913/7b7af9ae4ddc.png",
    "description": "The Pokémon TCG: Mega Latias ex Box includes:\n• 1 foil promo card featuring Mega Latias ex\n• 1 oversize lenticular promo card featuring Mega Latias ex\n• 4 Pokémon TCG booster packs",
    "stock": 1,
    "hidden": false,
    "galleryUrls": [
      "https://i.ibb.co/7JSjB913/7b7af9ae4ddc.png"
    ],
    "soldOut": false,
    "shippingWeight": ""
  }
];
