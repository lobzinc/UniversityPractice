const express = require('express');
const router = express.Router();

const companyInfo = {
    name: "FoodExpress",
    description: "Мы - современный агрегатор доставки продуктов из лучших магазинов вашего города. Наша миссия - сделать покупку продуктов быстрой, удобной и выгодной.",
    founded: 2023,
    phone: "+7 (800) 123-45-67",
    email: "info@foodexpress.ru",
    address: "г. Москва, ул. Примерная, д. 123",
    workingHours: "Ежедневно с 8:00 до 23:00",
    stats: {
        stores: 50,
        products: 15000,
        deliveries: 100000,
        cities: 15
    },
    team: [
        {
            name: "Иван Петров",
            position: "CEO",
            photo: "https://via.placeholder.com/150"
        },
        {
            name: "Мария Сидорова",
            position: "CTO",
            photo: "https://via.placeholder.com/150"
        },
        {
            name: "Алексей Иванов",
            position: "COO",
            photo: "https://via.placeholder.com/150"
        }
    ]
};

router.get('/', (req, res) => {
    res.json(companyInfo);
});

module.exports = router;