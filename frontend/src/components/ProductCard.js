import React from 'react';
import './ProductCard.css';

function ProductCard({ product, onAddToCart }) {
    return (
        <div className="product-card">
            <div className="product-image-container">
                <img src={product.image} alt={product.name} />
                {product.oldPrice && (
                    <span className="discount-badge">
            -{Math.round((1 - product.price / product.oldPrice) * 100)}%
          </span>
                )}
            </div>

            <div className="product-details">
                <h3>{product.name}</h3>
                <p className="product-weight">{product.weight}</p>
                <p className="product-store">{product.store}</p>

                <div className="product-rating">
                    ⭐ {product.rating}
                </div>

                <div className="product-price-section">
                    <span className="current-price">{product.price} ₽</span>
                    {product.oldPrice && (
                        <span className="old-price">{product.oldPrice} ₽</span>
                    )}
                </div>

                <div className="delivery-info">
                    🚚 {product.deliveryTime}
                </div>

                <button
                    className="add-to-cart-btn"
                    onClick={() => onAddToCart(product)}
                >
                    В корзину
                </button>
            </div>
        </div>
    );
}

export default ProductCard;