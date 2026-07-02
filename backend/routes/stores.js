const express = require('express');
const router = express.Router();
const products = require('../data/products.json');

router.get('/', (req, res) => {
    const stores = [...new Set(products.map(p => p.store))];
    res.json(stores);
});

module.exports = router;