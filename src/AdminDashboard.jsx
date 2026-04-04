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
  const [addingSet, setAddingSet] = useState(false);
  const [setFormState, setSetFormState] = useState({ name: '', color: '#1E90FF', imgUrl: '' });
  const [setImgPreview, setSetImgPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [form, setForm] = useState({ title: '', price: '', setId: '', imgUrl: '', description: '', stock: 0 });
  const [toast, setToast] = useState(null);
  const [inlineEdit, setInlineEdit] = useState(null); // { id, field, value }

  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };

  const showToast = (msg, duration = 4000) => { setToast(msg); setTimeout(() => setToast(null), duration); };

  useEffect(() => {
    const fetchHeaders = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };
    
    fetch(`${API}/api/products`).then(r => r.json()).then(data => setProducts(Array.isArray(data) ? data : []));
    fetch(`${API}/api/sets`).then(r => r.json()).then(data => setSets(Array.isArray(data) ? data : []));
    
    fetch(`${API}/api/admin/orders`, { headers: fetchHeaders }).then(r => {
      if (r.status === 401) onLogout(); // Automatically log out if token is expired
      return r.json();
    }).then(data => setOrders(Array.isArray(data) ? data : []));
    
    fetch(`${API}/api/admin/shipping-presets`, { headers: fetchHeaders }).then(r => r.json()).then(data => setShippingPresets(Array.isArray(data) ? data : []));
  }, [token, onLogout]);


  const saveInlineEdit = async () => {
    if (!inlineEdit) return;
    const { id, field, value } = inlineEdit;
    const patch = { [field]: field === 'stock' ? parseInt(value) || 0 : value };
    if (field === 'stock') patch.soldOut = (parseInt(value) || 0) === 0;
    const res = await fetch(`${API}/api/admin/products/${id}`, { method: 'PUT', headers, body: JSON.stringify(patch) });
    const updated = await res.json();
    setProducts(prev => prev.map(p => p.id === id ? updated : p));
    showToast('Saved!');
    setInlineEdit(null);
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
    reader.onload = (e) => setSetImgPreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const saveSet = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    try {
      let finalImgUrl = setFormState.imgUrl;
      
      if (setImgPreview && setImgPreview.startsWith('data:image')) {
        const uploadRes = await fetch(`${API}/api/admin/upload-image`, {
          method: 'POST',
          headers,
          body: JSON.stringify({ image: setImgPreview })
        });
        const uploadData = await uploadRes.json();
        if (uploadRes.ok) finalImgUrl = uploadData.url;
      }
      
      const payload = { ...setFormState, imgUrl: finalImgUrl };
      const res = await fetch(`${API}/api/admin/sets`, {
        method: 'POST', headers, body: JSON.stringify(payload)
      });
      const newSet = await res.json();
      if (res.ok) {
        setSets(prev => [...prev, newSet]);
        showToast('Category added!');
        setAddingSet(false);
        setSetFormState({ name: '', color: '#1E90FF', imgUrl: '' });
        setSetImgPreview(null);
      } else {
        showToast(newSet.error || 'Failed to add category');
      }
    } catch (err) {
      console.error(err);
      showToast('Network error while saving category');
    }
    setIsUploading(false);
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
      
      const responseText = await res.text();
      console.log('Label purchase response:', res.status, responseText);
      
      let data;
      try {
        data = JSON.parse(responseText);
      } catch {
        showToast(`Server returned invalid response (${res.status}): ${responseText.substring(0, 200)}`, 8000);
        setPurchasingRate(null);
        return;
      }
      
      if (res.ok) {
        setPurchasedLabel(data);
        showToast('Label successfully generated!');
        setOrders(prev => prev.map(o => o.id === shippingModal.order.id ? { ...o, status: 'fulfilled', trackingNumber: data.trackingNumber, trackingUrl: data.trackingUrl } : o));
      } else {
        showToast(data.error || `Label purchase failed (${res.status})`, 8000);
      }
    } catch (err) {
      console.error('Label purchase network error:', err);
      showToast(`Network error: ${err.message}`, 8000);
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
          {activeTab === 'products' && (
            <>
              <button className="admin-add-btn" onClick={() => { setAddingSet(!addingSet); cancelEdit(); }}>{addingSet ? 'Cancel Category' : '+ New Category'}</button>
              <button className="admin-add-btn" onClick={() => { startAdd(); setAddingSet(false); }}>+ Add Product</button>
            </>
          )}
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
              if (count === 0 && s.id !== filterSet) return null;
              return <button key={s.id} className={filterSet === s.id ? 'active' : ''} onClick={() => setFilterSet(s.id)}>{s.name} ({count})</button>;
            })}
          </div>

          {/* Add Category Form */}
          {addingSet && (
            <div className="admin-form-card" style={{ marginBottom: '1.5rem', background: '#f5fbff', border: '1px solid #bce0ff', color: 'var(--text-color)' }}>
              <h3 style={{ marginTop: 0 }}>Create New Category</h3>
              <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '1rem' }}>
                 Tip: You can press <strong>Ctrl+V</strong> anywhere in this form to paste an image instantly!
              </p>
              <form onSubmit={saveSet} className="admin-form" onPaste={handlePasteImage}>
                <div className="form-group full-width">
                  <label>Category Name (e.g. Perfect Order)</label>
                  <input type="text" value={setFormState.name} onChange={e => setSetFormState({...setFormState, name: e.target.value})} required autoFocus style={{ border: '1px solid var(--border-color)', borderRadius: '6px' }} />
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', width: '100%', marginBottom: '1rem' }}>
                  <div className="form-group" style={{ flex: 1 }}>
                    <label>Image (Upload, Paste or URL)</label>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                      <input type="file" accept="image/*" onChange={(e) => handleImageFile(e.target.files[0])} style={{ flex: 1, minWidth: '200px' }} />
                      <span style={{ margin: 'auto 0' }}>or URL:</span>
                      <input type="text" value={setFormState.imgUrl} onChange={e => setSetFormState({...setFormState, imgUrl: e.target.value})} placeholder="https://..." style={{ flex: 1, minWidth: '200px' }} />
                    </div>
                  </div>
                  <div className="form-group" style={{ maxWidth: '200px' }}>
                    <label>Badge Color</label>
                    <input type="color" value={setFormState.color} onChange={e => setSetFormState({...setFormState, color: e.target.value})} style={{ width: '100%', height: '40px', padding: '0', cursor: 'pointer', border: 'none', borderRadius: '4px' }} />
                  </div>
                </div>

                {/* Preview Area */}
                {setImgPreview && (
                  <div style={{ margin: '1rem 0', padding: '1rem', background: '#fff', border: '1px dashed #ccc', borderRadius: '8px', textAlign: 'center' }}>
                    <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.85rem', color: '#666' }}>Image Preview</p>
                    <img src={setImgPreview} alt="Preview" style={{ maxHeight: '150px', maxWidth: '100%', objectFit: 'contain' }} />
                  </div>
                )}
                {!setImgPreview && setFormState.imgUrl && (
                  <div style={{ margin: '1rem 0', padding: '1rem', background: '#fff', border: '1px dashed #ccc', borderRadius: '8px', textAlign: 'center' }}>
                    <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.85rem', color: '#666' }}>Image URL Preview</p>
                    <img src={setFormState.imgUrl} alt="Preview" style={{ maxHeight: '150px', maxWidth: '100%', objectFit: 'contain' }} onError={(e) => e.target.style.display='none'} />
                  </div>
                )}

                <div className="admin-form-actions" style={{ marginTop: '1.5rem' }}>
                  <button type="submit" className="admin-save-btn" disabled={isUploading}>{isUploading ? 'Saving...' : 'Save Category'}</button>
                  <button type="button" className="admin-cancel-btn" onClick={() => setAddingSet(false)}>Cancel</button>
                </div>
              </form>
            </div>
          )}

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
                <td style={{ cursor: 'pointer' }} onClick={() => !inlineEdit && setInlineEdit({ id: product.id, field: 'price', value: product.price })}>
                  {inlineEdit?.id === product.id && inlineEdit.field === 'price' ? (
                    <input
                      autoFocus
                      type="text"
                      value={inlineEdit.value}
                      onChange={e => setInlineEdit({ ...inlineEdit, value: e.target.value })}
                      onBlur={saveInlineEdit}
                      onKeyDown={e => { if (e.key === 'Enter') saveInlineEdit(); if (e.key === 'Escape') setInlineEdit(null); }}
                      style={{ width: '80px', padding: '4px 6px', border: '2px solid var(--accent-color)', borderRadius: '4px', fontSize: '0.9rem', fontWeight: 600 }}
                    />
                  ) : (
                    <span title="Click to edit" style={{ borderBottom: '1px dashed #aaa', cursor: 'pointer' }}>{product.price}</span>
                  )}
                </td>
                <td>
                  {inlineEdit?.id === product.id && inlineEdit.field === 'stock' ? (
                    <input
                      autoFocus
                      type="number"
                      min="0"
                      value={inlineEdit.value}
                      onChange={e => setInlineEdit({ ...inlineEdit, value: e.target.value })}
                      onBlur={saveInlineEdit}
                      onKeyDown={e => { if (e.key === 'Enter') saveInlineEdit(); if (e.key === 'Escape') setInlineEdit(null); }}
                      style={{ width: '70px', padding: '4px 6px', border: '2px solid var(--accent-color)', borderRadius: '4px', fontSize: '0.9rem', fontWeight: 600 }}
                    />
                  ) : (
                    <button className={`stock-toggle ${product.stock === 0 || product.soldOut ? 'out' : 'in'}`}
                      onClick={() => setInlineEdit({ id: product.id, field: 'stock', value: String(product.stock !== undefined ? product.stock : (product.soldOut ? 0 : 50)) })}>
                      {product.stock === 0 || product.soldOut ? `❌ Stock: 0` : `✅ Stock: ${product.stock !== undefined ? product.stock : 50}`}
                    </button>
                  )}
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
              {orders.filter(o => o.items && o.shippingAddress).map(order => (
                <tr key={order.id}>
                  <td>{new Date(order.date).toLocaleDateString()}</td>
                  <td style={{fontSize: '0.85rem', color: '#888'}}>{order.id}</td>
                  <td className="admin-td-title">{order.shippingAddress?.name || 'Unknown'}</td>
                  <td>{(order.items || []).length} items</td>
                  <td>${(order.totalAmount || 0).toFixed(2)}</td>
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
            <h3 style={{ marginBottom: '0.5rem' }}>USPS Label Generation (v2)</h3>
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
                   <button className="admin-save-btn" onClick={getShippingQuote} disabled={gettingQuote}>
                     {gettingQuote ? 'Calculating...' : 'Get Live Quote'}
                   </button>
                 </div>
              </div>
            ) : purchasedLabel ? (
              <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                <div style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>✅</div>
                <h3 style={{ color: '#4ade80', marginBottom: '0.5rem', fontSize: '1.3rem' }}>Label Purchased Successfully!</h3>
                <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Your USPS shipping label has been generated and is ready to print.</p>
                
                <div style={{ background: 'rgba(74, 222, 128, 0.08)', border: '1px solid #4ade80', borderRadius: '10px', padding: '1.2rem', marginBottom: '1.5rem', textAlign: 'left' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                    <span style={{ color: '#888', fontSize: '0.85rem' }}>Tracking Number</span>
                    <span style={{ fontWeight: 700, color: '#4ade80', fontSize: '0.95rem', letterSpacing: '0.5px' }}>{purchasedLabel.trackingNumber}</span>
                  </div>
                  {purchasedLabel.trackingUrl && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                      <span style={{ color: '#888', fontSize: '0.85rem' }}>Track Package</span>
                      <a href={purchasedLabel.trackingUrl} target="_blank" rel="noreferrer" style={{ color: '#60a5fa', fontSize: '0.85rem' }}>View on USPS →</a>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#888', fontSize: '0.85rem' }}>Order</span>
                    <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{shippingModal.order?.id}</span>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <a href={purchasedLabel.labelUrl} target="_blank" rel="noreferrer" style={{ flex: 1, display: 'inline-block', padding: '12px 20px', background: '#2E8B57', color: 'white', borderRadius: '8px', textDecoration: 'none', textAlign: 'center', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>🖨️ Print PDF Label</a>
                  <button onClick={cancelShipping} style={{ flex: 1, padding: '12px 20px', background: 'none', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-light)', cursor: 'pointer', fontWeight: 600, fontSize: '1rem' }}>Close</button>
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
                    {shippingQuote.rates && shippingQuote.rates.filter(r => r.provider === 'USPS').length > 0 ? shippingQuote.rates.filter(r => r.provider === 'USPS').map(rate => (
                       <div key={rate.object_id} style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                         <div>
                            <span style={{ fontWeight: 600 }}>{rate.provider} {rate.servicelevel.name}</span>
                            <div style={{ fontSize: '0.8rem', color: '#888', marginTop: '4px' }}>Est. Delivery: {rate.estimated_days} Days</div>
                         </div>
                         <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span style={{ fontWeight: 'bold', color: '#4ade80' }}>${rate.amount}</span>
                            <button 
                               onClick={() => purchaseLabel(rate.object_id)} 
                               disabled={purchasingRate || purchasedLabel}
                               className="admin-save-btn" 
                               style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                            >
                               {purchasingRate === rate.object_id ? 'Buying...' : 'Buy'}
                            </button>
                         </div>
                       </div>
                    )) : (
                       <div style={{ padding: '1rem', textAlign: 'center', color: '#888' }}>No rates found for these dimensions.</div>
                    )}
                 </div>

                 <div className="admin-modal-actions" style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                   <button className="admin-cancel-btn" onClick={() => setShippingQuote(null)}>Back to Edit Dims</button>
                 </div>
              </div>
            )}
          </div>
        </div>
      )}

    </section>
  );
};

export default AdminDashboard;
