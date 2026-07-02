const express = require('express');
const router = express.Router();

<<<<<<< HEAD
=======
// ленк здесь инфу в о компании мож поменять
>>>>>>> 9dfa6185a8fb2e296d997f7b0d4a0881ea2f0f52
const companyInfo = {
    name: "Семисвинофф",
    description: "Мы - современный дискаунт-магазин с самыми низкими ценами и не менее низким качеством продуктов. Наша компания следует современным тенденциям и трендам: бр бр патапим.",
    founded: "988",
    phone: "+7 (995) 909-00-52",
    email: "idersk@mail.ru",
    address: "г. Санкт-Петербург, ул. Московский проспект, д. 28",
    workingHours: "Выходные с 03:00 до 03:33",
<<<<<<< HEAD
    socialLinks: {
        telegram: "https://t.me/ваша_ссылка",
    },
=======
>>>>>>> 9dfa6185a8fb2e296d997f7b0d4a0881ea2f0f52
    stats: {
        stores: 50,
        products: 15000,
        deliveries: 100000,
        cities: 15
    },
    team: [
        {
            name: "Даниэль Мустахряков",
<<<<<<< HEAD
            position: "Ответственный за контроль качества",
            telegram: "https://t.me/dnlmst",
=======
            position: "Отвественный за контроль качества",
>>>>>>> 9dfa6185a8fb2e296d997f7b0d4a0881ea2f0f52
            photo: "https://i.imgur.com/iS6uJzb.png"
        },
        {
            name: "Елена Поросеева",
            position: "Ген. Директор",
<<<<<<< HEAD
            telegram: "https://t.me/qurtedo",
=======
>>>>>>> 9dfa6185a8fb2e296d997f7b0d4a0881ea2f0f52
            photo: "https://i.imgur.com/YpBQtbh.jpeg"
        },
        {
            name: "Салтанат Сарсвинова",
            position: "Руководитель отдела кадров",
<<<<<<< HEAD
            telegram: "https://t.me/soutawashuu",
=======
>>>>>>> 9dfa6185a8fb2e296d997f7b0d4a0881ea2f0f52
            photo: "https://i.imgur.com/aS3talF.jpeg"
        }
    ]
};

router.get('/', (req, res) => {
    res.json(companyInfo);
});

module.exports = router;