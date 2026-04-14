import React, { useState, useEffect } from 'react';

const API = import.meta.env.PROD ? 'https://sgtradingcard.onrender.com' : 'http://localhost:3001';

const SellerDashboard = ({ user, token, onLogout }) => {
  const [activeTab, setActiveTab] = useState('listings'); // 'listings' | 'orders'
  const [orders, setOrders] = useState([]);
  const [listings, setListings] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    imgUrl: '',
    shippingFee: '1.00',
    cardType: 'Single',
    condition: 'Mint',
    gradeCompany: 'PSA',
    gradeValue: '10',
    description: '',
    stock: 1
  });
  const [stripeStatus, setStripeStatus] = useState({ checked: false, charges_enabled: false });
  const [tierInfo, setTierInfo] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [imgPreview, setImgPreview] = useState(null);

  const handlePasteImage = (e) => {
    if (!e.clipboardData) return;
    const items = e.clipboardData.items;
    let file = null;
    for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
            file = items[i].getAsFile();
            break;
        }
    }
    if (file) handleImageFile(file);
  };

  const handleImageFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => setImgPreview(e.target.result);
    reader.readAsDataURL(file);
  };

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

      // Fetch Tier Info
      const volRes = await fetch(`${API}/api/seller/volume`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (volRes.ok) {
        setTierInfo(await volRes.json());
      }
    } catch (err) {
      console.error('Failed to check Stripe status', err);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API}/api/seller/orders`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setOrders(await res.json());
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchListings();
    fetchOrders();
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
    setIsUploading(true);
    try {
      let finalImgUrl = formData.imgUrl;
      
      if (imgPreview && imgPreview.startsWith('data:image')) {
        const uploadRes = await fetch(`${API}/api/admin/upload-image`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
          },
          body: JSON.stringify({ image: imgPreview })
        });
        const uploadData = await uploadRes.json();
        if (uploadRes.ok) finalImgUrl = uploadData.url;
      }

      const res = await fetch(`${API}/api/seller/products`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({
          title: formData.title,
          price: `$${parseFloat(formData.price).toFixed(2)}`,
          imgUrl: finalImgUrl,
          shippingFee: `$${parseFloat(formData.shippingFee).toFixed(2)}`,
          condition: formData.cardType === 'Graded' ? `${formData.gradeCompany} ${formData.gradeValue}` : formData.condition,
          description: formData.description,
          setId: 'singles',
          stock: parseInt(formData.stock) || 1,
          soldOut: false
        })
      });
      if (res.ok) {
        setIsAdding(false);
        setFormData({ title: '', price: '', imgUrl: '', shippingFee: '1.00', cardType: 'Single', condition: 'Mint', gradeCompany: 'PSA', gradeValue: '10', description: '', stock: 1 });
        setImgPreview(null);
        fetchListings();
      }
    } catch (err) {
      console.error(err);
    }
    setIsUploading(false);
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
    <div className="ge-page-wrapper" style={{ maxWidth: '1400px', margin: '0 auto' }}>
      
      {/* Premium Dashboard Header */}
      <div className="ge-hero-container" style={{ marginBottom: '2.5rem' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '2rem' }}>
          <div>
            <h2 className="ge-hero-title">The Grand Exchange</h2>
            <p className="ge-hero-subtitle">Seller Dashboard — Welcome back, {user.username}!</p>
          </div>
          <div>
            <button 
              onClick={onLogout}
              style={{ 
                background: 'rgba(255, 255, 255, 0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)', 
                padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer',
                backdropFilter: 'blur(10px)', transition: 'all 0.2s'
              }}
              onMouseOver={(e) => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#000'; }}
              onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'; e.currentTarget.style.color = '#fff'; }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {tierInfo && stripeStatus.charges_enabled && (
        <div style={{ background: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.8)', padding: '2rem', borderRadius: '16px', marginBottom: '2.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.2rem' }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#2b6cb0', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '0.4rem' }}>Seller Level: {tierInfo.tierName}</div>
              <h3 style={{ margin: 0, fontSize: '1.8rem', color: '#1a202c', fontWeight: '900' }}>{tierInfo.feePercentage}% Platform Fee</h3>
            </div>
            {tierInfo.nextTierThreshold ? (
               <div style={{ fontSize: '0.95rem', color: '#4a5568', textAlign: 'right', fontWeight: '600' }}>
                 ${tierInfo.lifetimeVolumeUsd.toLocaleString()} / ${tierInfo.nextTierThreshold.toLocaleString()} <br/>
                 <span style={{ fontSize: '0.8rem', color: '#2b6cb0', display: 'block', marginTop: '4px' }}>${ (tierInfo.nextTierThreshold - tierInfo.lifetimeVolumeUsd).toFixed(2) } until {tierInfo.nextTierFee}% Fee</span>
               </div>
            ) : (
               <div style={{ fontSize: '0.95rem', color: '#276749', textAlign: 'right', fontWeight: 'bold' }}>
                 Lifetime Volume: ${tierInfo.lifetimeVolumeUsd.toLocaleString()}<br/>
                 <span style={{ fontSize: '0.85rem' }}>✨ Max Tier Unlocked!</span>
               </div>
            )}
          </div>
          {tierInfo.nextTierThreshold && (
            <div style={{ background: '#e2e8f0', height: '12px', borderRadius: '6px', overflow: 'hidden' }}>
              <div style={{ background: 'linear-gradient(to right, #4299e1, #2b6cb0)', height: '100%', width: `${Math.min(100, (tierInfo.lifetimeVolumeUsd / tierInfo.nextTierThreshold) * 100)}%`, transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)' }} />
            </div>
          )}
        </div>
      )}

      {stripeStatus.checked && !stripeStatus.charges_enabled && (
        <div style={{ background: '#fff3cd', border: '1px solid #ffeeba', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem', color: '#856404', textAlign: 'center' }}>
          <h3 style={{ marginBottom: '1rem' }}>Action Required: Connect Payout Account</h3>
          <p style={{ marginBottom: '1.5rem', maxWidth: '600px', margin: '0 auto 1.5rem' }}>
            To legally accept payments and securely receive your tiered earnings (up to 92.5%) directly to your bank, you must complete the secure Stripe Express onboarding. S&G Trading does not hold your funds.
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
        <div style={{ display: 'flex', gap: '2rem', marginBottom: '2.5rem', borderBottom: '2px solid rgba(0,0,0,0.05)', paddingBottom: '0.5rem', overflowX: 'auto' }}>
          <button 
             onClick={() => setActiveTab('listings')}
             style={{ 
               padding: '12px 0', fontSize: '1.1rem', background: 'transparent', 
               color: activeTab === 'listings' ? '#1a202c' : '#718096', border: 'none', 
               borderBottom: activeTab === 'listings' ? '3px solid #ffd700' : '3px solid transparent',
               cursor: 'pointer', fontWeight: '800', transition: 'all 0.2s', outline: 'none', whiteSpace: 'nowrap'
             }}
          >
            My Listings ({listings.length})
          </button>
          <button 
             onClick={() => setActiveTab('orders')}
             style={{ 
               padding: '12px 0', fontSize: '1.1rem', background: 'transparent', 
               color: activeTab === 'orders' ? '#1a202c' : '#718096', border: 'none', 
               borderBottom: activeTab === 'orders' ? '3px solid #ffd700' : '3px solid transparent',
               cursor: 'pointer', fontWeight: '800', transition: 'all 0.2s', outline: 'none', whiteSpace: 'nowrap'
             }}
          >
            Pending Shipments ({orders.filter(o => o.status !== 'fulfilled').length})
          </button>
          <button 
             onClick={() => setActiveTab('completed')}
             style={{ 
               padding: '12px 0', fontSize: '1.1rem', background: 'transparent', 
               color: activeTab === 'completed' ? '#1a202c' : '#718096', border: 'none', 
               borderBottom: activeTab === 'completed' ? '3px solid #ffd700' : '3px solid transparent',
               cursor: 'pointer', fontWeight: '800', transition: 'all 0.2s', outline: 'none', whiteSpace: 'nowrap'
             }}
          >
            Completed Orders ({orders.filter(o => o.status === 'fulfilled').length})
          </button>
        </div>
      )}

      {stripeStatus.charges_enabled && activeTab === 'listings' && (
        <>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.5rem' }}>Your Active Listings</h3>
          <button 
            onClick={() => setIsAdding(!isAdding)}
            style={{ padding: '10px 20px', background: '#000', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            {isAdding ? 'Cancel' : '+ List a Card'}
          </button>
        </div>

      {isAdding && (
        <form onSubmit={handleCreateListing} onPaste={handlePasteImage} style={{ background: 'rgba(255, 255, 255, 0.6)', backdropFilter: 'blur(12px)', padding: '2.5rem', borderRadius: '16px', marginBottom: '2.5rem', border: '1px solid rgba(255,255,255,0.8)', boxShadow: '0 8px 32px rgba(0,0,0,0.05)' }}>
          <h4 style={{ marginBottom: '1.5rem', fontSize: '1.4rem', fontWeight: '800', color: '#1a202c' }}>Create New Listing</h4>
          <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '1.5rem', marginTop: '-1rem' }}>
             Tip: You can use your phone camera to scan a card, or press <strong>Ctrl+V</strong> to paste a screenshot directly into this form!
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ flex: 2 }}>
              <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.3rem' }}>Card Name / Title</label>
              <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} style={{ width: '100%', padding: '0.5rem' }} placeholder="e.g. PSA 10 Base Set Charizard" />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                Price ($) 
                <span style={{ color: '#2E8B57', marginLeft: '6px', fontWeight: 'bold' }}>
                  (You keep {100 - (tierInfo ? tierInfo.feePercentage : 10)}% {formData.price && !isNaN(formData.price) ? `— $${(parseFloat(formData.price) * (100 - (tierInfo ? tierInfo.feePercentage : 10)) / 100).toFixed(2)}` : ''})
                </span>
              </label>
              <input required type="number" step="0.01" min="0.50" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} style={{ width: '100%', padding: '0.5rem' }} placeholder="100.00" />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.3rem' }}>Stock Quantity</label>
              <input required type="number" min="1" step="1" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} style={{ width: '100%', padding: '0.5rem' }} placeholder="1" />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.3rem' }}>Shipping Fee ($) (Buyer pays)</label>
              <input required type="number" step="0.01" min="0.00" value={formData.shippingFee} onChange={e => setFormData({...formData, shippingFee: e.target.value})} style={{ width: '100%', padding: '0.5rem' }} placeholder="1.00" />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.3rem' }}>Format</label>
              <select value={formData.cardType} onChange={e => setFormData({...formData, cardType: e.target.value})} style={{ width: '100%', padding: '0.5rem' }}>
                <option value="Single">Single (Raw)</option>
                <option value="Graded">Graded (Slab)</option>
              </select>
            </div>
            
            {formData.cardType === 'Single' ? (
              <div style={{ flex: 1.5 }}>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.3rem' }}>Condition</label>
                <select value={formData.condition} onChange={e => setFormData({...formData, condition: e.target.value})} style={{ width: '100%', padding: '0.5rem' }}>
                  <option value="Mint">Mint</option>
                  <option value="Light Play">Light Play</option>
                  <option value="Moderate Play">Moderate Play</option>
                  <option value="Heavy Play">Heavy Play</option>
                </select>
              </div>
            ) : (
              <>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.3rem' }}>Company</label>
                  <select value={formData.gradeCompany} onChange={e => setFormData({...formData, gradeCompany: e.target.value})} style={{ width: '100%', padding: '0.5rem' }}>
                    <option value="PSA">PSA</option>
                    <option value="CGC">CGC</option>
                    <option value="Beckett">Beckett</option>
                  </select>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.3rem' }}>Grade</label>
                  <select value={formData.gradeValue} onChange={e => setFormData({...formData, gradeValue: e.target.value})} style={{ width: '100%', padding: '0.5rem' }}>
                    {[10, 9.5, 9, 8.5, 8, 7, 6, 5, 4, 3, 2, 1].map(g => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>
              </>
            )}
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.3rem' }}>Product Image</label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '0.5rem' }}>
              <input type="file" accept="image/*" capture="environment" onChange={(e) => handleImageFile(e.target.files[0])} style={{ flex: 1, minWidth: '200px', cursor: 'pointer' }} />
              <span style={{ margin: 'auto 0', fontSize: '0.85rem' }}>or URL:</span>
              <input required={!imgPreview} type="url" value={formData.imgUrl} onChange={e => setFormData({...formData, imgUrl: e.target.value})} style={{ flex: 1, minWidth: '200px', padding: '0.5rem' }} placeholder="https://..." />
            </div>
            {imgPreview && (
              <div style={{ padding: '0.5rem', background: '#fff', border: '1px dashed #ccc', borderRadius: '8px', textAlign: 'center', width: '200px', height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img src={imgPreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
              </div>
            )}
            {!imgPreview && formData.imgUrl && (
              <div style={{ padding: '0.5rem', background: '#fff', border: '1px dashed #ccc', borderRadius: '8px', textAlign: 'center', width: '200px', height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img src={formData.imgUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} onError={(e) => e.target.style.display='none'} />
              </div>
            )}
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.3rem' }}>Description / Flaws</label>
            <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} style={{ width: '100%', padding: '0.5rem', minHeight: '80px' }} placeholder="Describe edge wear, scratches, or cert numbers..." />
          </div>

          <button type="submit" disabled={isUploading} style={{ padding: '10px 20px', background: '#2E8B57', color: '#fff', border: 'none', borderRadius: '4px', cursor: isUploading ? 'not-allowed' : 'pointer', fontWeight: 'bold' }}>{isUploading ? 'Uploading...' : 'Submit to Grand Exchange'}</button>
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
      </>
      )}

      {stripeStatus.charges_enabled && activeTab === 'orders' && (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.5rem' }}>Pending Shipments</h3>
          </div>
          <div style={{ padding: '1rem', background: '#e3f2fd', borderLeft: '4px solid #2196f3', borderRadius: '4px', marginBottom: '1.5rem' }}>
            <strong>Shipping Tip:</strong> You are responsible for purchasing your own shipping labels through any carrier. Pack securely and ensure you upload the Tracking Number here to get paid. If shipping via plain white envelope (PWE) with no tracking, check the "Ship without tracking" box.
          </div>
          {orders.filter(o => o.status !== 'fulfilled').length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-light)' }}>
              <p>You have no pending orders.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '1rem' }}>
              {orders.filter(o => o.status !== 'fulfilled').map(order => (
                <div key={order.id} style={{ padding: '2rem', border: '1px solid rgba(255,255,255,0.8)', borderRadius: '16px', background: 'rgba(255, 255, 255, 0.6)', backdropFilter: 'blur(10px)', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div>
                      <h4 style={{ margin: 0, color: '#333' }}>Order #{order.id}</h4>
                      <div style={{ fontSize: '0.85rem', color: '#666' }}>{new Date(order.date).toLocaleDateString()}</div>
                    </div>
                    <span style={{ padding: '4px 8px', background: '#fff3cd', color: '#856404', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 'bold' }}>
                      UNFULFILLED
                    </span>
                  </div>

                  <div style={{ marginBottom: '1rem', padding: '1rem', background: '#f8f9fa', borderRadius: '6px' }}>
                    <h5 style={{ margin: '0 0 0.5rem 0' }}>Ship To:</h5>
                    <div style={{ fontSize: '0.9rem', color: '#444' }}>
                      <strong>{order.secureShippingAddress?.name || 'Loading from Stripe...'}</strong><br/>
                      {order.secureShippingAddress?.address?.line1}<br/>
                      {order.secureShippingAddress?.address?.line2 && <>{order.secureShippingAddress.address.line2}<br/></>}
                      {order.secureShippingAddress?.address?.city}, {order.secureShippingAddress?.address?.state} {order.secureShippingAddress?.address?.postal_code}
                    </div>
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <h5 style={{ margin: '0 0 0.5rem 0' }}>Items:</h5>
                    <ul style={{ margin: 0, paddingLeft: '1.5rem', fontSize: '0.9rem' }}>
                      {order.items.filter(i => i.sellerId === user.id).map(item => (
                        <li key={item.id}>{item.title} (x{item.qty})</li>
                      ))}
                    </ul>
                  </div>

                  <form 
                    onSubmit={async (e) => {
                      e.preventDefault();
                      const noTracking = e.target.noTracking.checked;
                      const val = noTracking ? 'No Tracking Provided / PWE' : e.target.tracking.value;
                      if (!val) return;
                      
                      try {
                        const res = await fetch(`${API}/api/seller/orders/${order.id}/tracking`, {
                          method: 'PUT',
                          headers: { 
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}` 
                          },
                          body: JSON.stringify({ trackingNumber: val })
                        });
                        if(res.ok) fetchOrders();
                      } catch (err) { alert('Error updating tracking'); }
                    }} 
                  >
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <input 
                        name="tracking"
                        type="text" 
                        placeholder="Paste Tracking Number..." 
                        style={{ flex: 1, padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} 
                      />
                      <button type="submit" style={{ padding: '0.5rem 1rem', background: '#2E8B57', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
                        Mark as Shipped
                      </button>
                    </div>
                    <div>
                      <label style={{ fontSize: '0.85rem', color: '#555', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                        <input type="checkbox" name="noTracking" onChange={(e) => {
                          e.target.form.tracking.required = !e.target.checked;
                          e.target.form.tracking.disabled = e.target.checked;
                        }} />
                        Ship without tracking (e.g. envelope)
                      </label>
                    </div>
                  </form>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {stripeStatus.charges_enabled && activeTab === 'completed' && (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.5rem' }}>Completed Orders</h3>
          </div>
          {orders.filter(o => o.status === 'fulfilled').length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-light)' }}>
              <p>You have no completed orders.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '1rem' }}>
              {orders.filter(o => o.status === 'fulfilled').map(order => (
                <div key={order.id} style={{ padding: '1.5rem', border: '1px solid rgba(0,0,0,0.05)', borderRadius: '12px', background: '#f9f9f9', opacity: '0.9' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <div>
                      <h4 style={{ margin: 0, color: '#555' }}>Order #{order.id}</h4>
                      <div style={{ fontSize: '0.85rem', color: '#888' }}>{new Date(order.date).toLocaleDateString()}</div>
                    </div>
                    <span style={{ padding: '4px 8px', background: '#e6fffa', color: '#276749', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 'bold', height: 'fit-content' }}>
                      SHIPPED
                    </span>
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#666', marginTop: '1rem' }}>
                    <strong>Tracking Info:</strong> {order.trackingNumber}
                  </div>
                  <div style={{ marginTop: '0.5rem' }}>
                    <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.85rem', color: '#777' }}>
                      {order.items.filter(i => i.sellerId === user.id).map(item => (
                        <li key={item.id}>{item.title} (x{item.qty})</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

    </div>
  );
};

export default SellerDashboard;
