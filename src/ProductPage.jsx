import React from 'react';

const ProductPage = ({ product, onAddToCart, onBack }) => {
  if (!product) return null;

  return (
    <section className="product-page">
      <button className="back-btn" onClick={onBack}>
        ← Back to Shop
      </button>

      <div className="product-page-layout">
        <div className="product-page-image">
          {product.imgUrl ? (
            <img src={product.imgUrl} alt={product.title} />
          ) : (
            <span style={{ fontSize: '5rem' }}>📦</span>
          )}
        </div>

        <div className="product-page-info">
          {product.soldOut && <span className="sold-out-badge" style={{ position: 'static', marginBottom: '1rem', display: 'inline-block' }}>Sold out</span>}
          <h1 className="product-page-title">{product.title}</h1>
          <p className="product-page-price">{product.price}</p>
          
          <div className="product-page-meta">
            <div className="product-page-meta-item">
              <span className="meta-label">Condition</span>
              <span className="meta-value">Factory Sealed</span>
            </div>
            <div className="product-page-meta-item">
              <span className="meta-label">Authenticity</span>
              <span className="meta-value">100% Authentic</span>
            </div>
            <div className="product-page-meta-item">
              <span className="meta-label">Shipping</span>
              <span className="meta-value">Free over $150</span>
            </div>
          </div>

          {!product.soldOut ? (
            <button 
              className="add-to-cart-btn product-page-atc"
              onClick={() => onAddToCart(product)}
            >
              Add to Cart
            </button>
          ) : (
            <button className="add-to-cart-btn sold-out-btn product-page-atc" disabled>
              Sold Out
            </button>
          )}

          <div className="product-page-description">
            {product.description && (
              <>
                <h3>What's Included</h3>
                <p style={{ color: 'var(--text-light)', lineHeight: '1.7', marginBottom: '2rem' }}>{product.description}</p>
              </>
            )}
            <h3>Product Details</h3>
            <ul>
              <li>All products are 100% authentic and factory sealed</li>
              <li>Ships within 1-3 business days</li>
              <li>Free shipping on orders over $150</li>
              <li>Carefully packaged for safe delivery</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
