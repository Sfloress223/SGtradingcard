import React from 'react';

const ProductCard = ({ product, title, imgUrl, price, soldOut, onAddToCart, onViewProduct }) => {
  const isGradedCard = product.setId === 'graded-cards' || 
    (product.condition && ['psa', 'cgc', 'beckett'].some(g => product.condition.toLowerCase().includes(g))) ||
    (title && ['psa', 'cgc', 'beckett', 'graded', 'slab'].some(g => title.toLowerCase().includes(g)));

  const isSingleCard = product.setId === 'singles' || product.cardType === 'Single';

  const isPackLike = !isGradedCard && !isSingleCard && title && 
    (title.toLowerCase().includes('pack') || title.toLowerCase().includes('blister'));

  const isJapanesePack = isPackLike && (
    title.toLowerCase().includes('japanese') || 
    title.toLowerCase().includes('jp') || 
    title.toLowerCase().includes('symphonia') || 
    title.toLowerCase().includes('brave')
  );

  return (
    <div className="product-card" onClick={() => onViewProduct && onViewProduct(product)}>
      <div className="product-image-container" style={{ aspectRatio: isGradedCard ? '3/4' : '1/1' }}>
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
        {product.trackedShipping && (
          <span className="tracking-badge" style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            background: '#e6fffa',
            color: '#276749',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '0.75rem',
            fontWeight: 'bold',
            zIndex: 2,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            Tracked
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
          {imgUrl ? (
            <img 
              src={imgUrl} 
              alt={title} 
              loading="lazy"
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'contain',
                padding: (isGradedCard || isSingleCard) ? '0' : (isJapanesePack ? '0px' : (isPackLike ? '6px' : '12px')),
                transform: isGradedCard ? 'scale(1.6)' : (isSingleCard ? 'scale(1.25)' : (isJapanesePack ? 'scale(2.0)' : (isPackLike ? 'scale(1.22)' : 'scale(1.0)'))),
                mixBlendMode: isGradedCard ? 'darken' : 'normal',
                transition: 'transform 0.3s ease'
              }} 
            />
          ) : (
            <span>📦</span>
          )}
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
