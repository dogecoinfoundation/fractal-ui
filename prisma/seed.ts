import { type Prisma, PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

function randomDate() {
  const start = new Date(1983, 5, 12);
  const end = new Date(2025, 11, 31);

  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
}

const mintData: Prisma.MintCreateInput[] = [
  {
    title: "Mona Lisa",
    description:
      "World-renowned Renaissance portrait by Leonardo da Vinci, celebrated for its enigmatic smile and exquisite detail.",
    created_at: randomDate(),
    metadata: {
      category: "Art",
      location: "France",
      artist: "Leonardo da Vinci",
      year: 1503,
    },
    fraction_count: 1000,
    hash: "550e8400-e29b-41d4-a716-446655440000",
    feed_url: "https://feed.tokenizedassets.example.com/asset_1",
    block_height: 1200001,
    transaction_hash: "76199f07-7c4b-4d38-9284-32a9fa410a0d",
  },
  {
    title: "Starry Night",
    description:
      "Iconic post-impressionist masterpiece depicting a swirling night sky over Saint-Remy by Dutch artist Vincent van Gogh.",
    created_at: randomDate(),
    metadata: {
      category: "Art",
      location: "Netherlands",
      artist: "Vincent van Gogh",
      year: 1889,
      medium: "Oil on canvas",
    },
    fraction_count: 2000,
    hash: "c9bf9e57-1685-4c89-bafb-ff5af830be8a",
    feed_url: "https://feed.tokenizedassets.example.com/asset_2",
    block_height: 1200002,
    transaction_hash: "94c7e79a-68be-4630-a4fe-087866a180e7",
  },
  {
    title: "Stark Industries Arc Reactor Facility",
    description:
      "Fictional state-of-the-art Arc Reactor power plant built by Stark Industries, delivering clean limitless energy.",
    created_at: randomDate(),
    metadata: {
      category: "Industrial",
      company: "Stark Industries",
      location: "Long Island",
      capacity_mw: 25,
      technology: "Arc Reactor",
    },
    fraction_count: 3000,
    hash: "1b4e28ba-2fa1-11d2-883f-0016d3cca427",
    feed_url: "https://feed.tokenizedassets.example.com/asset_3",
    block_height: 1200003,
    transaction_hash: "6420d1b0-b5bf-4d5e-a2bd-d0f5739ed2ee",
  },
  {
    title: "Burj Khalifa Penthouse",
    description:
      "Ultra-luxury 150th-floor penthouse in Dubai's Burj Khalifa with panoramic skyline views and opulent finishes.",
    created_at: randomDate(),
    metadata: {
      category: "RealEstate",
      city: "Dubai",
      floor: 150,
      area_sqft: 6500,
      bedrooms: 5,
    },
    fraction_count: 4000,
    hash: "6fa459ea-ee8a-3ca4-894e-db77e160355e",
    feed_url: "https://feed.tokenizedassets.example.com/asset_4",
    block_height: 1200004,
    transaction_hash: "c0a851ba-8d6f-4e3d-bf7e-91d53feda1e4",
  },
  {
    title: "1952 Mickey Mantle Card",
    description:
      "Highly sought-after 1952 Topps rookie baseball card of legend Mickey Mantle graded PSA 10 Gem Mint.",
    created_at: randomDate(),
    metadata: {
      category: "Collectible",
      sport: "Baseball",
      grade: "PSA 10",
      edition: 1952,
    },
    fraction_count: 5000,
    hash: "e4eaaaf2-d142-11e1-b3e4-080027620cdd",
    feed_url: "https://feed.tokenizedassets.example.com/asset_5",
    block_height: 1200005,
    transaction_hash: "fa5c8b0e-45e8-4973-a4a9-c765970e7d32",
  },
  {
    title: "100kg Gold Bar",
    description:
      "London Bullion Market Association-certified 100-kilogram 99.99% pure gold investment bar, serial GOLD-100KG-001.",
    created_at: randomDate(),
    metadata: {
      category: "Commodity",
      type: "Gold",
      purity: "99.99",
      serial_number: "GOLD-100KG-001",
    },
    fraction_count: 6000,
    hash: "2c1b9af3-29a8-4362-9fdc-56d83d0878b4",
    feed_url: "https://feed.tokenizedassets.example.com/asset_6",
    block_height: 1200006,
    transaction_hash: "da44c4d5-f89f-4fdd-869e-72c3c1de6f31",
  },
  {
    title: "North Sea Wind Farm",
    description:
      "Large-scale offshore wind farm in the North Sea featuring 120 turbines and 900 MW of renewable capacity.",
    created_at: randomDate(),
    metadata: {
      category: "Energy",
      type: "Wind",
      turbines: 120,
      capacity_mw: 900,
    },
    fraction_count: 7000,
    hash: "45c6a0de-66d3-4a55-bb5d-f83401a4e944",
    feed_url: "https://feed.tokenizedassets.example.com/asset_7",
    block_height: 1200007,
    transaction_hash: "bf8973aa-31d0-4aa2-9e53-58e32e41ff1e",
  },
  {
    title: "Pink Star Diamond",
    description:
      "Record-breaking 59.60-carat Fancy Vivid Pink diamond of Internally Flawless clarity known as the Pink Star.",
    created_at: randomDate(),
    metadata: {
      category: "Gemstone",
      type: "Diamond",
      color_grade: "Fancy Vivid Pink",
      clarity: "IF",
    },
    fraction_count: 8000,
    hash: "ed3b0d04-7c84-4e6b-aca2-ec6b6d5c38e0",
    feed_url: "https://feed.tokenizedassets.example.com/asset_8",
    block_height: 1200008,
    transaction_hash: "6c50b0b9-4fa1-4f4e-8c5c-d103f0718f2c",
  },
  {
    title: "1962 Ferrari 250 GTO",
    description:
      "Legendary 1962 Ferrari 250 GTO race car, one of only 36 built, renowned for its rarity and 174 mph top speed.",
    created_at: randomDate(),
    metadata: {
      category: "Automobile",
      brand: "Ferrari",
      units_produced: 36,
      top_speed_mph: 174,
    },
    fraction_count: 9000,
    hash: "3f2504e0-4f89-11d3-9a0c-0305e82c3301",
    feed_url: "https://feed.tokenizedassets.example.com/asset_9",
    block_height: 1200009,
    transaction_hash: "82c07121-2e52-4ac8-af4e-4df75f1a4bb7",
  },
  {
    title: "BAYC #4121",
    description:
      "Unique Bored Ape Yacht Club NFT #4121 from the blue-chip Ethereum collection featuring several rare traits.",
    created_at: randomDate(),
    metadata: {
      category: "NFT",
      collection: "BAYC",
      mint_date: "2021-05-01",
      traits_count: 6,
    },
    fraction_count: 10000,
    hash: "9a2f4b6d-7e1e-47b2-9fcf-5f5e49f3c3ad",
    feed_url: "https://feed.tokenizedassets.example.com/asset_10",
    block_height: 1200010,
    transaction_hash: "e103b391-6904-45f8-bf88-b54aa0c16abf",
  },
  {
    title: "Stradivarius Violin 1715",
    description:
      "Exquisite 1715 Stradivarius violin crafted by Antonio Stradivari, preserved in excellent concert-ready condition.",
    created_at: randomDate(),
    metadata: {
      category: "Music",
      type: "Instrument",
      maker: "Antonio Stradivari",
      condition: "Excellent",
    },
    fraction_count: 11000,
    hash: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    feed_url: "https://feed.tokenizedassets.example.com/asset_11",
    block_height: 1200011,
    transaction_hash: "f2c2d537-cc3b-4610-8b98-e2ce42928f0b",
  },
  {
    title: "Amazon Rainforest Acre",
    description:
      "One-acre conservation parcel within Brazil's Amazon rainforest boasting exceptional biodiversity and protected status.",
    created_at: randomDate(),
    metadata: {
      category: "Conservation",
      location: "Brazil",
      biodiversity_index: 9.8,
      protected_status: true,
    },
    fraction_count: 12000,
    hash: "20b482d3-e454-4d46-8db9-9d1d6e9072d9",
    feed_url: "https://feed.tokenizedassets.example.com/asset_12",
    block_height: 1200012,
    transaction_hash: "c1a4c964-fab4-4143-a7fe-6dce46c19269",
  },
  {
    title: "Lunar Land Plot",
    description:
      "Prime one-acre tract in Mare Tranquillitatis on the Moon, complete with precise selenographic coordinates.",
    created_at: randomDate(),
    metadata: {
      category: "Space",
      body: "Moon",
      quadrant: "Mare Tranquillitatis",
      coordinates: "0.67408N,23.47297E",
    },
    fraction_count: 13000,
    hash: "1a79a4d6-0f87-4b82-8e76-9a44495b51bd",
    feed_url: "https://feed.tokenizedassets.example.com/asset_13",
    block_height: 1200013,
    transaction_hash: "33e20c12-fa3f-4a3d-a84d-0ad39bfe1af1",
  },
  {
    title: "CryptoPunk #5822",
    description:
      "Ultra-rare Alien CryptoPunk #5822 digital collectible with just two accessories from the pioneering NFT series.",
    created_at: randomDate(),
    metadata: {
      category: "NFT",
      collection: "CryptoPunks",
      type: "Alien",
      accessories: 2,
    },
    fraction_count: 14000,
    hash: "123e4567-e89b-12d3-a456-426655440000",
    feed_url: "https://feed.tokenizedassets.example.com/asset_14",
    block_height: 1200014,
    transaction_hash: "96d7d640-6a1c-47fa-973a-a80be4a0943e",
  },
  {
    title: "Eiffel Tower Summit Slot",
    description:
      "Timed access ticket for a 30-minute visit to the summit of the iconic Eiffel Tower in Paris.",
    created_at: randomDate(),
    metadata: {
      category: "Tourism",
      location: "Paris",
      duration_minutes: 30,
      ticket_type: "Summit",
    },
    fraction_count: 15000,
    hash: "0f8fad5b-d9cb-469f-a165-70867728950e",
    feed_url: "https://feed.tokenizedassets.example.com/asset_15",
    block_height: 1200015,
    transaction_hash: "2972d9a7-486e-4b9c-a3e2-4f10a1e5a7ed",
  },
  {
    title: "Sydney Opera Concert Series",
    description:
      "Revenue share from a 12-performance 2024 concert season at the Sydney Opera House's prestigious main hall.",
    created_at: randomDate(),
    metadata: {
      category: "Entertainment",
      location: "Sydney",
      season: "2024",
      performances: 12,
    },
    fraction_count: 16000,
    hash: "7d444840-9dc0-11d1-b245-5ffdce74fad2",
    feed_url: "https://feed.tokenizedassets.example.com/asset_16",
    block_height: 1200016,
    transaction_hash: "f66af9ab-9636-4b3c-9403-78be6a3aefa4",
  },
  {
    title: "Netflix Series 2026",
    description:
      "Distribution rights for an upcoming ten-episode 2026 Netflix original science-fiction series.",
    created_at: randomDate(),
    metadata: {
      category: "Media",
      company: "Netflix",
      genre: "Sci-Fi",
      episodes: 10,
    },
    fraction_count: 17000,
    hash: "e902893a-9d22-3c7e-a7b8-d6e313b71d9f",
    feed_url: "https://feed.tokenizedassets.example.com/asset_17",
    block_height: 1200017,
    transaction_hash: "11e148c7-8424-49d4-962b-e98c7f4a9d64",
  },
  {
    title: "Kenyan Safari Lodge",
    description:
      "Boutique 24-room safari lodge in Kenya offering daily wildlife sightings in a luxury eco-friendly setting.",
    created_at: randomDate(),
    metadata: {
      category: "Hospitality",
      country: "Kenya",
      rooms: 24,
      wildlife_sightings_per_day: 15,
    },
    fraction_count: 18000,
    hash: "980c3240-a4c3-11ed-a8fc-0242ac120002",
    feed_url: "https://feed.tokenizedassets.example.com/asset_18",
    block_height: 1200018,
    transaction_hash: "cd59ad9a-b6d2-471c-a1db-2f3da399019f",
  },
  {
    title: "Vienna Philharmonic Seat",
    description:
      "Lifetime ownership of seat A12 in the Golden Hall for Vienna Philharmonic concerts.",
    created_at: randomDate(),
    metadata: {
      category: "Entertainment",
      location: "Vienna",
      section: "Golden Hall",
      seat_number: "A12",
    },
    fraction_count: 19000,
    hash: "86faa6e0-5fee-4aca-9faa-031b0213b3ba",
    feed_url: "https://feed.tokenizedassets.example.com/asset_19",
    block_height: 1200019,
    transaction_hash: "419addcf-4c9c-456e-b14c-3db8b66c1b9b",
  },
  {
    title: "Hawaiian Coral Reef Zone",
    description:
      "Conservation initiative safeguarding a biodiverse zone of Hawaiian coral reef with 85 documented species.",
    created_at: randomDate(),
    metadata: {
      category: "Conservation",
      location: "Hawaii",
      coral_species: 85,
      protected_status: true,
    },
    fraction_count: 20000,
    hash: "4f9ee3fd-dd22-49a4-b197-171a59f19ca8",
    feed_url: "https://feed.tokenizedassets.example.com/asset_20",
    block_height: 1200020,
    transaction_hash: "47e810cd-ad7c-4dae-a590-963f3cdf6b8d",
  },
  {
    title: "Patek Philippe Nautilus",
    description:
      "Coveted Patek Philippe Nautilus reference 5711 stainless-steel luxury sports watch.",
    created_at: randomDate(),
    metadata: {
      category: "Watch",
      brand: "Patek Philippe",
      reference: "5711",
      material: "Stainless Steel",
    },
    fraction_count: 21000,
    hash: "15c51c72-baea-4e66-983e-8c96b662e6d2",
    feed_url: "https://feed.tokenizedassets.example.com/asset_21",
    block_height: 1200021,
    transaction_hash: "2e1e9d04-b10b-4251-a587-86b98e65ce35",
  },
  {
    title: "Blue Origin Capsule",
    description:
      "Reusable New Shepard crew capsule from Blue Origin with five completed suborbital flights and six-seat capacity.",
    created_at: randomDate(),
    metadata: {
      category: "Aerospace",
      company: "Blue Origin",
      flights_completed: 5,
      crew_capacity: 6,
    },
    fraction_count: 22000,
    hash: "429b8e6c-60a3-4e06-8f16-0eeba6c19d1f",
    feed_url: "https://feed.tokenizedassets.example.com/asset_22",
    block_height: 1200022,
    transaction_hash: "666dd42f-4c2f-426b-9085-58c2c299c1a7",
  },
  {
    title: "Gulfstream G650 Jet",
    description:
      "High-performance Gulfstream G650 private jet built in 2018 with a 7,000 nautical mile range.",
    created_at: randomDate(),
    metadata: {
      category: "Aviation",
      model: "G650",
      range_nm: 7000,
      year_built: 2018,
    },
    fraction_count: 23000,
    hash: "3957f0d4-773c-4af7-9ecc-94b3af3eec13",
    feed_url: "https://feed.tokenizedassets.example.com/asset_23",
    block_height: 1200023,
    transaction_hash: "74542b5a-f178-45e2-8783-9ac19aed41c7",
  },
  {
    title: "Louvre Abu Dhabi Roof",
    description:
      "Architect Jean Nouvel's lattice steel roof consisting of 785 panels crowning the Louvre Abu Dhabi museum.",
    created_at: randomDate(),
    metadata: {
      category: "Architecture",
      location: "Abu Dhabi",
      panels: 785,
      architect: "Jean Nouvel",
    },
    fraction_count: 24000,
    hash: "b5f7c3e4-b998-4fb7-bbaa-1f5c803c176b",
    feed_url: "https://feed.tokenizedassets.example.com/asset_24",
    block_height: 1200024,
    transaction_hash: "b363aaf2-ec9b-4fbc-820a-3b8dba9e4f74",
  },
  {
    title: "Hobbiton Movie Set",
    description:
      "Guided tour experience of the Hobbiton film set in New Zealand, featured in The Lord of the Rings trilogy.",
    created_at: randomDate(),
    metadata: {
      category: "Tourism",
      location: "New Zealand",
      tours_daily: 20,
      film: "The Lord of the Rings",
    },
    fraction_count: 25000,
    hash: "214b9cd4-f4dc-4554-ad8b-30b39d1c6bf4",
    feed_url: "https://feed.tokenizedassets.example.com/asset_25",
    block_height: 1200025,
    transaction_hash: "c5ed2f50-fbdd-46fa-841f-179e5d1584f2",
  },
  {
    title: "Amazon Carbon Credit",
    description:
      "Verified 2024 carbon offset project in the Brazilian Amazon providing 1,000 tonnes of CO2 reduction credits.",
    created_at: randomDate(),
    metadata: {
      category: "Environmental",
      type: "CarbonCredit",
      offset_tonnes: 1000,
      project_year: 2024,
    },
    fraction_count: 26000,
    hash: "f8ca1fc2-3a32-4e3c-a69f-6393a7be3c7d",
    feed_url: "https://feed.tokenizedassets.example.com/asset_26",
    block_height: 1200026,
    transaction_hash: "c7efdaee-4bf7-43fd-b8cb-1e0e21928b3c",
  },
  {
    title: "Swiss Ski Chalet",
    description:
      "Exclusive high-altitude Swiss chalet with ski-in/ski-out access and panoramic Alpine views.",
    created_at: randomDate(),
    metadata: {
      category: "RealEstate",
      country: "Switzerland",
      elevation_m: 1850,
      ski_in_out: true,
    },
    fraction_count: 27000,
    hash: "0f64e4fe-90d3-4f3a-9c06-0d2632e5dc8b",
    feed_url: "https://feed.tokenizedassets.example.com/asset_27",
    block_height: 1200027,
    transaction_hash: "d8eb2f82-b3f9-46c5-bcdf-95828fb5d489",
  },
  {
    title: "Cambridge Rare Manuscript",
    description:
      "12th-century rare manuscript held by Cambridge University, comprising 120 pages of historically significant texts.",
    created_at: randomDate(),
    metadata: {
      category: "Collectible",
      institution: "Cambridge",
      author: "Unknown",
      pages: 120,
    },
    fraction_count: 28000,
    hash: "5c9ea39d-56b6-4e6f-8bb3-7cf5d4a01b3d",
    feed_url: "https://feed.tokenizedassets.example.com/asset_28",
    block_height: 1200028,
    transaction_hash: "e1c0584d-9cd4-4a1c-927a-00725d9e740a",
  },
  {
    title: "Ocean Cleanup System #03",
    description:
      "Revenue share from Ocean Cleanup's third plastic-collection system deployed in 2023, capturing 200 tonnes of waste.",
    created_at: randomDate(),
    metadata: {
      category: "Environmental",
      project: "Ocean Cleanup",
      deployed: "2023-05-15",
      plastic_collected_tonnes: 200,
    },
    fraction_count: 29000,
    hash: "60a3b283-9d2e-4d4a-8eaa-bd2941ca5b02",
    feed_url: "https://feed.tokenizedassets.example.com/asset_29",
    block_height: 1200029,
    transaction_hash: "fbab3cfd-5087-4d70-9667-205c9bd6c3dc",
  },
  {
    title: "CERN LHC Time-slot",
    description:
      "24-hour research slot on CERN's Large Hadron Collider operating at 13 TeV beam energy.",
    created_at: randomDate(),
    metadata: {
      category: "Science",
      facility: "CERN",
      beam_energy_tev: 13,
      slot_hours: 24,
    },
    fraction_count: 30000,
    hash: "8ca1e8b3-d8d0-4ae8-a3d8-5ea608e2e6be",
    feed_url: "https://feed.tokenizedassets.example.com/asset_30",
    block_height: 1200030,
    transaction_hash: "d9a257af-5317-4227-96e3-d00f5a312dc2",
  },
];

const balanceData: Prisma.BalanceCreateInput[] = [
  {
    currency: "Dogecoin",
    symbol: "Ð",
    value: 0,
  },
];

export async function main() {
  await prisma.mint.deleteMany();
  for (const data of mintData) {
    await prisma.mint.create({ data });
  }

  await prisma.balance.deleteMany();
  for (const data of balanceData) {
    await prisma.balance.create({ data });
  }
}

main();
