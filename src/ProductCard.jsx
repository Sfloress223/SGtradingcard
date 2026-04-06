import React from 'react';

const ProductCard = ({ product, title, imgUrl, price, soldOut, onAddToCart, onViewProduct }) => {
  return (
    <div className="product-card" onClick={() => onViewProduct && onViewProduct(product)}>
      <div className="product-image-container">
        {soldOut && <span className="sold-out-badge">Sold out</span>}
        {product.isPreorder && !soldOut && <span className="preorder-badge">Pre-order</span>}
        {product.condition && (
          <span className={`condition-badge ${
            product.condition.includes('10') ? 'condition-gold' : 
            (product.condition.includes('NM') || product.condition.includes('Mint')) ? 'condition-green' : 
            'condition-gray'
          }`}>
            {product.condition}
          </span>
        )}
        <div className="product-image-placeholder">
          {imgUrl ? <img src={imgUrl} alt={title} /> : <span>📦</span>}
        </div>
        <div className="product-description-overlay">
          <p>{product.description || title}</p>
        </div>
      </div>
      <div className="product-details">
        <h3 className="product-title">{title}</h3>
        <p className="product-price">{price}</p>
        {onAddToCart && !soldOut && (
          <button 
            className={`add-to-cart-btn ${product.isPreorder ? 'preorder-btn' : ''}`}
            onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
          >
            {product.isPreorder ? 'Pre-Order' : 'Add to Cart'}
          </button>
        )}
        {soldOut && (
          <button className="add-to-cart-btn sold-out-btn" disabled>
            Sold Out
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
