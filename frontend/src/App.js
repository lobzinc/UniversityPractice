import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import About from './pages/About';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Cart from './components/Cart';
import Vacancy from './pages/Vacancy';
import './App.css';

function App() {
    const [cartItems, setCartItems] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('user');
        return saved ? JSON.parse(saved) : null;
    });

    useEffect(() => {
        const audio = new Audio('/sounds/click.mp3');
        audio.volume = 0.3;

        const handleClick = () => {
            audio.currentTime = 0;
            audio.play();
        };

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, []);

    const handleLogin = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const addToCart = (product) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevItems, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(productId);
            return;
        }
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <Router>
            <div className="App">
                <Header
                    cartCount={cartCount}
                    onCartClick={() => setShowCart(true)}
                    user={user}
                />

                {showCart && (
                    <div className="cart-overlay" onClick={() => setShowCart(false)}>
                        <div className="cart-modal" onClick={e => e.stopPropagation()}>
                            <Cart
                                items={cartItems}
                                onUpdateQuantity={updateQuantity}
                                onRemove={removeFromCart}
                                total={cartTotal}
                                onClose={() => setShowCart(false)}
                            />
                        </div>
                    </div>
                )}

                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/catalog" element={<Catalog addToCart={addToCart} />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/register" element={<Register onLogin={handleLogin} />} />
                        <Route path="/vacancy" element={<Vacancy />} />
                        <Route
                            path="/profile"
                            element={
                                user ? (
                                    <Profile user={user} onLogout={handleLogout} />
                                ) : (
                                    <Register onLogin={handleLogin} />
                                )
                            }
                        />
                    </Routes>
                </main>

                <footer className="footer">
                    <div className="footer-content">
                        <div className="footer-section">
                            <h3>Семисвинофф</h3>
                            <p>Доставка продуктов на дом</p>
                        </div>
                        <div className="footer-section">
                            <h4>Контакты</h4>
                            <p>+7 (995) 909-00-52</p>
                            <p>idersk@mail.ru</p>
                        </div>
                        <div className="footer-section">
                            <h4>Время работы</h4>
                            <p>Выходные дни с 03:00 до 03:33</p>
                        </div>
                    </div>
                </footer>
            </div>
        </Router>
    );
}

export default App;