import React, { useState, useEffect } from 'react';

const API = 'https://sgtradingcard.onrender.com';

const SellerDashboard = ({ user, token, onLogout }) => {
  const [listings, setListings] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    imgUrl: '',
    shippingFee: '1.00',
    condition: 'Near Mint',
    description: ''
  });
  const [stripeStatus, setStripeStatus] = useState({ checked: false, charges_enabled: false });

  const fetchListings = async () => {
    try {
      const res = await fetch(`${API}/api/seller/products`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setListings(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const checkStripeStatus = async () => {
    try {
      const res = await fetch(`${API}/api/seller/onboard-status`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setStripeStatus({ checked: true, charges_enabled: data.charges_enabled });
      }
    } catch (err) {
      console.error('Failed to check Stripe status', err);
    }
  };

  useEffect(() => {
    fetchListings();
    checkStripeStatus();
  }, [token]);

  const handleStripeConnect = async () => {
    try {
      const res = await fetch(`${API}/api/seller/onboard`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url; // Redirect to official Stripe onboarding
      } else {
        alert(`Stripe Error: ${data.error || 'Unknown error'}`);
      }
    } catch (err) {
      alert('Error initiating Stripe Connect. Is the server running?');
    }
  };

  const handleCreateListing = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/api/seller/products`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({
          ...formData,
          setId: 'singles', // Market listings go to the Singles category
          price: `$${parseFloat(formData.price).toFixed(2)}`,
          shippingFee: `$${parseFloat(formData.shippingFee).toFixed(2)}`,
          soldOut: false
        })
      });
      if (res.ok) {
        setIsAdding(false);
        setFormData({ title: '', price: '', imgUrl: '', shippingFee: '1.00', condition: 'Near Mint', description: '' });
        fetchListings();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Remove this listing from The Grand Exchange?')) return;
    try {
      const res = await fetch(`${API}/api/seller/products/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) fetchListings();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '2rem auto', padding: '0 5%' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '2px solid #eee', paddingBottom: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '2rem' }}>The Grand Exchange</h2>
          <p style={{ color: 'var(--text-light)' }}>Welcome back, {user.username}!</p>
        </div>
        <button onClick={onLogout} style={{ padding: '8px 16px', background: '#eee', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Sign Out</button>
      </header>

      {stripeStatus.checked && !stripeStatus.charges_enabled && (
        <div style={{ background: '#fff3cd', border: '1px solid #ffeeba', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem', color: '#856404', textAlign: 'center' }}>
          <h3 style={{ marginBottom: '1rem' }}>Action Required: Connect Payout Account</h3>
          <p style={{ marginBottom: '1.5rem', maxWidth: '600px', margin: '0 auto 1.5rem' }}>
            To legally accept payments and securely receive your 94.5% earnings directly to your bank, you must complete the secure Stripe Express onboarding. S&G Trading does not hold your funds.
          </p>
          <button 
            onClick={handleStripeConnect}
            style={{ padding: '12px 24px', background: '#635bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.1rem' }}
          >
            Connect Bank Account via Stripe
          </button>
        </div>
      )}

      {stripeStatus.charges_enabled && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.5rem' }}>Your Active Listings ({listings.length})</h3>
          <button 
            onClick={() => setIsAdding(!isAdding)}
            style={{ padding: '10px 20px', background: '#000', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            {isAdding ? 'Cancel' : '+ List a Card'}
          </button>
        </div>
      )}

      {isAdding && (
        <form onSubmit={handleCreateListing} style={{ background: '#f9f9f9', padding: '2rem', borderRadius: '8px', marginBottom: '2rem', border: '1px solid #ddd' }}>
          <h4 style={{ marginBottom: '1.5rem' }}>Create New Listing</h4>
          
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ flex: 2 }}>
              <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.3rem' }}>Card Name / Title</label>
              <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} style={{ width: '100%', padding: '0.5rem' }} placeholder="e.g. PSA 10 Base Set Charizard" />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.3rem' }}>Price ($) (You keep 94.5%)</label>
              <input required type="number" step="0.01" min="0.50" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} style={{ width: '100%', padding: '0.5rem' }} placeholder="100.00" />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.3rem' }}>Shipping Fee ($) (Buyer pays)</label>
              <select value={formData.shippingFee} onChange={e => setFormData({...formData, shippingFee: e.target.value})} style={{ width: '100%', padding: '0.5rem' }}>
                <option value="1.00">$1.00 (Plain White Envelope)</option>
                <option value="4.50">$4.50 (Bubble Mailer w/ Tracking)</option>
                <option value="0.00">Free Shipping</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.3rem' }}>Condition</label>
              <select value={formData.condition} onChange={e => setFormData({...formData, condition: e.target.value})} style={{ width: '100%', padding: '0.5rem' }}>
                <option value="PSA 10">PSA 10 (Gem Mint)</option>
                <option value="PSA 9">PSA 9 (Mint)</option>
                <option value="Near Mint">Raw (Near Mint)</option>
                <option value="Lightly Played">Raw (Lightly Played)</option>
                <option value="Heavily Played">Raw (Heavily Played)</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.3rem' }}>Image URL (Square 500x500 recommended)</label>
            <input required type="url" value={formData.imgUrl} onChange={e => setFormData({...formData, imgUrl: e.target.value})} style={{ width: '100%', padding: '0.5rem' }} placeholder="https://..." />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.3rem' }}>Description / Flaws</label>
            <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} style={{ width: '100%', padding: '0.5rem', minHeight: '80px' }} placeholder="Describe edge wear, scratches, or cert numbers..." />
          </div>

          <button type="submit" style={{ padding: '10px 20px', background: '#2E8B57', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Submit to Grand Exchange</button>
        </form>
      )}

      {listings.length === 0 && !isAdding && (
        <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-light)' }}>
          <p>You haven't listed any cards yet.</p>
        </div>
      )}

      {listings.length > 0 && (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {listings.map(item => (
            <div key={item.id} style={{ display: 'flex', alignItems: 'center', padding: '1rem', border: '1px solid #eee', borderRadius: '8px' }}>
              <img src={item.imgUrl} alt={item.title} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px', marginRight: '1rem', background: '#f5f5f5' }} />
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: 0 }}>{item.title}</h4>
                <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '4px' }}>
                  {item.price} • +{item.shippingFee} Shipping • {item.condition}
                </div>
              </div>
              <button onClick={() => handleDelete(item.id)} style={{ padding: '6px 12px', background: '#ffeded', color: '#e3350d', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SellerDashboard;
