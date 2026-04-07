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
        {product.sellerName && (
          <span className="seller-badge" style={{
            position: 'absolute',
            bottom: '10px',
            right: '10px',
            background: 'rgba(0, 0, 0, 0.75)',
            color: '#fff',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '0.75rem',
            fontWeight: 'bold',
            zIndex: 2,
            backdropFilter: 'blur(4px)'
          }}>
            Sold by: {product.sellerName}
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
