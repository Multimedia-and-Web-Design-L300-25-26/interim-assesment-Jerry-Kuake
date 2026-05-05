const Crypto = require('../models/Crypto');

const getAllCrypto = async (req, res) => {
  try {
    const cryptos = await Crypto.find().sort({ createdAt: -1 });
    res.status(200).json({ data: cryptos });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getGainers = async (req, res) => {
  try {
    const gainers = await Crypto.find({ change24h: { $gt: 0 } }).sort({ change24h: -1 });
    res.status(200).json({ data: gainers });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getNewListings = async (req, res) => {
  try {
    const newest = await Crypto.find().sort({ createdAt: -1 }).limit(20);
    res.status(200).json({ data: newest });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addCrypto = async (req, res) => {
  try {
    const { name, symbol, price, image, change24h } = req.body;

    if (!name || !symbol || price === undefined) {
      return res.status(400).json({ message: 'Name, symbol and price are required' });
    }

    const exists = await Crypto.findOne({ symbol: symbol.toUpperCase() });
    if (exists) {
      return res.status(400).json({ message: `${symbol.toUpperCase()} already exists` });
    }

    const crypto = await Crypto.create({ name, symbol, price, image: image || '', change24h: change24h || 0 });
    res.status(201).json({ message: 'Cryptocurrency added', data: crypto });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllCrypto, getGainers, getNewListings, addCrypto };
