import React, { useState } from 'react';
import ProductCard from './ProductCard';

const GrandExchangeMarket = ({ products = [], onAddToCart, onViewProduct, currentUser, setCurrentPage }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [formatFilter, setFormatFilter] = useState('All'); // 'All', 'Single (Raw)', 'Graded (Slab)'
  const [conditionFilter, setConditionFilter] = useState('All'); // 'All', 'Mint', 'Light Play', 'Moderate Play', 'Heavy Play'
  const [graderFilter, setGraderFilter] = useState('All'); // 'All', 'PSA', 'CGC', 'Beckett'
  const [sortOrder, setSortOrder] = useState('newest'); // 'newest', 'price-low', 'price-high'

  const marketProducts = products.filter(p => !!p.sellerId);

  let filtered = marketProducts;

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(p => p.title.toLowerCase().includes(q) || (p.description || '').toLowerCase().includes(q));
  }

  // Format Filter
  if (formatFilter === 'Single (Raw)') {
    filtered = filtered.filter(p => !p.condition || ['Mint', 'Light Play', 'Moderate Play', 'Heavy Play'].includes(p.condition));
  } else if (formatFilter === 'Graded (Slab)') {
    filtered = filtered.filter(p => p.condition && ['PSA', 'CGC', 'Beckett'].some(g => p.condition.includes(g)));
  }

  // Condition/Grader Filters
  if (formatFilter === 'Single (Raw)' && conditionFilter !== 'All') {
    filtered = filtered.filter(p => p.condition === conditionFilter);
  }
  if (formatFilter === 'Graded (Slab)' && graderFilter !== 'All') {
    filtered = filtered.filter(p => p.condition && p.condition.includes(graderFilter));
  }

  // Sorting
  filtered.sort((a,b) => {
    // Primary Sort: Availability
    const aSoldOut = a.stock === 0 || a.soldOut;
    const bSoldOut = b.stock === 0 || b.soldOut;
    if (aSoldOut !== bSoldOut) return aSoldOut ? 1 : -1;

    // Secondary Sort: User Choice
    if (sortOrder === 'price-low') {
      return parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', ''));
    } else if (sortOrder === 'price-high') {
      return parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', ''));
    } else {
      // Newest
      return b.id - a.id;
    }
  });

  return (
    <div className="ge-page-wrapper">
      
      {/* Dynamic Hero Header */}
      <div className="ge-hero-container">
        <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '2rem' }}>
          <div>
            <h2 className="ge-hero-title">The Grand Exchange</h2>
            <p className="ge-hero-subtitle">Community-driven singles marketplace. Browse carefully curated cards from other collectors.</p>
          </div>
          <div>
            <button 
              onClick={() => setCurrentPage(currentUser ? 'dashboard' : 'auth')}
              style={{ 
                background: 'linear-gradient(135deg, #FFD700 0%, #FDB931 100%)', color: '#000', border: 'none', padding: '12px 24px', 
                borderRadius: '8px', fontWeight: '900', cursor: 'pointer', fontSize: '1.05rem',
                display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 4px 15px rgba(255,215,0,0.3)',
                transition: 'transform 0.2s', textTransform: 'uppercase', letterSpacing: '0.5px'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              {currentUser ? '📈 Seller Portal' : '✨ Join the Exchange'}
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 1rem', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        
        {/* Sidebar Filters */}
        <aside className="ge-glass-sidebar" style={{ flex: '1', minWidth: '250px', padding: '1.5rem', height: 'fit-content' }}>
          <h3 style={{ marginBottom: '1.2rem', fontSize: '1.25rem', borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: '0.8rem', color: '#1a202c', fontWeight: '800' }}>Filters</h3>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#4a5568' }}>Search</label>
            <input 
              type="text" 
              className="ge-input-field"
              placeholder="Search cards..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#4a5568' }}>Format</label>
            <select className="ge-input-field" value={formatFilter} onChange={(e) => { setFormatFilter(e.target.value); setConditionFilter('All'); setGraderFilter('All'); }}>
              <option value="All">All Formats</option>
              <option value="Single (Raw)">Single (Raw)</option>
              <option value="Graded (Slab)">Graded (Slab)</option>
            </select>
          </div>

          {formatFilter === 'Single (Raw)' && (
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#4a5568' }}>Condition</label>
              <select className="ge-input-field" value={conditionFilter} onChange={(e) => setConditionFilter(e.target.value)}>
                <option value="All">Any Condition</option>
                <option value="Mint">Mint</option>
                <option value="Light Play">Light Play</option>
                <option value="Moderate Play">Moderate Play</option>
                <option value="Heavy Play">Heavy Play</option>
              </select>
            </div>
          )}

          {formatFilter === 'Graded (Slab)' && (
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#4a5568' }}>Grader</label>
              <select className="ge-input-field" value={graderFilter} onChange={(e) => setGraderFilter(e.target.value)}>
                <option value="All">Any Grader</option>
                <option value="PSA">PSA</option>
                <option value="CGC">CGC</option>
                <option value="Beckett">Beckett</option>
              </select>
            </div>
          )}

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#4a5568' }}>Sort By</label>
            <select className="ge-input-field" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
              <option value="newest">Newest Listed</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
          
          <button 
            className="ge-clear-btn"
            onClick={() => { setSearchQuery(''); setFormatFilter('All'); setConditionFilter('All'); setGraderFilter('All'); setSortOrder('newest'); }}
          >
            Clear Filters
          </button>
        </aside>

        {/* Product Grid Area */}
        <section style={{ flex: '4', minWidth: '300px' }}>
          <div className="product-grid">
            {filtered.length > 0 ? filtered.map(product => (
              <ProductCard 
                key={product.id}
                product={product}
                title={product.title}
                price={product.price}
                soldOut={product.soldOut}
                imgUrl={product.imgUrl}
                onAddToCart={onAddToCart}
                onViewProduct={onViewProduct}
              />
            )) : (
              <div className="ge-empty-state" style={{ padding: '4rem 1rem', textAlign: 'center', gridColumn: '1 / -1', borderRadius: '12px' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
                <h3 style={{ fontSize: '1.8rem', color: '#2d3748', marginBottom: '0.5rem', fontWeight: '800' }}>No Listings Found</h3>
                <p style={{ color: '#718096', fontSize: '1.1rem' }}>Try adjusting your search or clearing your filters to discover more rare items.</p>
              </div>
            )}
          </div>
        </section>

      </div>
    </div>
  );
};

export default GrandExchangeMarket;
