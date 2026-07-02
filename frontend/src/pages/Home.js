import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';
import API_URL from '../api';

function Home() {
    const [popularProducts, setPopularProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [companyInfo, setCompanyInfo] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsRes, categoriesRes, infoRes] = await Promise.all([
                    axios.get(`${API_URL}/api/products`),
                    axios.get(`${API_URL}/api/categories`),
                    axios.get(`${API_URL}/api/info`)
                ]);

                setPopularProducts(productsRes.data.slice(0, 6));
                setCategories(categoriesRes.data);
                setCompanyInfo(infoRes.data);
            } catch (error) {
                console.error('Ошибка загрузки данных:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="home">
            <section className="hero">
                <div className="hero-content">
                    <h1 className="hero-title">
                        ВКУСНО? ВОЗМОЖНО!<br/>ДЕШЕВО? УСЛОВНО!
                    </h1>
                    <p className="hero-subtitle">
                        Заказывайте относительно свежие продукты из Семисвинова
                    </p>
                    <Link to="/catalog" className="cta-button">
                        Рискнуть
                    </Link>
                </div>
            </section>

            {companyInfo && (
                <section className="stats-section">
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-number">{companyInfo.stats.stores}+</div>
                            <div className="stat-label">Возраст для приема на работу</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-number">{companyInfo.stats.products.toLocaleString()}+</div>
                            <div className="stat-label">Бабушек</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-number">{companyInfo.stats.deliveries.toLocaleString()}+</div>
                            <div className="stat-label">Недоставленных товаров</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-number">{companyInfo.stats.cities}</div>
                            <div className="stat-label">Пищевых отравлений в день</div>
                        </div>
                    </div>
                </section>
            )}

            <section className="categories-section">
                <h2>Категории товаров</h2>
                <div className="categories-grid">
                    {categories.map(category => (
                        <Link
                            key={category.id}
                            to={`/catalog?category=${category.name}`}
                            className="category-card"
                        >
                            <span className="category-name">{category.name}</span>
                        </Link>
                    ))}
                </div>
            </section>

            <section className="popular-section">
                <h2>Популярные товары</h2>
                <div className="products-grid">
                    {popularProducts.map(product => (
                        <div key={product.id} className="product-card">
                            <img src={product.image} alt={product.name} className="product-image" />
                            <div className="product-info">
                                <h3 className="product-name">{product.name}</h3>
                                <p className="product-store">{product.store}</p>
                                <div className="product-price">
                                    <span className="current-price">{product.price} ₽</span>
                                    {product.oldPrice && (
                                        <span className="old-price">{product.oldPrice} ₽</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Home;