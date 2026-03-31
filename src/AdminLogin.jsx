import React, { useState } from 'react';

const AdminLogin = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:3001/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.token) {
        onLogin(data.token, data.username);
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch {
      setError('Server not reachable. Is the backend running?');
    }
    setLoading(false);
  };

  return (
    <section className="admin-login-section">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <span className="admin-lock-icon">🔐</span>
          <h2>Admin Login</h2>
          <p>S&G Trading Card Management</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} required placeholder="Enter username" autoComplete="username" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Enter password" autoComplete="current-password" />
          </div>
          {error && <p className="checkout-error">{error}</p>}
          <button type="submit" className="pay-now-btn" disabled={loading} style={{ marginTop: '1rem' }}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AdminLogin;
