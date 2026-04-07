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
  if (sortOrder === 'price-low') {
    filtered.sort((a, b) => parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', '')));
  } else if (sortOrder === 'price-high') {
    filtered.sort((a, b) => parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', '')));
  } else {
    // Newest: assume higher ID means newer
    filtered.sort((a, b) => b.id - a.id);
  }

  return (
    <section className="shop-section" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 1rem' }}>
      
      {/* Header & Seller Portal Button */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', borderBottom: '2px solid #ddd', paddingBottom: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: '#1E90FF' }}>The Grand Exchange</h2>
          <p style={{ color: '#666', fontSize: '1rem', margin: 0 }}>Community-driven singles marketplace. Browse carefully curated cards from other collectors.</p>
        </div>
        <div style={{ marginTop: '1rem' }}>
          <button 
            onClick={() => setCurrentPage(currentUser ? 'dashboard' : 'auth')}
            style={{ 
              background: '#000', color: '#fff', border: 'none', padding: '10px 20px', 
              borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem',
              display: 'flex', alignItems: 'center', gap: '8px'
            }}
          >
            {currentUser ? '📈 My Account' : '👋 Sign In / Register'}
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        
        {/* Sidebar Filters */}
        <aside style={{ flex: '1', minWidth: '250px', background: '#f9f9f9', padding: '1.5rem', borderRadius: '8px', height: 'fit-content', border: '1px solid #eee' }}>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem', borderBottom: '1px solid #ddd', paddingBottom: '0.5rem' }}>Filters</h3>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Search</label>
            <input 
              type="text" 
              placeholder="Search cards..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Format</label>
            <select value={formatFilter} onChange={(e) => { setFormatFilter(e.target.value); setConditionFilter('All'); setGraderFilter('All'); }} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}>
              <option value="All">All Formats</option>
              <option value="Single (Raw)">Single (Raw)</option>
              <option value="Graded (Slab)">Graded (Slab)</option>
            </select>
          </div>

          {formatFilter === 'Single (Raw)' && (
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Condition</label>
              <select value={conditionFilter} onChange={(e) => setConditionFilter(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}>
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
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Grader</label>
              <select value={graderFilter} onChange={(e) => setGraderFilter(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}>
                <option value="All">Any Grader</option>
                <option value="PSA">PSA</option>
                <option value="CGC">CGC</option>
                <option value="Beckett">Beckett</option>
              </select>
            </div>
          )}

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Sort By</label>
            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}>
              <option value="newest">Newest Listed</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
          
          <button 
            onClick={() => { setSearchQuery(''); setFormatFilter('All'); setConditionFilter('All'); setGraderFilter('All'); setSortOrder('newest'); }}
            style={{ width: '100%', padding: '8px', background: '#e2e8f0', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '1rem', color: '#4a5568', fontWeight: 'bold' }}
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
              <div style={{ padding: '4rem 1rem', textAlign: 'center', gridColumn: '1 / -1', background: '#f8fafc', borderRadius: '12px', border: '2px dashed #cbd5e0' }}>
                <h3 style={{ fontSize: '1.5rem', color: '#4a5568', marginBottom: '0.5rem' }}>No Listings Found</h3>
                <p style={{ color: '#718096' }}>Try adjusting your search or filters.</p>
              </div>
            )}
          </div>
        </section>

      </div>
    </section>
  );
};

export default GrandExchangeMarket;
