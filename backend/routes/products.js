const express = require('express');
const router = express.Router();
const products = require('../data/products.json');

// Получить все товары с возможностью фильтрации
router.get('/', (req, res) => {
    let filteredProducts = [...products];

    const { category, store, search, minPrice, maxPrice, sort } = req.query;

    // Фильтрация по категории
    if (category) {
        filteredProducts = filteredProducts.filter(
            p => p.category.toLowerCase() === category.toLowerCase()
        );
    }

    // Фильтрация по магазину
    if (store) {
        filteredProducts = filteredProducts.filter(
            p => p.store.toLowerCase().includes(store.toLowerCase())
        );
    }

    // Поиск по названию
    if (search) {
        filteredProducts = filteredProducts.filter(
            p => p.name.toLowerCase().includes(search.toLowerCase())
        );
    }

    // Фильтрация по цене
    if (minPrice) {
        filteredProducts = filteredProducts.filter(p => p.price >= Number(minPrice));
    }
    if (maxPrice) {
        filteredProducts = filteredProducts.filter(p => p.price <= Number(maxPrice));
    }

    // Сортировка
    if (sort) {
        switch(sort) {
            case 'price-asc':
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'name':
                filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'rating':
                filteredProducts.sort((a, b) => b.rating - a.rating);
                break;
        }
    }

    res.json(filteredProducts);
});

// Получить товар по ID
router.get('/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) {
        return res.status(404).json({ error: 'Товар не найден' });
    }
    res.json(product);
});

module.exports = router;