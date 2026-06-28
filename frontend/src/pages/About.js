import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './About.css';

function About() {
    const [companyInfo, setCompanyInfo] = useState(null);

    useEffect(() => {
        const fetchCompanyInfo = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/info');
                setCompanyInfo(response.data);
            } catch (error) {
                console.error('Ошибка загрузки информации о компании:', error);
            }
        };

        fetchCompanyInfo();
    }, []);

    if (!companyInfo) {
        return <div className="loading">Загрузка...</div>;
    }

    return (
        <div className="about">
            <section className="about-hero">
                <h1>О компании FoodExpress</h1>
                <p className="about-mission">{companyInfo.description}</p>
            </section>

            <section className="company-details">
                <div className="detail-card">
                    <h3>📅 Год основания</h3>
                    <p>{companyInfo.founded}</p>
                </div>
                <div className="detail-card">
                    <h3>📞 Телефон</h3>
                    <p>{companyInfo.phone}</p>
                </div>
                <div className="detail-card">
                    <h3>📧 Email</h3>
                    <p>{companyInfo.email}</p>
                </div>
                <div className="detail-card">
                    <h3>📍 Адрес</h3>
                    <p>{companyInfo.address}</p>
                </div>
                <div className="detail-card">
                    <h3>🕐 Режим работы</h3>
                    <p>{companyInfo.workingHours}</p>
                </div>
            </section>

            <section className="team-section">
                <h2>Наша команда</h2>
                <div className="team-grid">
                    {companyInfo.team.map((member, index) => (
                        <div key={index} className="team-member">
                            <img src={member.photo} alt={member.name} className="team-photo" />
                            <h3>{member.name}</h3>
                            <p>{member.position}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="advantages">
                <h2>Почему выбирают нас?</h2>
                <div className="advantages-grid">
                    <div className="advantage-card">
                        <span className="advantage-icon">🚀</span>
                        <h3>Быстрая доставка</h3>
                        <p>Доставляем заказы от 30 минут</p>
                    </div>
                    <div className="advantage-card">
                        <span className="advantage-icon">✅</span>
                        <h3>Качество продуктов</h3>
                        <p>Только свежие и качественные товары</p>
                    </div>
                    <div className="advantage-card">
                        <span className="advantage-icon">💰</span>
                        <h3>Выгодные цены</h3>
                        <p>Регулярные акции и скидки</p>
                    </div>
                    <div className="advantage-card">
                        <span className="advantage-icon">📱</span>
                        <h3>Удобное приложение</h3>
                        <p>Заказывайте в пару кликов</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default About;