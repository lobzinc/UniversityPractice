import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './About.css';
import API_URL from '../api';

function About() {
    const [companyInfo, setCompanyInfo] = useState(null);

    useEffect(() => {
        const fetchCompanyInfo = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/info`);
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
                <h1>О компании Семисвинофф</h1>
                <p className="about-mission">{companyInfo.description}</p>
            </section>

            <section className="company-details">
                <div className="detail-card">
                    <h3>Год основания</h3>
                    <p>{companyInfo.founded}</p>
                </div>
                <div className="detail-card">
                    <h3>Телефон</h3>
                    <p>{companyInfo.phone}</p>
                </div>
                <div className="detail-card">
                    <h3>Email</h3>
                    <p>{companyInfo.email}</p>
                </div>
                <div className="detail-card">
                    <h3>Адрес</h3>
                    <p>{companyInfo.address}</p>
                </div>
                <div className="detail-card">
                    <h3>Режим работы</h3>
                    <p>{companyInfo.workingHours}</p>
                </div>
                {companyInfo.socialLinks && companyInfo.socialLinks.telegram && (
                    <div className="detail-card">
                        <h3>Telegram</h3>
                        <a href={companyInfo.socialLinks.telegram} target="_blank" rel="noopener noreferrer">
                            Перейти в канал
                        </a>
                    </div>
                )}
            </section>

            <section className="team-section">
                <h2>Наша команда</h2>
                <div className="team-grid">
                    {companyInfo.team.map((member, index) => (
                        <div key={index} className="team-member">
                            <img src={member.photo} alt={member.name} className="team-photo" />
                            <h3>{member.name}</h3>
                            <p>{member.position}</p>
                            {member.telegram && (
                                <a
                                    href={member.telegram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="telegram-link"
                                >
                                    Telegram
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            <section className="advantages">
                <h2>Почему выбирают нас?</h2>
                <div className="advantages-grid">
                    <div className="advantage-card">
                        <span className="advantage-icon"></span>
                        <h3>Кто, если не мы?</h3>
                        <p>Единственная доставка из Семисвинофф</p>
                    </div>
                    <div className="advantage-card">
                        <span className="advantage-icon"></span>
                        <h3>Качество продуктов</h3>
                        <p>Сомнительное, что придает остроту жизни</p>
                    </div>
                    <div className="advantage-card">
                        <span className="advantage-icon"></span>
                        <h3>Выгодные цены</h3>
                        <p>Единственный агрегатор с отрицательными скидками</p>
                    </div>
                    <div className="advantage-card">
                        <span className="advantage-icon"></span>
                        <h3>Удобный сайт</h3>
                        <p>Написанный тремя калеками</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default About;