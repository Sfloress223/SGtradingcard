import React, { useState } from 'react';

const API = import.meta.env.PROD ? 'https://sgtradingcard.onrender.com' : 'http://localhost:3001';

const Auth = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Forgot Password States
  const [showForgot, setShowForgot] = useState(false);
  const [forgotStep, setForgotStep] = useState(1); // 1: Email, 2: PIN, 3: New Pass
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotPin, setForgotPin] = useState('');
  const [forgotNewPass, setForgotNewPass] = useState('');
  const [forgotConfirmPass, setForgotConfirmPass] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const endpoint = isLogin ? '/api/login' : '/api/register';
    const payload = isLogin ? { username, password } : { username, email, password };

    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      onLoginSuccess(data.token, data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (forgotStep === 1) {
        const res = await fetch(`${API}/api/auth/forgot-password`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: forgotEmail })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        setForgotStep(2);
      } else if (forgotStep === 2) {
        // Technically wait for step 3 to submit to server, but just advance UI
        if (forgotPin.length !== 6) throw new Error("PIN must be 6 digits");
        setForgotStep(3);
      } else if (forgotStep === 3) {
        if (forgotNewPass !== forgotConfirmPass) throw new Error("Passwords do not match");
        const res = await fetch(`${API}/api/auth/reset-password`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: forgotEmail, pin: forgotPin, newPassword: forgotNewPass })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        
        alert("Password successfully reset! Please log in.");
        setShowForgot(false);
        setForgotStep(1);
        setIsLogin(true);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '4rem auto', padding: '2rem', background: '#fff', borderRadius: '8px', border: '1px solid var(--border-color)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', position: 'relative' }}>
      {showForgot ? (
        <>
          <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: 'bold' }}>
            Reset Password
          </h2>
          
          {error && <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>{error}</div>}

          <form onSubmit={handleForgotSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {forgotStep === 1 && (
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-light)' }}>Enter your Email</label>
                <input type="email" value={forgotEmail} onChange={e => setForgotEmail(e.target.value)} required style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', fontSize: '1rem' }} />
              </div>
            )}
            
            {forgotStep === 2 && (
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-light)' }}>Enter 6-Digit PIN sent to {forgotEmail}</label>
                <input type="text" value={forgotPin} onChange={e => setForgotPin(e.target.value)} required maxLength="6" placeholder="000000" style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', fontSize: '1rem', textAlign: 'center', letterSpacing: '4px' }} />
              </div>
            )}

            {forgotStep === 3 && (
              <>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-light)' }}>Enter New Password</label>
                  <input type="password" value={forgotNewPass} onChange={e => setForgotNewPass(e.target.value)} required minLength="6" style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', fontSize: '1rem' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-light)' }}>Confirm New Password</label>
                  <input type="password" value={forgotConfirmPass} onChange={e => setForgotConfirmPass(e.target.value)} required minLength="6" style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', fontSize: '1rem' }} />
                </div>
              </>
            )}

            <button type="submit" disabled={isLoading} style={{ width: '100%', padding: '1rem', background: '#000', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '1rem', fontWeight: 'bold', cursor: isLoading ? 'not-allowed' : 'pointer', marginTop: '1rem' }}>
              {isLoading ? 'Processing...' : (forgotStep === 1 ? 'Send PIN' : forgotStep === 2 ? 'Verify PIN' : 'Reset Password')}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem' }}>
            <a href="#" onClick={(e) => { e.preventDefault(); setShowForgot(false); setError(null); }} style={{ color: '#666', textDecoration: 'underline' }}>Back to Login</a>
          </div>
        </>
      ) : (
        <>
          <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: 'bold' }}>
            {isLogin ? 'Welcome Back' : 'Create an Account'}
          </h2>
      
      {error && <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>{error}</div>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-light)' }}>Username</label>
          <input 
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', fontSize: '1rem' }}
          />
        </div>

        {!isLogin && (
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-light)' }}>Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', fontSize: '1rem' }}
            />
          </div>
        )}

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-light)' }}>Password</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', fontSize: '1rem' }}
          />
        </div>

        {!isLogin && (
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-light)' }}>Confirm Password</label>
            <input 
              type="password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', fontSize: '1rem' }}
            />
          </div>
        )}

        <button 
          type="submit" 
          disabled={isLoading}
          style={{ width: '100%', padding: '1rem', background: '#000', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '1rem', fontWeight: 'bold', cursor: isLoading ? 'not-allowed' : 'pointer', marginTop: '1rem' }}
        >
          {isLoading ? 'Processing...' : (isLogin ? 'Sign In' : 'Register Account')}
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--text-light)', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
        <div>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); setIsLogin(!isLogin); setError(null); }}
            style={{ color: '#000', fontWeight: 'bold', textDecoration: 'underline' }}
          >
            {isLogin ? 'Sign up here' : 'Log in here'}
          </a>
        </div>
        
        {isLogin && (
          <div>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); setShowForgot(true); setError(null); }}
              style={{ color: '#666', fontSize: '0.85rem', textDecoration: 'underline' }}
            >
              Forgot your password?
            </a>
          </div>
        )}
      </div>
        </>
      )}
    </div>
  );
};

export default Auth;
