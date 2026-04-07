import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

const API = import.meta.env.PROD ? 'https://sgtradingcard.onrender.com' : 'http://localhost:3001';

const SellerProfile = ({ sellerId, onBack, onViewProduct, onAddToCart, user, token }) => {
  const [profile, setProfile] = useState(null);
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Review Form State
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchSellerData = async () => {
      try {
        setIsLoading(true);
        // Fetch Profile
        const profileRes = await fetch(`${API}/api/sellers/profile/${sellerId}`);
        if (profileRes.ok) setProfile(await profileRes.json());
        
        // Fetch Seller Products (Public)
        const prodRes = await fetch(`${API}/api/products`);
        if (prodRes.ok) {
          const allProds = await prodRes.json();
          setProducts(allProds.filter(p => p.sellerId === sellerId));
        }

        // Fetch Reviews
        const repRes = await fetch(`${API}/api/sellers/${sellerId}/reviews`);
        if (repRes.ok) setReviews(await repRes.json());

      } catch (err) {
        console.error('Failed to fetch seller data:', err);
      } finally {
        setIsLoading(false);
      }
    };
    if (sellerId) fetchSellerData();
  }, [sellerId]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      alert("You must be logged in to leave a review.");
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch(`${API}/api/sellers/${sellerId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ rating, comment })
      });
      if (res.ok) {
        const newRev = await res.json();
        setReviews([...reviews, newRev]);
        setComment('');
        setRating(5);
      } else {
        const data = await res.json();
        alert(data.error || "Failed to submit review");
      }
    } catch (err) {
       console.error("Review Error:", err);
    } finally {
       setIsSubmitting(false);
    }
  };

  if (isLoading) return <div style={{ padding: '4rem', textAlign: 'center' }}>Loading profile...</div>;
  if (!profile) return <div style={{ padding: '4rem', textAlign: 'center' }}>Seller not found or may have been deleted.</div>;

  const averageRating = reviews.length > 0 ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) : 'No Ratings';

  return (
    <div className="product-page" style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <button className="back-btn" onClick={onBack} style={{ marginBottom: '2rem' }}>← Back to Grand Exchange</button>

      {/* Profile Header */}
      <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: '12px', padding: '2rem', marginBottom: '2rem', display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center' }}>
        <div style={{ width: '100px', height: '100px', background: '#f5f5f5', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '2rem', color: '#ccc' }}>
          👤
        </div>
        <div style={{ flex: 1 }}>
          <h2 style={{ margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {profile.username}
            {profile.isVerified && (
              <span style={{ fontSize: '1rem', background: '#fff6e5', color: '#b7791f', padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                ⭐ Verified Seller
              </span>
            )}
          </h2>
          <div style={{ display: 'flex', gap: '1.5rem', color: '#666', fontSize: '0.9rem' }}>
            <span><strong>{profile.fulfilledSales}</strong> Fulfilled Sales</span>
            <span><strong>{reviews.length}</strong> Reviews ({averageRating} ⭐)</span>
            <span>Member since: {new Date(profile.joinedAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '2rem' }}>
        
        {/* Left Col: Inventory */}
        <div>
          <h3 style={{ borderBottom: '2px solid #eee', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>Active Listings ({products.length})</h3>
          {products.length === 0 ? (
            <p style={{ color: '#666' }}>This seller has no active market listings.</p>
          ) : (
            <div className="product-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
              {products.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={onAddToCart} 
                  onProductClick={() => onViewProduct(product)} 
                />
              ))}
            </div>
          )}
        </div>

        {/* Right Col: Reviews */}
        <div>
           <h3 style={{ borderBottom: '2px solid #eee', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>Community Reviews</h3>
           
           {/* Write Review Form */}
           {user ? (
             <form onSubmit={handleReviewSubmit} style={{ background: '#f9f9f9', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem' }}>
               <h4 style={{ margin: '0 0 1rem 0' }}>Write a Review</h4>
               <div style={{ marginBottom: '1rem' }}>
                 <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Rating</label>
                 <select value={rating} onChange={e => setRating(Number(e.target.value))} style={{ width: '100%', padding: '0.5rem' }}>
                   <option value="5">⭐⭐⭐⭐⭐ (5/5)</option>
                   <option value="4">⭐⭐⭐⭐ (4/5)</option>
                   <option value="3">⭐⭐⭐ (3/5)</option>
                   <option value="2">⭐⭐ (2/5)</option>
                   <option value="1">⭐ (1/5)</option>
                 </select>
               </div>
               <div style={{ marginBottom: '1rem' }}>
                 <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Comment (Optional)</label>
                 <textarea 
                   rows="3" 
                   value={comment} 
                   onChange={e => setComment(e.target.value)}
                   style={{ width: '100%', padding: '0.5rem', fontFamily: 'inherit' }}
                   placeholder="How was the shipping speed and card condition?"
                 />
               </div>
               <button disabled={isSubmitting} type="submit" style={{ background: '#000', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                 {isSubmitting ? 'Submitting...' : 'Post Review'}
               </button>
             </form>
           ) : (
             <div style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '8px', marginBottom: '2rem', textAlign: 'center', fontSize: '0.9rem', color: '#666' }}>
               Please log in or create an account to leave a review.
             </div>
           )}

           {/* Review List */}
           {reviews.length === 0 ? (
             <p style={{ color: '#666' }}>No reviews yet.</p>
           ) : (
             <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
               {reviews.slice().reverse().map(rev => (
                 <div key={rev.id} style={{ border: '1px solid #eee', borderRadius: '8px', padding: '1rem', background: '#fff' }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                     <span style={{ fontWeight: 'bold' }}>{rev.buyerName}</span>
                     <span style={{ color: '#b7791f', letterSpacing: '2px' }}>
                       {'⭐'.repeat(rev.rating)}
                     </span>
                   </div>
                   <div style={{ fontSize: '0.75rem', color: '#999', marginBottom: '0.5rem' }}>
                     {new Date(rev.date).toLocaleDateString()}
                   </div>
                   {rev.comment && (
                     <p style={{ margin: 0, fontSize: '0.9rem', color: '#444', lineHeight: 1.4 }}>
                       "{rev.comment}"
                     </p>
                   )}
                 </div>
               ))}
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;
