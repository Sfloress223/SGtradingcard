import React, { Component, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("App Render Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', color: '#fff', backgroundColor: '#0f172a', textAlign: 'center', minHeight: '100vh', fontFamily: 'sans-serif' }}>
          <h2>⚡ S&G Trading Store Updating...</h2>
          <p style={{ margin: '20px 0', opacity: 0.8 }}>Loading latest store resources...</p>
          <button 
            onClick={() => window.location.reload(true)} 
            style={{ padding: '12px 24px', background: '#FFCB05', color: '#000', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}
          >
            Reload Store Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
