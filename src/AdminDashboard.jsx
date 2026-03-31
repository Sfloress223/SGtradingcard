import React, { useState, useEffect } from 'react';

const API = 'https://sgtradingcard.onrender.com';

const AdminDashboard = ({ token, onLogout }) => {
  const [products, setProducts] = useState([]);
  const [sets, setSets] = useState([]);
  const [filterSet, setFilterSet] = useState('all');
  const [editing, setEditing] = useState(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ title: '', price: '', setId: '', imgUrl: '', description: '', soldOut: false });
  const [toast, setToast] = useState(null);

  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2000); };

  useEffect(() => {
    fetch(`${API}/api/products`).then(r => r.json()).then(setProducts);
    fetch(`${API}/api/sets`).then(r => r.json()).then(setSets);
  }, []);

  const toggleStock = async (id) => {
    const res = await fetch(`${API}/api/admin/products/${id}/toggle-stock`, { method: 'PATCH', headers });
    const updated = await res.json();
    setProducts(prev => prev.map(p => p.id === id ? updated : p));
    showToast(`Stock status updated`);
  };

  const deleteProduct = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    await fetch(`${API}/api/admin/products/${id}`, { method: 'DELETE', headers });
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast('Product deleted');
  };

  const startEdit = (product) => {
    setEditing(product.id);
    setForm({ title: product.title, price: product.price, setId: product.setId, imgUrl: product.imgUrl || '', description: product.description || '', soldOut: product.soldOut });
    setAdding(false);
  };

  const startAdd = () => {
    setAdding(true);
    setEditing(null);
    setForm({ title: '', price: '', setId: sets[0]?.id || '', imgUrl: '', description: '', soldOut: false });
  };

  const cancelEdit = () => { setEditing(null); setAdding(false); };

  const saveProduct = async (e) => {
    e.preventDefault();
    if (editing) {
      const res = await fetch(`${API}/api/admin/products/${editing}`, {
        method: 'PUT', headers, body: JSON.stringify(form)
      });
      const updated = await res.json();
      setProducts(prev => prev.map(p => p.id === editing ? updated : p));
      showToast('Product updated');
    } else {
      const res = await fetch(`${API}/api/admin/products`, {
        method: 'POST', headers, body: JSON.stringify(form)
      });
      const newProduct = await res.json();
      setProducts(prev => [...prev, newProduct]);
      showToast('Product added');
    }
    cancelEdit();
  };

  const filtered = filterSet === 'all' ? products : products.filter(p => p.setId === filterSet);
  const inStock = products.filter(p => !p.soldOut).length;
  const soldOut = products.filter(p => p.soldOut).length;

  return (
    <section className="admin-section">
      {toast && <div className="toast-notification">{toast}</div>}
      
      <div className="admin-header">
        <div>
          <h2>📦 Product Dashboard</h2>
          <p className="admin-stats">{products.length} products · {inStock} in stock · {soldOut} sold out</p>
        </div>
        <div className="admin-actions">
          <button className="admin-add-btn" onClick={startAdd}>+ Add Product</button>
          <button className="admin-logout-btn" onClick={onLogout}>Logout</button>
        </div>
      </div>

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
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input type="checkbox" checked={form.soldOut} onChange={e => setForm({...form, soldOut: e.target.checked})} />
                Sold Out
              </label>
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
                  <button className={`stock-toggle ${product.soldOut ? 'out' : 'in'}`} onClick={() => toggleStock(product.id)}>
                    {product.soldOut ? '❌ Sold Out' : '✅ In Stock'}
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
    </section>
  );
};

export default AdminDashboard;
