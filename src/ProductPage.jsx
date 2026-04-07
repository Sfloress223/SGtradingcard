import React, { useState, useEffect } from 'react';

const ProductPage = ({ product, onAddToCart, onBack, onViewSellerProfile }) => {
  const [prevProduct, setPrevProduct] = useState(product);
  const [selectedImage, setSelectedImage] = useState(null);

  if (product !== prevProduct) {
    setPrevProduct(product);
    setSelectedImage(null);
  }

  if (!product) return null;

  const galleryList = product.galleryUrls && product.galleryUrls.length > 0 
    ? product.galleryUrls 
    : (product.imgUrl ? [product.imgUrl] : []);

  const mainImage = selectedImage || product.imgUrl || '';

  return (
    <section className="product-page">
      <button className="back-btn" onClick={onBack}>
        ← Back to Shop
      </button>

      <div className="product-page-layout">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="product-page-image" style={{ width: '100%', aspectRatio: '1/1', background: '#fff', borderRadius: '12px', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {mainImage ? (
              <img src={mainImage} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            ) : (
              <span style={{ fontSize: '5rem' }}>📦</span>
            )}
          </div>
          {galleryList.length > 1 && (
            <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', padding: '5px 2px' }}>
              {galleryList.map((url, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setSelectedImage(url)}
                  style={{ 
                    flexShrink: 0, 
                    width: '70px', 
                    height: '70px', 
                    borderRadius: '8px', 
                    border: mainImage === url ? '2px solid var(--accent-color)' : '2px solid transparent',
                    boxShadow: mainImage === url ? '0 0 8px rgba(30,144,255,0.4)' : 'none',
                    background: '#fff', 
                    padding: '4px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    overflow: 'hidden'
                  }}
                >
                  <img src={url} alt={`Thumbnail ${idx+1}`} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="product-page-info">
          {product.isPreorder && !product.soldOut && <span className="preorder-badge" style={{ position: 'static', marginBottom: '1rem', display: 'inline-block' }}>Pre-order</span>}
          {(product.stock === 0 || product.soldOut) ? <span className="sold-out-badge" style={{ position: 'static', marginBottom: '1rem', display: 'inline-block' }}>Sold out</span> : (product.stock !== undefined && !product.isPreorder && <span style={{ color: '#4ade80', fontWeight: 'bold', display: 'block', marginBottom: '1rem' }}>{product.stock} in stock</span>)}
          <h1 className="product-page-title">{product.title}</h1>
          <p className="product-page-price">{product.price}</p>
          
          <div className="product-page-meta">
            <div className="product-page-meta-item">
              <span className="meta-label">Condition</span>
              <span className="meta-value" style={product.condition ? { fontWeight: 'bold' } : {}}>{product.condition || 'Factory Sealed'}</span>
            </div>
            {!product.sellerId && (
              <>
                <div className="product-page-meta-item">
                  <span className="meta-label">Authenticity</span>
                  <span className="meta-value">100% Authentic</span>
                </div>
                <div className="product-page-meta-item">
                  <span className="meta-label">Shipping</span>
                  <span className="meta-value">Free over $150</span>
                </div>
              </>
            )}
            {product.sellerId && (
              <>
                <div className="product-page-meta-item">
                  <span className="meta-label">Seller</span>
                  <a 
                    href="#"
                    onClick={(e) => { e.preventDefault(); onViewSellerProfile && onViewSellerProfile(product.sellerId); }}
                    className="meta-value" 
                    style={{ fontWeight: 'bold', color: '#1E90FF', textDecoration: 'underline', cursor: 'pointer' }}
                  >
                    {product.sellerName}
                  </a>
                </div>
                {product.sellerIsVerified && (
                  <div className="product-page-meta-item">
                    <span className="meta-label">Rating</span>
                    <span className="meta-value" style={{ color: '#FFD700', fontWeight: 'bold', textShadow: '0 0 1px #000' }}>⭐ Verified Seller</span>
                  </div>
                )}
              </>
            )}
          </div>

          {!(product.stock === 0 || product.soldOut) ? (
            <button 
              className={`add-to-cart-btn product-page-atc ${product.isPreorder ? 'preorder-btn' : ''}`}
              onClick={() => onAddToCart(product)}
            >
              {product.isPreorder ? 'Pre-Order' : 'Add to Cart'}
            </button>
          ) : (
            <button className="add-to-cart-btn sold-out-btn product-page-atc" disabled>
              Sold Out
            </button>
          )}

          <div className="product-page-description">
            {product.isPreorder && (
              <div style={{ padding: '1rem', background: '#eef2ff', borderLeft: '4px solid #2b6cb0', marginBottom: '2rem' }}>
                <h4 style={{ color: '#2b6cb0', marginBottom: '0.5rem' }}>Est. Release / Shipping</h4>
                <p style={{ fontSize: '0.9rem', color: '#4a5568' }}>This item is a pre-order. It will ship on or around its official release date. If you order in-stock items with this, the entire order will be held.</p>
              </div>
            )}
            {product.description && (
              <>
                <h3>{product.sellerId ? "Seller's Description" : "What's Included"}</h3>
                <p style={{ color: 'var(--text-light)', lineHeight: '1.7', marginBottom: '2rem' }}>{product.description}</p>
              </>
            )}
            {!product.sellerId && (
              <>
                <h3>Product Details</h3>
                <ul>
                  <li>All products are 100% authentic and factory sealed</li>
                  <li>Handling is 1-3 business days</li>
                  <li>Free shipping on orders over $150</li>
                  <li>Carefully packaged for safe delivery</li>
                </ul>
              </>
            )}
            {product.sellerId && (
              <div style={{ padding: '1rem', background: '#f5f5f5', borderRadius: '8px', marginTop: '2rem' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#333' }}>Grand Exchange Purchase</h4>
                <p style={{ fontSize: '0.9rem', color: '#666', lineHeight: '1.5' }}>
                  This item is sold by an independent collector on The Grand Exchange. Shipping times and handling may vary depending on the seller.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
