import React, { useState, useEffect } from 'react';

const API = import.meta.env.PROD ? 'https://sgtradingcard.onrender.com' : 'http://localhost:3001';

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [products, setProducts] = useState([]);
  const [sets, setSets] = useState([]);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);
  const [selectedSet, setSelectedSet] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submittedOn, setSubmittedOn] = useState(false);

  useEffect(() => {
    fetch(`${API}/api/reviews`)
      .then(res => res.json())
      .then(data => setReviews(data))
      .catch(console.error);
      
    fetch(`${API}/api/sets`)
      .then(res => res.json())
      .then(data => setSets(Array.isArray(data) ? data : []))
      .catch(console.error);

    fetch(`${API}/api/products`)
      .then(res => res.json())
      .then(data => setProducts(Array.isArray(data) ? data : []))
      .catch(console.error);
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !message) return;
    setSubmitting(true);
    
    try {
      const res = await fetch(`${API}/api/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name, 
          rating, 
          message, 
          product: selectedProduct || null,
          image: image || null
        })
      });
      const data = await res.json();
      if (data.success) {
        setReviews([data.review, ...reviews]);
        setName('');
        setMessage('');
        setRating(5);
        setImage(null);
        setSelectedProduct('');
        setSelectedSet('');
        setSubmittedOn(true);
        setTimeout(() => setSubmittedOn(false), 3000);
      }
    } catch (err) {
      console.error(err);
    }
    setSubmitting(false);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3rem', margin: '0 0 1rem 0' }}>Customer Reviews</h1>
        <p style={{ color: '#888', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          See what our community is saying about S&G Trading. We pride ourselves on pristine packaging and ultra-fast shipping.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '4rem', alignItems: 'start' }}>
        
        {/* Review Submission Form */}
        <div style={{ background: 'var(--card-bg)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-color)', position: 'sticky', top: '2rem' }}>
          <h2 style={{ margin: '0 0 1.5rem 0' }}>Write a Review</h2>
          {submittedOn ? (
            <div style={{ padding: '1rem', background: '#ecfdf5', color: '#059669', borderRadius: '8px', textAlign: 'center', fontWeight: 'bold' }}>
              Thank you for your feedback!
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="form-group full-width">
                <label>Your Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="John D." />
              </div>

              <div className="form-group full-width">
                <label>Rating</label>
                <div style={{ display: 'flex', gap: '0.5rem', fontSize: '1.5rem', cursor: 'pointer' }}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <span 
                      key={star} 
                      onClick={() => setRating(star)}
                      style={{ color: star <= rating ? '#fbbf24' : '#e5e7eb', transition: 'color 0.2s' }}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>

              <div className="form-group full-width">
                <label>Your Review</label>
                <textarea 
                  value={message} 
                  onChange={e => setMessage(e.target.value)} 
                  required 
                  rows="4"
                  placeholder="Tell us about your pulls and packaging!"
                  style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-color)', fontFamily: 'inherit', resize: 'vertical' }}
                />
              </div>

              <div className="form-group full-width">
                 <label>Show off your pulls! (Optional Photo)</label>
                 <input type="file" accept="image/*" onChange={handleImageUpload} style={{ marginTop: '0.5rem', background: '#fff', padding: '0.5rem', borderRadius: '6px' }} />
                 {image && <img src={image} alt="Upload preview" style={{ marginTop: '1rem', height: '80px', borderRadius: '8px', border: '1px solid #ccc' }} />}
              </div>

              <div className="form-group full-width">
                 <label>Which product did you buy? (Optional)</label>
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '0.5rem' }}>
                   <select value={selectedSet} onChange={e => { setSelectedSet(e.target.value); setSelectedProduct(''); }} style={{ padding: '0.6rem', borderRadius: '6px', border: '1px solid var(--border-color)', background: '#fff', width: '100%' }}>
                     <option value="">-- Select Category --</option>
                     {sets.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                   </select>
                   <select value={selectedProduct} onChange={e => setSelectedProduct(e.target.value)} disabled={!selectedSet} style={{ padding: '0.6rem', borderRadius: '6px', border: '1px solid var(--border-color)', background: selectedSet ? '#fff' : '#eee', width: '100%' }}>
                     <option value="">-- Select Product --</option>
                     {products.filter(p => p.setId === selectedSet).map(p => (
                       <option key={p.id} value={p.title}>{p.title}</option>
                     ))}
                   </select>
                 </div>
              </div>

              <button 
                type="submit" 
                className="checkout-btn" 
                disabled={submitting}
                style={{ width: '100%', opacity: submitting ? 0.7 : 1, marginTop: '1rem' }}
              >
                {submitting ? 'Submitting...' : 'Post Review'}
              </button>
            </form>
          )}
        </div>

        {/* Reviews Masonry Display */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {reviews.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: '#888' }}>
              Loading reviews...
            </div>
          ) : (
            reviews.map(review => (
              <div key={review.id} style={{ background: 'var(--card-bg)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div>
                    <h3 style={{ margin: '0 0 0.2rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {review.name}
                      {review.source && (
                         <span style={{ fontSize: '0.75rem', background: '#111', color: '#fff', padding: '2px 8px', borderRadius: '12px', fontWeight: 'normal' }}>
                           {review.source}
                         </span>
                      )}
                    </h3>
                    <div style={{ color: '#fbbf24', letterSpacing: '2px', fontSize: '1.2rem' }}>
                      {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                    </div>
                  </div>
                  <span style={{ color: '#888', fontSize: '0.9rem' }}>{review.date}</span>
                </div>
                <p style={{ margin: '0 0 1rem 0', lineHeight: '1.6', color: 'var(--text-color)', opacity: 0.9 }}>
                  "{review.message}"
                </p>
                {review.image && (
                  <div style={{ marginTop: '1rem', paddingBottom: '1rem' }}>
                     <img src={review.image} alt="Review pull" style={{ maxWidth: '100px', maxHeight: '100px', borderRadius: '8px', objectFit: 'cover', border: '1px solid var(--border-color)' }} />
                  </div>
                )}
                {review.product && (
                  <div style={{ color: '#888', fontSize: '0.85rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.8rem' }}>
                    Item: <span style={{ color: '#666' }}>{review.product}</span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
