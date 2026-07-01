import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

function Header({ cartCount, onCartClick }) {
    const location = useLocation();

    return (
        <header className="header">
            <div className="header-content">
                <Link to="/" className="logo">
                    <img
                        src="/images/logo_7pig.png"
                        alt="Семисвинофф"
                        className="logo-image"
                    />
                </Link>

                <nav className="nav">
                    <Link
                        to="/"
                        className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                    >
                        Главная
                    </Link>
                    <Link
                        to="/catalog"
                        className={`nav-link ${location.pathname === '/catalog' ? 'active' : ''}`}
                    >
                        Каталог
                    </Link>
                    <Link
                        to="/about"
                        className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
                    >
                        О компании
                    </Link>
                    <Link to="/register" className="nav-link">Личный кабинет</Link>
                    <Link to="/vacancy" className="nav-link highlight">Работа</Link>
                </nav>

                <button className="cart-button" onClick={onCartClick}>
                    Корзина
                    {cartCount > 0 && (
                        <span className="cart-count">{cartCount}</span>
                    )}
                </button>
            </div>
        </header>
    );
}

export default Header;