import React, { useState, useCallback, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import ProductCard from './ProductCard';
import ShopDirectory from './ShopDirectory';
import CartPage from './CartPage';
import ProductPage from './ProductPage';
import CheckoutPage from './CheckoutPage';
import OrderConfirmation from './OrderConfirmation';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import Auth from './Auth';
import SellerDashboard from './SellerDashboard';
import { PRODUCTS as FALLBACK_PRODUCTS, SETS as FALLBACK_SETS } from './data';

const API = 'http://localhost:3001';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
const stripeOptions = { disableLink: true };

function App() {
  const [currentPage, setCurrentPage] = useState(() => 
    window.location.hash === '#admin' ? 'admin' : 'home'
  );
  const [cartItems, setCartItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [toast, setToast] = useState(null);
  const [completedOrder, setCompletedOrder] = useState(null);
  const [adminToken, setAdminToken] = useState(localStorage.getItem('sg_admin_token'));
  const [userToken, setUserToken] = useState(localStorage.getItem('sg_user_token'));
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('sg_user_data') || 'null'));
  const [products, setProducts] = useState(FALLBACK_PRODUCTS);
  const [sets, setSets] = useState(FALLBACK_SETS);

  // Fetch live data from API (falls back to data.js if server is down)
  useEffect(() => {
    fetch(`${API}/api/products`).then(r => r.json()).then(setProducts).catch(() => {});
    fetch(`${API}/api/sets`).then(r => r.json()).then(setSets).catch(() => {});
  }, []);

  const showToast = useCallback((message) => {
    setToast(message);
    setTimeout(() => setToast(null), 2000);
  }, []);

  const addToCart = (product) => {
    setCartItems(prev => {
      // Enforce single-vendor carts to comply with Stripe Destination Split Rules
      if (prev.length > 0) {
        const hasSeller = !!prev[0].sellerId;
        const isNewItemSeller = !!product.sellerId;
        
        if (hasSeller !== isNewItemSeller) {
          alert("Hold up! You cannot mix S&G Retail items with Grand Exchange items in the same cart. Please checkout first!");
          return prev;
        }
        if (hasSeller && isNewItemSeller && prev[0].sellerId !== product.sellerId) {
          alert("Hold up! You cannot buy from different sellers at the same time. Please checkout first!");
          return prev;
        }
      }

      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    showToast(`✓ ${product.title.substring(0, 40)}... added to cart`);
  };

  const updateCartQty = (productId, newQty) => {
    if (newQty <= 0) {
      setCartItems(prev => prev.filter(item => item.id !== productId));
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.id === productId ? { ...item, qty: newQty } : item
        )
      );
    }
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const viewProduct = (product) => {
    setSelectedProduct(product);
    setCurrentPage('product');
    window.scrollTo(0, 0);
  };

  const handleOrderComplete = (order) => {
    setCompletedOrder(order);
    setCartItems([]);
    setCurrentPage('confirmation');
    window.scrollTo(0, 0);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  const handleAdminLogin = (token, username) => {
    setAdminToken(token);
    localStorage.setItem('sg_admin_token', token);
    showToast(`Welcome, ${username}!`);
  };

  const handleAdminLogout = () => {
    setAdminToken(null);
    localStorage.removeItem('sg_admin_token');
    setCurrentPage('home');
  };

  const handleUserLogin = (token, user) => {
    setUserToken(token);
    setCurrentUser(user);
    localStorage.setItem('sg_user_token', token);
    localStorage.setItem('sg_user_data', JSON.stringify(user));
    showToast(`Welcome back, ${user.username}!`);
    setCurrentPage('dashboard');
  };

  const handleUserLogout = () => {
    setUserToken(null);
    setCurrentUser(null);
    localStorage.removeItem('sg_user_token');
    localStorage.removeItem('sg_user_data');
    showToast('Logged out successfully');
    setCurrentPage('home');
  };

  const renderPage = () => {
    if (currentPage === 'admin') {
      if (!adminToken) {
        return (
          <main style={{ minHeight: '70vh', padding: '2rem 0' }}>
            <AdminLogin onLogin={handleAdminLogin} />
          </main>
        );
      }
      return (
        <main style={{ minHeight: '70vh', padding: '2rem 0' }}>
          <AdminDashboard token={adminToken} onLogout={handleAdminLogout} />
        </main>
      );
    }

    if (currentPage === 'confirmation' && completedOrder) {
      return (
        <main style={{ minHeight: '70vh', padding: '2rem 0' }}>
          <OrderConfirmation 
            order={completedOrder}
            onBackToHome={() => { setCompletedOrder(null); setCurrentPage('home'); }}
          />
        </main>
      );
    }

    if (currentPage === 'checkout') {
      return (
        <main style={{ minHeight: '70vh', padding: '2rem 0' }}>
          <CheckoutPage 
            cartItems={cartItems}
            onBack={() => setCurrentPage('cart')}
            onOrderComplete={handleOrderComplete}
          />
        </main>
      );
    }

    if (currentPage === 'product' && selectedProduct) {
      return (
        <main style={{ minHeight: '70vh', padding: '2rem 0' }}>
          <ProductPage 
            product={selectedProduct}
            onAddToCart={addToCart}
            onBack={() => setCurrentPage('shop')}
          />
        </main>
      );
    }

    if (currentPage === 'shop') {
      return (
        <main style={{ minHeight: '70vh', padding: '2rem 0' }}>
          <ShopDirectory products={products} sets={sets} onAddToCart={addToCart} onViewProduct={viewProduct} />
        </main>
      );
    }
    
    if (currentPage === 'auth') {
      return (
        <main style={{ minHeight: '70vh', padding: '2rem 0' }}>
          <Auth onLoginSuccess={handleUserLogin} />
        </main>
      );
    }

    if (currentPage === 'dashboard') {
      if (!userToken || !currentUser) return setCurrentPage('auth');
      return (
        <main style={{ minHeight: '70vh', padding: '2rem 0' }}>
          <SellerDashboard user={currentUser} token={userToken} onLogout={handleUserLogout} />
        </main>
      );
    }

    if (currentPage === 'cart') {
      return (
        <main style={{ minHeight: '70vh', padding: '2rem 0' }}>
          <CartPage 
            cartItems={cartItems}
            onUpdateQty={updateCartQty}
            onRemove={removeFromCart}
            onContinueShopping={() => setCurrentPage('shop')}
            onCheckout={() => setCurrentPage('checkout')}
          />
        </main>
      );
    }

    // Default: Home Page
    return (
      <main>
        {/* Featured Products Section */}
        <section className="featured-section">
          <h2 className="section-title">Featured Products</h2>
          
          <div className="product-grid">
            {products.filter(p => !p.soldOut).sort((a,b) => b.id - a.id).slice(0, 8).map(product => (
              <ProductCard 
                key={product.id}
                product={product}
                title={product.title}
                price={product.price}
                soldOut={product.soldOut}
                imgUrl={product.imgUrl}
                onAddToCart={addToCart}
                onViewProduct={viewProduct}
              />
            ))}
          </div>
          
          <div className="view-all-container">
            <button className="view-all-btn" onClick={() => setCurrentPage('shop')}>Shop all</button>
          </div>
        </section>

        {/* Story Section */}
        <section className="story-section">
          <h2>Uncover our story</h2>
          <p>
            We started this shop with one simple goal: to give collectors and fans a place where Pokémon cards feel exciting and trustworthy again. Every pack, box, and tin on our shelves is 100% authentic! The same way we'd want to buy it ourselves. No gimmicks, no reseals, just real cards and real passion from fellow collectors who care about the hobby as much as you do.
          </p>
        </section>
      </main>
    );
  };

  return (
    <Elements stripe={stripePromise} options={stripeOptions}>
      <div className="app-container">
        {/* Toast Notification */}
        {toast && (
          <div className="toast-notification">
            {toast}
          </div>
        )}

        {/* Promotional Banner */}
        <div className="promo-banner">
          <span>Free shipping on all orders over $150!</span>
        </div>

        {/* Navigation */}
        <header className="site-header">
          <div className="header-inner">
            <div className="logo" onClick={() => setCurrentPage('home')} style={{ cursor: 'pointer' }}>
              <img 
                src="https://images.squarespace-cdn.com/content/v1/68e06d2a2c7b551478df5338/e0ce8a5e-488b-4350-ac61-8663899b9bc5/SuzieQ+LOGO+%282%29.png?format=500w" 
                alt="S&G Trading Co." 
                style={{ height: '50px', objectFit: 'contain' }}
              />
            </div>
            <nav className="main-nav">
              <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); }} style={{ color: currentPage === 'home' ? '#000' : '' }}>Home</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('shop'); }} style={{ color: currentPage === 'shop' ? '#000' : '' }}>Shop</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(currentUser ? 'dashboard' : 'auth'); }} style={{ color: (currentPage === 'auth' || currentPage === 'dashboard') ? '#000' : '' }}>The Grand Exchange</a>
            </nav>
            <div className="cart-icon" onClick={() => setCurrentPage('cart')} style={{ cursor: 'pointer' }}>
              <span style={{ color: currentPage === 'cart' ? '#000' : '' }}>Cart ({cartCount})</span>
            </div>
          </div>
        </header>

        {renderPage()}

        {/* Footer */}
        <footer className="site-footer">
          <div className="footer-content">
            <div className="footer-brand">
              <h3 style={{ marginBottom: '1rem', fontWeight: 'bold' }}>S&G Trading Card</h3>
              <p>Your trusted source for authentic Pokémon TCG products.</p>
            </div>
            <div className="footer-links">
              <a href="#faq">FAQ</a>
              <a href="#policies">Policies, Terms, & Conditions</a>
              <a href="#contact">Contact Us</a>
            </div>
          </div>
          
          <div className="legal-disclaimer">
            <p>
              <strong>Disclaimer:</strong> S&G Trading Card is an independent retailer of trading card products. We are not affiliated with, authorized, maintained, sponsored, or endorsed by Nintendo, Creatures Inc., GAME FREAK inc., or The Pokémon Company. "Pokémon" and all related character names, set names, and artwork are trademarks and copyrights of Nintendo, Creatures Inc., GAME FREAK inc., and The Pokémon Company. All other trademarks are the property of their respective owners.
            </p>
          </div>
        </footer>
      </div>
    </Elements>
  );
}

export default App;
