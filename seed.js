const mongoose = require('mongoose');
require('dotenv').config();
const Crypto = require('./models/Crypto');

const seedData = [
  { name: 'Bitcoin', symbol: 'BTC', price: 67234.52, image: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png', change24h: 2.34 },
  { name: 'Ethereum', symbol: 'ETH', price: 3521.18, image: 'https://cryptologos.cc/logos/ethereum-eth-logo.png', change24h: 1.87 },
  { name: 'Solana', symbol: 'SOL', price: 178.45, image: 'https://cryptologos.cc/logos/solana-sol-logo.png', change24h: 4.12 },
  { name: 'Cardano', symbol: 'ADA', price: 0.4521, image: 'https://cryptologos.cc/logos/cardano-ada-logo.png', change24h: -1.23 },
  { name: 'Dogecoin', symbol: 'DOGE', price: 0.1634, image: 'https://cryptologos.cc/logos/dogecoin-doge-logo.png', change24h: 3.45 },
  { name: 'XRP', symbol: 'XRP', price: 0.6231, image: 'https://cryptologos.cc/logos/xrp-xrp-logo.png', change24h: -0.87 },
  { name: 'Polkadot', symbol: 'DOT', price: 7.82, image: 'https://cryptologos.cc/logos/polkadot-new-dot-logo.png', change24h: 2.15 },
  { name: 'Chainlink', symbol: 'LINK', price: 14.73, image: 'https://cryptologos.cc/logos/chainlink-link-logo.png', change24h: 1.62 },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await Crypto.deleteMany({});
    console.log('Cleared existing crypto data');

    await Crypto.insertMany(seedData);
    console.log(`Seeded ${seedData.length} cryptocurrencies`);

    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err.message);
    process.exit(1);
  }
}

seed();
