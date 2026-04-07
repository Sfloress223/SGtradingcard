import React, { useState } from 'react';
import ProductCard from './ProductCard';

const ShopDirectory = ({ products = [], sets = [], onAddToCart, onViewProduct }) => {
  const [selectedSet, setSelectedSet] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Exclude Grand Exchange Peer-to-Peer items from the main retail shop
  const retailProducts = products.filter(p => !p.sellerId);

  if (selectedSet) {
    const setInfo = sets.find(s => s.id === selectedSet);
    const subSets = sets.filter(s => s.parent === selectedSet);
    const setProducts = retailProducts.filter(p => p.setId === selectedSet);

    if (subSets.length > 0) {
      return (
        <section className="shop-section">
          <div className="set-header" style={{ borderBottom: `3px solid ${setInfo?.color || '#000'}` }}>
            <button className="back-btn" onClick={() => setSelectedSet(null)}>
              ← Back to All Sets & Categories
            </button>
            <div className="set-title-area">
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{setInfo?.name}</h2>
              <p>Select a specific set to view its products.</p>
            </div>
          </div>
          
          <div className="set-grid" style={{ marginTop: '2rem' }}>
            {subSets.map(set => (
              <div 
                key={set.id} 
                className="set-card" 
                onClick={() => setSelectedSet(set.id)}
                style={{ borderTop: `4px solid ${set.color || 'var(--border-color)'}` }}
              >
                <div className="set-logo-container">
                  {set.bannerUrl ? (
                    <img src={set.bannerUrl} alt={set.name} className="set-icon" />
                  ) : (
                    <span className="set-icon-emoji">{set.emoji || '📦'}</span>
                  )}
                </div>
                <div className="set-name">{set.name}</div>
                <div className="view-products-link">
                  {products.filter(p => p.setId === set.id).length} Items Available →
                </div>
              </div>
            ))}
          </div>
        </section>
      );
    }

    return (
      <section className="shop-section">
        <div className="set-header" style={{ borderBottom: `3px solid ${setInfo?.color || '#000'}` }}>
          <button className="back-btn" onClick={() => setSelectedSet(setInfo?.parent || null)}>
            ← Back to {setInfo?.parent ? sets.find(s => s.id === setInfo.parent)?.name : 'All Categories'}
          </button>
          <div className="set-title-area">
            {setInfo?.bannerUrl ? (
              <img src={setInfo.bannerUrl} alt={setInfo.name} className="set-banner-img" />
            ) : (
               <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{setInfo?.name}</h2>
            )}
            <p>{setProducts.length} Products Available</p>
          </div>
        </div>

        <div className="product-grid" style={{ marginTop: '2rem' }}>
          {setProducts.length > 0 ? (
            setProducts
              .sort((a, b) => {
                const getRank = (title) => {
                  const t = title.toLowerCase();
                  if (t.includes('elite trainer box') || t.includes('etb')) return 1;
                  if (t.includes('3 pack blister') || t.includes('3-pack blister') || t.includes('3 pack')) return 2;
                  if (t.includes('booster bundle')) return 3;
                  if (t.includes('booster pack')) return 4;
                  if (t.includes('mini tin')) return 5;
                  if (t.includes('premium collection') || t.includes('ultra-premium')) return 6;
                  if (t.includes('box')) return 7;
                  return 8;
                };
                const rankA = getRank(a.title);
                const rankB = getRank(b.title);
                if (rankA !== rankB) return rankA - rankB;
                return a.title.localeCompare(b.title);
              })
              .map(product => (
              <ProductCard 
                key={product.id}
                product={product}
                title={product.title}
                price={product.price}
                soldOut={product.stock === 0 || product.soldOut}
                imgUrl={product.imgUrl}
                onAddToCart={onAddToCart}
                onViewProduct={onViewProduct}
              />
            ))
          ) : (
            <div style={{ padding: '4rem 1rem', textAlign: 'center', gridColumn: '1 / -1', background: '#f8fafc', borderRadius: '12px', border: '2px dashed #cbd5e0' }}>
              <h3 style={{ fontSize: '2rem', color: '#4a5568', marginBottom: '0.5rem' }}>Coming Soon</h3>
              <p style={{ color: '#718096' }}>We are currently sourcing items for this category. Check back later!</p>
            </div>
          )}
        </div>
      </section>
    );
  }

  let searchResults = [];
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    searchResults = retailProducts.filter(p => 
      p.title.toLowerCase().includes(q) || 
      (p.description && p.description.toLowerCase().includes(q))
    );
  }

  return (
    <section className="shop-section">
      <div className="shop-header">
        <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Shop Collection</h2>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <input 
            type="text" 
            placeholder="Search products, sets, or categories..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ flex: '1', minWidth: '250px', padding: '12px 16px', fontSize: '1rem', borderRadius: '8px', border: '1px solid #ddd' }}
          />
        </div>
      </div>
      
      {searchQuery ? (
          <div className="product-grid">
            {searchResults.length > 0 ? searchResults.map(product => (
              <ProductCard 
                key={product.id}
                product={product}
                title={product.title}
                price={product.price}
                soldOut={product.stock === 0 || product.soldOut}
                imgUrl={product.imgUrl}
                onAddToCart={onAddToCart}
                onViewProduct={onViewProduct}
              />
            )) : <p>No products match your search.</p>}
          </div>
        )
      : (
      <div className="set-grid">
        {sets.filter(s => !s.parent).map(set => (
          <div 
            key={set.id} 
            className="set-card" 
            onClick={() => setSelectedSet(set.id)}
            style={{ borderTop: `4px solid ${set.color}` }}
          >
            <div className={`set-logo-container ${['graded-cards', 'japanese'].includes(set.id) ? 'photo-container' : ''}`}>
               {(set.bannerUrl || set.imgUrl) ? (
                 <img 
                   src={set.bannerUrl || set.imgUrl} 
                   alt={set.name + ' Logo'} 
                   className={`set-icon ${['graded-cards', 'japanese', 'chinese'].includes(set.id) ? 'photo-fit' : ''}`} 
                 />
               ) : (
                 <span style={{ fontSize: '3rem' }}>{set.emoji || '📦'}</span>
               )}
            </div>
            <h3 className="set-name">{set.name}</h3>
            <span className="view-products-link">View Products →</span>
          </div>
        ))}
      </div>
      )}
    </section>
  );
};

export default ShopDirectory;
