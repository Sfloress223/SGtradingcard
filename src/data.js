export const SETS = [
  {
    "id": "graded-cards",
    "name": "Graded Cards",
    "imgUrl": "/images/charizard.png",
    "bannerUrl": "/images/charizard.png",
    "color": "#FFD700",
    "emoji": "🏆"
  },
  {
    "id": "singles",
    "name": "Singles",
    "imgUrl": "/images/singles.jpg",
    "bannerUrl": "/images/singles.jpg",
    "color": "#4169E1",
    "emoji": "🃏"
  },
  {
    "id": "all-pokemon",
    "name": "English Pokémon",
    "imgUrl": "https://images.pokemontcg.io/base1/logo.png",
    "bannerUrl": "https://images.pokemontcg.io/base1/logo.png",
    "color": "#E3350D",
    "emoji": "📦"
  },
  {
    "id": "bw-era",
    "parent": "all-pokemon",
    "name": "Black & White Era",
    "imgUrl": "https://d1i787aglh9bmb.cloudfront.net/assets/img/sv-expansions/sv10dot5/logo/en-us/sv10pt5-logo.png",
    "bannerUrl": "https://d1i787aglh9bmb.cloudfront.net/assets/img/sv-expansions/sv10dot5/logo/en-us/sv10pt5-logo.png",
    "color": "#000000"
  },
  {
    "id": "prismatic",
    "parent": "all-pokemon",
    "name": "Prismatic Evolutions",
    "imgUrl": "https://images.pokemontcg.io/sv8pt5/symbol.png",
    "bannerUrl": "https://images.pokemontcg.io/sv8pt5/logo.png",
    "color": "#ff66c4"
  },
  {
    "id": "surging-sparks",
    "parent": "all-pokemon",
    "name": "Surging Sparks",
    "imgUrl": "https://images.pokemontcg.io/sv8/symbol.png",
    "bannerUrl": "https://images.pokemontcg.io/sv8/logo.png",
    "color": "#E0AA3E"
  },
  {
    "id": "151",
    "parent": "all-pokemon",
    "name": "Scarlet & Violet 151",
    "imgUrl": "https://images.pokemontcg.io/sv3pt5/symbol.png",
    "bannerUrl": "https://images.pokemontcg.io/sv3pt5/logo.png",
    "color": "#8A2BE2"
  },
  {
    "id": "misc",
    "parent": "all-pokemon",
    "name": "Miscellaneous / Collections",
    "imgUrl": "https://images.pokemontcg.io/sve/symbol.png",
    "bannerUrl": "https://images.pokemontcg.io/sve/logo.png",
    "color": "#666666",
    "emoji": "📦"
  },
  {
    "id": "japanese",
    "name": "Japanese Pokémon",
    "imgUrl": "/images/japanese-box.png",
    "bannerUrl": "/images/japanese-box.png",
    "color": "#D0112b",
    "emoji": "🇯🇵"
  },
  {
    "id": "chinese",
    "name": "Chinese Pokémon",
    "imgUrl": "/images/chinese-box.png",
    "bannerUrl": "/images/chinese-box.png",
    "color": "#DA251D",
    "emoji": "🇨🇳"
  },
  {
    "id": "other-tcg",
    "name": "Other / Future TCGs",
    "imgUrl": "/images/one-piece-group.jpg",
    "bannerUrl": "/images/one-piece-group.jpg",
    "color": "#4B0082",
    "emoji": "🎴"
  },
  {
    "id": "pokemon-merch",
    "name": "Pokémon Merchandise & Toys",
    "imgUrl": "/images/merch.svg",
    "bannerUrl": "/images/merch.svg",
    "color": "#FF8C00",
    "emoji": "🧸"
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
    "stock": 3
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
    "description": "Includes 6 Prismatic Evolutions booster packs wrapped in exclusive bundle packaging.",
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
    "setId": "bw-era",
    "title": "Pokémon TCG: Unova Mini Tin",
    "price": "$20.99",
    "soldOut": true,
    "description": "Collectible mini tin featuring Unova region Pokémon artwork. Contains 2 booster packs and 1 art card. Collect all designs!",
    "imgUrl": "https://images.squarespace-cdn.com/content/v1/68e06d2a2c7b551478df5338/1971202f-3b55-40c3-b97d-2c666ec4eda5/SuzieQ+LOGO+%2830%29.png?format=500w",
    "stock": 0,
    "hidden": false,
    "galleryUrls": [
      "https://images.squarespace-cdn.com/content/v1/68e06d2a2c7b551478df5338/1971202f-3b55-40c3-b97d-2c666ec4eda5/SuzieQ+LOGO+%2830%29.png?format=500w"
    ],
    "shippingWeight": ""
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
    "id": 103,
    "setId": "surging-sparks",
    "title": "Pokémon TCG: Scarlet & Violet-Surging Sparks Booster Box",
    "price": "$234.99",
    "soldOut": true,
    "description": "Contains 36 Surging Sparks booster packs.",
    "imgUrl": "https://i.ibb.co/JjFR8NVL/02801f936817.png",
    "stock": 0,
    "galleryUrls": [
      "https://i.ibb.co/JjFR8NVL/02801f936817.png"
    ],
    "shippingWeight": ""
  },
  {
    "id": 1003,
    "setId": "misc",
    "title": "Cute Manta Ray Plush Bag Charm - Perfect Gift for Marine Lovers",
    "price": "$8.99",
    "soldOut": false,
    "description": "Adorable Manta Ray plush bag charm.",
    "imgUrl": "/images/manta-ray.png",
    "stock": 7,
    "hidden": false,
    "galleryUrls": [
      "/images/manta-ray.png"
    ],
    "shippingWeight": ""
  },
  {
    "id": 305,
    "setId": "prismatic",
    "title": "Pokémon TCG: Scarlet & Violet - Prismatic Evolutions Booster Pack",
    "price": "$10.99",
    "soldOut": true,
    "description": "Contains 10 cards from the gorgeous Prismatic Evolutions set.",
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
    "description": "Suicune Knock Out Collection featuring 2 booster packs and 3 foil promo cards.",
    "imgUrl": "/images/suicune-ko.png",
    "stock": 0
  },
  {
    "id": 611,
    "setId": "misc",
    "title": "Pokémon TCG: Kyogre Knock Out Collection",
    "price": "$19.99",
    "soldOut": false,
    "description": "Kyogre Knock Out Collection featuring 2 booster packs and 3 foil promo cards.",
    "imgUrl": "/images/kyogre-ko.png",
    "stock": 1
  },
  {
    "id": 612,
    "setId": "misc",
    "title": "Pokémon TCG: 2-Pack Blister [Raikou]",
    "price": "$19.99",
    "soldOut": false,
    "description": "Includes 2 booster packs and a special Raikou promotional coin and card.",
    "imgUrl": "/images/raikou-blister.png",
    "stock": 11
  },
  {
    "id": 104,
    "setId": "surging-sparks",
    "title": "Pokémon TCG: Scarlet & Violet Surging Sparks Booster Bundle",
    "price": "$48.99",
    "soldOut": true,
    "description": "Contains 6 Surging Sparks booster packs to boost your collection.",
    "imgUrl": "https://i.ibb.co/qzjqNBY/5fe401d9e67b.png",
    "stock": 0,
    "hidden": false,
    "galleryUrls": [
      "https://i.ibb.co/qzjqNBY/5fe401d9e67b.png"
    ],
    "shippingWeight": ""
  },
  {
    "id": 614,
    "setId": "misc",
    "title": "Pokémon TCG: Paldea Adventure Chest",
    "price": "$79.99",
    "soldOut": true,
    "description": "A massive chest of Pokémon TCG treasures from the Paldea region.",
    "imgUrl": "/images/paldea-chest.png",
    "stock": 0
  },
  {
    "id": 1326,
    "title": "Destined rival Single booster pack",
    "price": "$8.99",
    "setId": "misc",
    "imgUrl": "https://i.ibb.co/XZVV03wk/81dfd5932fa2.png",
    "description": "",
    "stock": 4,
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
    "id": 1337,
    "title": "Pokémon TCG: Terastal Fest ex Booster Pack",
    "price": "$12.99",
    "setId": "japanese",
    "imgUrl": "https://i.ibb.co/qYkXkrwr/c496048e47a5.png",
    "description": "Each Japanese Terastal Fest ex Booster Pack contains 10 random cards.",
    "stock": 0,
    "hidden": false,
    "galleryUrls": [
      "https://i.ibb.co/qYkXkrwr/c496048e47a5.png",
      "https://i.ibb.co/yFVB4qKL/7621392d34d4.png"
    ],
    "soldOut": true,
    "shippingWeight": ""
  },
  {
    "id": 1338,
    "title": "Pokemon TCG: The Glory of Team Rocket Booster Pack",
    "price": "$4.99",
    "setId": "japanese",
    "imgUrl": "https://i.ibb.co/ZpSHWrLt/bdf13cc9e1c1.png",
    "description": "Each Japanese Glory of Team Rocket Booster Pack contains 5 random cards.",
    "stock": 48,
    "hidden": false,
    "galleryUrls": [
      "https://i.ibb.co/ZpSHWrLt/bdf13cc9e1c1.png",
      "https://i.ibb.co/LX7zSr7v/6a33a69b50b9.png"
    ],
    "soldOut": false,
    "shippingWeight": ""
  }
];
