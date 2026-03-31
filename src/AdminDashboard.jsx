import React, { useState, useEffect } from 'react';

const API = 'https://sgtradingcard.onrender.com';

const AdminDashboard = ({ token, onLogout }) => {
  const [products, setProducts] = useState([]);
  const [sets, setSets] = useState([]);
  const [orders, setOrders] = useState([]);
  const [shippingPresets, setShippingPresets] = useState([]);
  
  const [filterSet, setFilterSet] = useState('all');
  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'orders'

  const [editing, setEditing] = useState(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ title: '', price: '', setId: '', imgUrl: '', description: '', stock: 0 });
  const [toast, setToast] = useState(null);

  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2000); };

  useEffect(() => {
    const fetchHeaders = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };
    fetch(`${API}/api/products`).then(r => r.json()).then(setProducts);
    fetch(`${API}/api/sets`).then(r => r.json()).then(setSets);
    fetch(`${API}/api/admin/orders`, { headers: fetchHeaders }).then(r => r.json()).then(setOrders);
    fetch(`${API}/api/admin/shipping-presets`, { headers: fetchHeaders }).then(r => r.json()).then(setShippingPresets);
  }, [token]);

  const toggleStock = async (id, currentStock) => {
    // Legacy mapping fallback - toggling sets stock to 50 if currently 0
    const newStock = currentStock === 0 ? 50 : 0;
    const res = await fetch(`${API}/api/admin/products/${id}`, { 
      method: 'PUT', headers, body: JSON.stringify({ stock: newStock, soldOut: newStock === 0 }) 
    });
    const updated = await res.json();
    setProducts(prev => prev.map(p => p.id === id ? updated : p));
    showToast(`Stock updated to ${newStock}`);
  };

  const deleteProduct = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    await fetch(`${API}/api/admin/products/${id}`, { method: 'DELETE', headers });
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast('Product deleted');
  };

  const startEdit = (product) => {
    setEditing(product.id);
    setForm({ title: product.title, price: product.price, setId: product.setId, imgUrl: product.imgUrl || '', description: product.description || '', stock: product.stock !== undefined ? product.stock : (product.soldOut ? 0 : 50) });
    setAdding(false);
  };

  const startAdd = () => {
    setAdding(true);
    setEditing(null);
    setForm({ title: '', price: '', setId: sets[0]?.id || '', imgUrl: '', description: '', stock: 50 });
  };

  const cancelEdit = () => { setEditing(null); setAdding(false); };

  const saveProduct = async (e) => {
    e.preventDefault();
    if (editing) {
      const payload = { ...form, soldOut: form.stock === 0 };
      const res = await fetch(`${API}/api/admin/products/${editing}`, {
        method: 'PUT', headers, body: JSON.stringify(payload)
      });
      const updated = await res.json();
      setProducts(prev => prev.map(p => p.id === editing ? updated : p));
      showToast('Product updated');
    } else {
      const payload = { ...form, soldOut: form.stock === 0 };
      const res = await fetch(`${API}/api/admin/products`, {
        method: 'POST', headers, body: JSON.stringify(payload)
      });
      const newProduct = await res.json();
      setProducts(prev => [...prev, newProduct]);
      showToast('Product added');
    }
    cancelEdit();
  };

  // ─── Shipping Label Logic ───
  const [shippingModal, setShippingModal] = useState({ open: false, order: null });
  const [shippingForm, setShippingForm] = useState({ mode: 'preset', presetId: '', length: '', width: '', height: '', weight: '' });
  const [shippingQuote, setShippingQuote] = useState(null);
  const [gettingQuote, setGettingQuote] = useState(false);

  const openShippingModal = (order) => {
    setShippingModal({ open: true, order });
    setShippingForm({ mode: 'preset', presetId: shippingPresets[0]?.id || '', length: '', width: '', height: '', weight: '' });
    setShippingQuote(null);
  };

  const cancelShipping = () => {
    setShippingModal({ open: false, order: null });
  };

  const getShippingQuote = async () => {
    setGettingQuote(true);
    let parcel = {};

    if (shippingForm.mode === 'preset') {
       const preset = shippingPresets.find(p => p.id === shippingForm.presetId);
       if (!preset) return setGettingQuote(false);
       parcel = { length: preset.length, width: preset.width, height: preset.height, weight: preset.weight };
    } else {
       parcel = { length: shippingForm.length, width: shippingForm.width, height: shippingForm.height, weight: shippingForm.weight };
    }

    try {
      const res = await fetch(`${API}/api/shipments/quote`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ toAddress: shippingModal.order.shippingAddress, parcel })
      });
      const data = await res.json();
      setShippingQuote({ rates: data.rates, parcel, shipmentId: data.shipmentId });
    } catch (err) {
      console.error(err);
      showToast('Failed to fetch quote');
    }
    setGettingQuote(false);
  };

  const [purchasingRate, setPurchasingRate] = useState(null);
  const [purchasedLabel, setPurchasedLabel] = useState(null);

  const purchaseLabel = async (rateId) => {
    setPurchasingRate(rateId);
    try {
      const res = await fetch(`${API}/api/shipments/label`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ rateId, orderId: shippingModal.order.id })
      });
      const data = await res.json();
      
      if (res.ok) {
        setPurchasedLabel(data);
        showToast('Label successfully generated!');
        // Update local order table
        setOrders(prev => prev.map(o => o.id === shippingModal.order.id ? { ...o, status: 'fulfilled', trackingNumber: data.trackingNumber, trackingUrl: data.trackingUrl } : o));
      } else {
        showToast(data.error || 'Label purchase failed');
      }
    } catch (err) {
      console.error(err);
      showToast('Label purchase failed');
    }
    setPurchasingRate(null);
  };

  // ─── Box Presets Management Logic ───
  const [addingPreset, setAddingPreset] = useState(false);
  const [presetForm, setPresetForm] = useState({ name: '', length: '', width: '', height: '', weight: '' });

  const savePreset = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/api/admin/shipping-presets`, {
        method: 'POST',
        headers,
        body: JSON.stringify(presetForm)
      });
      const newPreset = await res.json();
      setShippingPresets(prev => [...prev, newPreset]);
      setAddingPreset(false);
      setPresetForm({ name: '', length: '', width: '', height: '', weight: '' });
      showToast('Preset saved');
    } catch {
      showToast('Failed to save preset');
    }
  };

  const deletePreset = async (id) => {
    if (!window.confirm('Delete this box preset?')) return;
    try {
      await fetch(`${API}/api/admin/shipping-presets/${id}`, { method: 'DELETE', headers });
      setShippingPresets(prev => prev.filter(p => p.id !== id));
      showToast('Preset deleted');
    } catch {
      showToast('Failed to delete preset');
    }
  };

  const filtered = filterSet === 'all' ? products : products.filter(p => p.setId === filterSet);
  const inStock = products.filter(p => p.stock > 0 || (p.stock === undefined && !p.soldOut)).length;
  const soldOut = products.filter(p => p.stock === 0 || (p.stock === undefined && p.soldOut)).length;

  return (
    <section className="admin-section">
      {toast && <div className="toast-notification">{toast}</div>}
      
      <div className="admin-header">
        <div>
          <h2>📦 Admin Dashboard</h2>
          {activeTab === 'products' ? (
            <p className="admin-stats">{products.length} products · {inStock} in stock · {soldOut} sold out</p>
          ) : (
            <p className="admin-stats">{orders.filter(o => o.status === 'unfulfilled').length} pending orders</p>
          )}
        </div>
        <div className="admin-actions">
          {activeTab === 'products' && <button className="admin-add-btn" onClick={startAdd}>+ Add Product</button>}
          <button className="admin-logout-btn" onClick={onLogout}>Logout</button>
        </div>
      </div>

      <div className="admin-tabs">
        <button className={activeTab === 'products' ? 'active-tab' : ''} onClick={() => setActiveTab('products')}>Inventory</button>
        <button className={activeTab === 'orders' ? 'active-tab' : ''} onClick={() => setActiveTab('orders')}>Orders & Shipping</button>
      </div>

      {activeTab === 'products' && (
        <>
          {/* Filter Bar */}
          <div className="admin-filter-bar">
            <button className={filterSet === 'all' ? 'active' : ''} onClick={() => setFilterSet('all')}>All ({products.length})</button>
            {sets.map(s => {
              const count = products.filter(p => p.setId === s.id).length;
              if (count === 0) return null;
              return <button key={s.id} className={filterSet === s.id ? 'active' : ''} onClick={() => setFilterSet(s.id)}>{s.name} ({count})</button>;
            })}
          </div>

      {/* Add/Edit Form */}
      {(adding || editing) && (
        <div className="admin-form-card">
          <h3>{editing ? 'Edit Product' : 'Add New Product'}</h3>
          <form onSubmit={saveProduct} className="admin-form">
            <div className="form-group full-width">
              <label>Title</label>
              <input type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Price (e.g. $7.99)</label>
              <input type="text" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Set / Category</label>
              <select value={form.setId} onChange={e => setForm({...form, setId: e.target.value})}>
                {sets.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div className="form-group full-width">
              <label>Image URL</label>
              <input type="text" value={form.imgUrl} onChange={e => setForm({...form, imgUrl: e.target.value})} placeholder="https://..." />
            </div>
            <div className="form-group full-width">
              <label>Description <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0, color: '#aaa' }}>(what's in the box)</span></label>
              <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows="3" placeholder="e.g. Includes 9 booster packs, a promo card, and 65 card sleeves..." style={{ padding: '12px 14px', border: '1px solid var(--border-color)', borderRadius: '6px', fontSize: '0.95rem', fontFamily: 'inherit', resize: 'vertical' }} />
            </div>
            <div className="form-group">
              <label>Stock Quantity</label>
              <input type="number" min="0" value={form.stock} onChange={e => setForm({...form, stock: parseInt(e.target.value) || 0})} required />
            </div>
            <div className="admin-form-actions">
              <button type="submit" className="admin-save-btn">Save</button>
              <button type="button" className="admin-cancel-btn" onClick={cancelEdit}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Product Table */}
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Set</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(product => (
              <tr key={product.id}>
                <td>
                  <div className="admin-img-thumb">
                    {product.imgUrl ? <img src={product.imgUrl} alt="" /> : <span>📦</span>}
                  </div>
                </td>
                <td className="admin-td-title">{product.title}</td>
                <td><span className="admin-set-badge">{sets.find(s => s.id === product.setId)?.name || product.setId}</span></td>
                <td>{product.price}</td>
                <td>
                  <button className={`stock-toggle ${product.stock === 0 || product.soldOut ? 'out' : 'in'}`} onClick={() => toggleStock(product.id, product.stock !== undefined ? product.stock : (product.soldOut ? 0 : 50))}>
                    {product.stock === 0 || product.soldOut ? '❌ Stock: 0' : `✅ Stock: ${product.stock !== undefined ? product.stock : 50}`}
                  </button>
                </td>
                <td>
                  <div className="admin-row-actions">
                    <button className="admin-edit-btn" onClick={() => startEdit(product)}>Edit</button>
                    <button className="admin-delete-btn" onClick={() => deleteProduct(product.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </>
      )}
      
      {activeTab === 'orders' && (
        <div className="admin-table-wrap" style={{ marginTop: '2rem' }}>
          <h3>Pending Shipments</h3>
          <p style={{color: 'var(--text-color)', opacity: 0.8, fontSize: '0.9rem', marginBottom: '1rem'}}>
            Select an order below to generate a USPS shipping label using your saved Box Presets.
          </p>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Order ID</th>
                <th>Customer Name</th>
                <th>Item Summary</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td>{new Date(order.date).toLocaleDateString()}</td>
                  <td style={{fontSize: '0.85rem', color: '#888'}}>{order.id}</td>
                  <td className="admin-td-title">{order.shippingAddress?.name || 'Unknown'}</td>
                  <td>{order.items.length} items</td>
                  <td>${order.totalAmount.toFixed(2)}</td>
                  <td>
                    {order.status === 'unfulfilled' 
                      ? <span style={{color: 'var(--accent-color)', fontWeight: 600}}>Needs Label</span>
                      : <span style={{color: '#4ade80'}}>Fulfilled</span>
                    }
                  </td>
                  <td>
                    {order.status === 'unfulfilled' && (
                       <button className="admin-edit-btn" style={{backgroundColor: 'var(--accent-color)'}} onClick={() => openShippingModal(order)}>
                         Generate Label
                       </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Preset Manager UI */}
      {activeTab === 'orders' && (
        <div className="admin-table-wrap" style={{ marginTop: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3>Box Dimensions Manager</h3>
            <button className="admin-add-btn" onClick={() => setAddingPreset(!addingPreset)}>
              {addingPreset ? 'Cancel' : '+ New Preset'}
            </button>
          </div>

          {addingPreset && (
            <div className="admin-form-card" style={{ marginBottom: '2rem' }}>
              <form onSubmit={savePreset}>
                 <div className="form-group full-width">
                   <label>Preset Name (e.g. Graded Slab Box)</label>
                   <input type="text" value={presetForm.name} onChange={e => setPresetForm({...presetForm, name: e.target.value})} required />
                 </div>
                 <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
                   <div className="form-group"><label>L (in)</label><input type="number" step="0.1" value={presetForm.length} onChange={e => setPresetForm({...presetForm, length: e.target.value})} required /></div>
                   <div className="form-group"><label>W (in)</label><input type="number" step="0.1" value={presetForm.width} onChange={e => setPresetForm({...presetForm, width: e.target.value})} required /></div>
                   <div className="form-group"><label>H (in)</label><input type="number" step="0.1" value={presetForm.height} onChange={e => setPresetForm({...presetForm, height: e.target.value})} required /></div>
                   <div className="form-group"><label>Weight (oz)</label><input type="number" step="0.1" value={presetForm.weight} onChange={e => setPresetForm({...presetForm, weight: e.target.value})} required /></div>
                 </div>
                 <button type="submit" className="admin-save-btn">Save Box Preset</button>
              </form>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
             {shippingPresets.map(preset => (
                <div key={preset.id} style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', padding: '1rem', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1rem' }}>{preset.name}</h4>
                    <span style={{ fontSize: '0.85rem', color: '#888' }}>{preset.length} × {preset.width} × {preset.height} in, {preset.weight} oz</span>
                  </div>
                  <button className="admin-delete-btn" style={{ padding: '0.4rem 0.8rem' }} onClick={() => deletePreset(preset.id)}>Delete</button>
                </div>
             ))}
             {shippingPresets.length === 0 && <p style={{ color: '#888' }}>No presets saved yet.</p>}
          </div>
        </div>
      )}

      {/* Shipping Modal */}
      {shippingModal.open && (
        <div className="admin-modal-overlay">
          <div className="admin-modal" style={{ maxWidth: '500px', width: '100%' }}>
            <h3 style={{ marginBottom: '0.5rem' }}>USPS Label Generation</h3>
            <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Order {shippingModal.order.id} — Shipping to {shippingModal.order.shippingAddress.name}
            </p>

            {!shippingQuote ? (
              <div className="shipping-config-stage">
                 <div className="shipping-mode-toggles" style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                   <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                     <input type="radio" checked={shippingForm.mode === 'preset'} onChange={() => setShippingForm({ ...shippingForm, mode: 'preset' })} />
                     Use Saved Preset
                   </label>
                   <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                     <input type="radio" checked={shippingForm.mode === 'custom'} onChange={() => setShippingForm({ ...shippingForm, mode: 'custom' })} />
                     Custom Dimensions
                   </label>
                 </div>

                 {shippingForm.mode === 'preset' ? (
                   <div className="form-group full-width">
                     <label>Select Box Configuration</label>
                     <select value={shippingForm.presetId} onChange={e => setShippingForm({ ...shippingForm, presetId: e.target.value })}>
                        {shippingPresets.map(p => (
                          <option key={p.id} value={p.id}>{p.name} ({p.weight}oz, {p.length}x{p.width}x{p.height})</option>
                        ))}
                     </select>
                   </div>
                 ) : (
                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                     <div className="form-group"><label>Length (in)</label><input type="number" value={shippingForm.length} onChange={e => setShippingForm({...shippingForm, length: e.target.value})} /></div>
                     <div className="form-group"><label>Width (in)</label><input type="number" value={shippingForm.width} onChange={e => setShippingForm({...shippingForm, width: e.target.value})} /></div>
                     <div className="form-group"><label>Height (in)</label><input type="number" value={shippingForm.height} onChange={e => setShippingForm({...shippingForm, height: e.target.value})} /></div>
                     <div className="form-group"><label>Weight (oz)</label><input type="number" value={shippingForm.weight} onChange={e => setShippingForm({...shippingForm, weight: e.target.value})} /></div>
                   </div>
                 )}

                 <div className="admin-modal-actions" style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                   <button className="admin-cancel-btn" onClick={cancelShipping}>Cancel</button>
                   <button className="admin-save-btn" style={{ backgroundColor: 'var(--accent-color)' }} onClick={getShippingQuote} disabled={gettingQuote}>
                     {gettingQuote ? 'Calculating...' : 'Get Live Quote'}
                   </button>
                 </div>
              </div>
            ) : (
              <div className="shipping-review-stage">
                 <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem' }}>
                   <h4 style={{ marginBottom: '0.5rem', fontSize: '1rem' }}>Box Finalization</h4>
                   <p style={{fontSize: '0.9rem', color: '#888'}}>Weight: {shippingQuote.parcel.weight}oz | Dims: {shippingQuote.parcel.length}x{shippingQuote.parcel.width}x{shippingQuote.parcel.height}</p>
                 </div>
                 
                 <h4 style={{ marginBottom: '0.5rem', fontSize: '1rem' }}>Available USPS Rates</h4>
                 <div style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
                    {shippingQuote.rates && shippingQuote.rates.length > 0 ? shippingQuote.rates.map(rate => (
                       <div key={rate.objectId} style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                         <div>
                            <span style={{ fontWeight: 600 }}>{rate.provider} {rate.servicelevel.name}</span>
                            <div style={{ fontSize: '0.8rem', color: '#888', marginTop: '4px' }}>Est. Delivery: {rate.estimated_days} Days</div>
                         </div>
                         <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span style={{ fontWeight: 'bold', color: '#4ade80' }}>${rate.amount}</span>
                            <button 
                               onClick={() => purchaseLabel(rate.objectId)} 
                               disabled={purchasingRate === rate.objectId || purchasedLabel}
                               className="admin-save-btn" 
                               style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                            >
                               {purchasingRate === rate.objectId ? 'Buying...' : 'Buy'}
                            </button>
                         </div>
                       </div>
                    )) : (
                       <div style={{ padding: '1rem', textAlign: 'center', color: '#888' }}>No rates found for these dimensions.</div>
                    )}
                 </div>

                 {purchasedLabel ? (
                    <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(74, 222, 128, 0.1)', border: '1px solid #4ade80', borderRadius: '8px' }}>
                       <h4 style={{ color: '#4ade80', marginBottom: '0.5rem' }}>✅ tracking #{purchasedLabel.trackingNumber}</h4>
                       <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                         <a href={purchasedLabel.labelUrl} target="_blank" rel="noreferrer" className="admin-add-btn" style={{ textDecoration: 'none', textAlign: 'center', flex: 1 }}>Print PDF Label</a>
                         <button className="admin-cancel-btn" style={{ flex: 1 }} onClick={cancelShipping}>Close</button>
                       </div>
                    </div>
                 ) : (
                    <div className="admin-modal-actions" style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                      <button className="admin-cancel-btn" onClick={() => setShippingQuote(null)}>Back to Edit Dims</button>
                    </div>
                 )}
              </div>
            )}
          </div>
        </div>
      )}

    </section>
  );
};

export default AdminDashboard;
