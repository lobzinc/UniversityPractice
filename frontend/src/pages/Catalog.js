import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import './Catalog.css';
import API_URL from '../api';

function Catalog({ addToCart }) {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const [filters, setFilters] = useState({
        category: '',
        store: '',
        search: '',
        minPrice: '',
        maxPrice: '',
        sort: ''
    });

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const categoriesRes = await axios.get(`${API_URL}/api/categories`);
                setCategories(categoriesRes.data);
            } catch (error) {
                console.error('Ошибка загрузки данных:', error);
            }
        };
        fetchInitialData();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const params = {};
                Object.entries(filters).forEach(([key, value]) => {
                    if (value) params[key] = value;
                });

                const response = await axios.get(`${API_URL}/api/products`, { params });
                setProducts(response.data);
            } catch (error) {
                console.error('Ошибка загрузки товаров:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [filters]);

    const handleFilterChange = (filterName, value) => {
        setFilters(prev => ({ ...prev, [filterName]: value }));
    };

    return (
        <div className="catalog">
            <div className="catalog-header">
                <h1>Каталог продуктов</h1>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Поиск товаров..."
                        value={filters.search}
                        onChange={(e) => handleFilterChange('search', e.target.value)}
                    />
                </div>
            </div>

            <div className="catalog-content">
                <aside className="filters">
                    <h3>Фильтры</h3>

                    <div className="filter-group">
                        <label>Категория</label>
                        <select
                            value={filters.category}
                            onChange={(e) => handleFilterChange('category', e.target.value)}
                        >
                            <option value="">Все категории</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.name}>{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>Цена от</label>
                        <input
                            type="number"
                            value={filters.minPrice}
                            onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                            placeholder="0"
                        />
                    </div>

                    <div className="filter-group">
                        <label>Цена до</label>
                        <input
                            type="number"
                            value={filters.maxPrice}
                            onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                            placeholder="1000"
                        />
                    </div>

                    <div className="filter-group">
                        <label>Сортировка</label>
                        <select
                            value={filters.sort}
                            onChange={(e) => handleFilterChange('sort', e.target.value)}
                        ><option value="">По умолчанию</option>
                            <option value="price-asc">По возрастанию цены</option>
                            <option value="price-desc">По убыванию цены</option>
                            <option value="name">По названию</option>
                            <option value="rating">По рейтингу</option>
                        </select>
                    </div>

                    <button
                        className="reset-filters"
                        onClick={() => setFilters({
                            category: '', store: '', search: '',
                            minPrice: '', maxPrice: '', sort: ''
                        })}
                    >
                        Сбросить фильтры
                    </button>
                </aside>

                <main className="products-section">
                    {loading ? (
                        <div className="loading">Загрузка товаров...</div>
                    ) : products.length === 0 ? (
                        <div className="no-products">
                            <p>Товары не найдены</p>
                            <p>Попробуйте изменить параметры поиска</p>
                        </div>
                    ) : (
                        <div className="products-grid">
                            {products.map(product => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onAddToCart={addToCart}
                                />
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default Catalog;