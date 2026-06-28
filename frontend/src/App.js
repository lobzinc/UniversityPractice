import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import About from './pages/About';
import Cart from './components/Cart';
import './App.css';

function App() {
    const [cartItems, setCartItems] = useState([]);
    const [showCart, setShowCart] = useState(false);

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
                        <Route
                            path="/catalog"
                            element={<Catalog addToCart={addToCart} />}
                        />
                        <Route path="/about" element={<About />} />
                    </Routes>
                </main>

                <footer className="footer">
                    <div className="footer-content">
                        <div className="footer-section">
                            <h3>FoodExpress</h3>
                            <p>Доставка продуктов на дом</p>
                        </div>
                        <div className="footer-section">
                            <h4>Контакты</h4>
                            <p>📞 +7 (800) 123-45-67</p>
                            <p>📧 info@foodexpress.ru</p>
                        </div>
                        <div className="footer-section">
                            <h4>Время работы</h4>
                            <p>Ежедневно с 8:00 до 23:00</p>
                        </div>
                    </div>
                </footer>
            </div>
        </Router>
    );
}

export default App;