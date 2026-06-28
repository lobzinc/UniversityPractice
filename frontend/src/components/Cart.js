import React from 'react';
import './Cart.css';

function Cart({ items, onUpdateQuantity, onRemove, total, onClose }) {
    if (items.length === 0) {
        return (
            <div className="cart">
                <div className="cart-header">
                    <h2>Корзина</h2>
                    <button className="close-btn" onClick={onClose}>✕</button>
                </div>
                <div className="cart-empty">
                    <p>Ваша корзина пуста</p>
                </div>
            </div>
        );
    }

    return (
        <div className="cart">
            <div className="cart-header">
                <h2>Корзина</h2>
                <button className="close-btn" onClick={onClose}>✕</button>
            </div>

            <div className="cart-items">
                {items.map(item => (
                    <div key={item.id} className="cart-item">
                        <img src={item.image} alt={item.name} className="cart-item-image" />
                        <div className="cart-item-info">
                            <h4>{item.name}</h4>
                            <p className="cart-item-store">{item.store}</p>
                            <p className="cart-item-price">{item.price} ₽</p>
                        </div>
                        <div className="cart-item-controls">
                            <div className="quantity-controls">
                                <button
                                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                >
                                    -
                                </button>
                                <span>{item.quantity}</span>
                                <button
                                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                >
                                    +
                                </button>
                            </div>
                            <button
                                className="remove-btn"
                                onClick={() => onRemove(item.id)}
                            >
                                Удалить
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="cart-footer">
                <div className="cart-total">
                    <span>Итого:</span>
                    <strong>{total} ₽</strong>
                </div>
                <button className="checkout-btn">
                    Оформить заказ
                </button>
            </div>
        </div>
    );
}

export default Cart;