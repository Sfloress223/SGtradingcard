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
import GrandExchangeMarket from './GrandExchangeMarket';
import SellerProfile from './SellerProfile';
import PoliciesPage from './PoliciesPage';
import ReviewsPage from './ReviewsPage';
import { FaqPage, ContactPage } from './InfoPages';
import { PRODUCTS as FALLBACK_PRODUCTS, SETS as FALLBACK_SETS } from './data';

const API = import.meta.env.PROD ? 'https://sgtradingcard.onrender.com' : 'http://localhost:3001';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
const stripeOptions = { disableLink: true };

function App() {
  const [currentPage, setCurrentPage] = useState(() => 
    window.location.hash === '#admin' ? 'admin' : 'home'
  );
  const [cartItems, setCartItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentSellerId, setCurrentSellerId] = useState(null);
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

  // Dynamic page title for SEO
  useEffect(() => {
    const base = 'S&G Trading';
    const titles = {
      home:         `${base} | Trading Cards, Collectibles & Nerd Culture`,
      shop:         `Shop | Booster Boxes, Graded Cards & Sealed Products — ${base}`,
      cart:         `Your Cart — ${base}`,
      checkout:     `Secure Checkout — ${base}`,
      confirmation: `Order Confirmed — ${base}`,
      admin:        `Admin Dashboard — ${base}`,
      dashboard:    `Seller Dashboard — ${base}`,
      login:        `Login — ${base}`,
      register:     `Create Account — ${base}`,
      product:      selectedProduct
        ? `${selectedProduct.title} | Buy Now — ${base}`
        : `Product — ${base}`,
    };
    document.title = titles[currentPage] || `${base} | Trading Cards & Collectibles`;
  }, [currentPage, selectedProduct]);

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

      const maxStock = product.stock !== undefined ? product.stock : (product.soldOut ? 0 : 50);

      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        if (existing.qty >= maxStock) {
          showToast(`❌ Cannot add more, only ${maxStock} in stock!`);
          return prev;
        }
        return prev.map(item =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      
      if (maxStock <= 0) {
        showToast(`❌ Item is completely sold out!`);
        return prev;
      }
      return [...prev, { ...product, qty: 1 }];
    });
    showToast(`✓ ${product.title.substring(0, 40)}... added to cart`);
  };

  const updateCartQty = (productId, newQty, maxStock = 50) => {
    if (newQty <= 0) {
      setCartItems(prev => prev.filter(item => item.id !== productId));
    } else {
      const clampedQty = Math.min(newQty, maxStock);
      setCartItems(prev =>
        prev.map(item =>
          item.id === productId ? { ...item, qty: clampedQty } : item
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

  const handleOrderComplete = async (order) => {
    try {
      await fetch('https://sgtradingcard.onrender.com/api/orders/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: order.items, orderId: order.id }),
      });
    } catch (err) {
      console.error('Stock sync failed:', err);
    }
    
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
            onBack={() => setCurrentPage(selectedProduct.sellerId ? 'grand-exchange' : 'shop')}
            onViewSellerProfile={(id) => {
               setCurrentSellerId(id);
               setCurrentPage('seller-profile');
            }}
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
    
    if (currentPage === 'grand-exchange') {
      return (
        <main style={{ minHeight: '70vh', padding: '2rem 0' }}>
          <GrandExchangeMarket 
            products={products}
            onAddToCart={addToCart}
            onViewProduct={viewProduct}
            currentUser={currentUser}
            setCurrentPage={setCurrentPage}
          />
        </main>
      );
    }
    
    if (currentPage === 'seller-profile') {
      return (
        <main style={{ minHeight: '70vh', padding: '2rem 0' }}>
          <SellerProfile 
            sellerId={currentSellerId}
            onBack={() => setCurrentPage('grand-exchange')}
            onViewProduct={viewProduct}
            onAddToCart={addToCart}
            user={currentUser}
            token={userToken}
          />
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

    if (currentPage === 'reviews') {
      return (
        <main style={{ minHeight: '70vh', padding: '2rem 0' }}>
          <ReviewsPage />
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

    if (currentPage === 'policies') {
      return (
        <main style={{ minHeight: '70vh', padding: '2rem 0' }}>
          <PoliciesPage onBack={() => { setCurrentPage('home'); window.scrollTo(0,0); }} />
        </main>
      );
    }

    if (currentPage === 'faq') {
      return (
        <main style={{ minHeight: '70vh', padding: '2rem 0' }}>
          <FaqPage onBack={() => { setCurrentPage('home'); window.scrollTo(0, 0); }} />
        </main>
      );
    }

    if (currentPage === 'contact') {
      return (
        <main style={{ minHeight: '70vh', padding: '2rem 0' }}>
          <ContactPage onBack={() => { setCurrentPage('home'); window.scrollTo(0, 0); }} />
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
            {products.filter(p => (p.stock > 0 || (p.stock === undefined && !p.soldOut)) && !p.sellerId).sort((a,b) => b.id - a.id).slice(0, 8).map(product => (
              <ProductCard 
                key={product.id}
                product={product}
                title={product.title}
                price={product.price}
                soldOut={product.stock === 0 || product.soldOut}
                imgUrl={product.imgUrl}
                onAddToCart={addToCart}
                onViewProduct={viewProduct}
              />
            ))}
          </div>
          
          {/* Removed redundant Shop All button */}
        </section>

        {/* Live Stream Schedule Section */}
        <section className="stream-section" style={{ padding: '6rem 2rem', background: '#f8fafc', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div className="stream-info" style={{ width: '100%', maxWidth: '600px' }}>
            <div style={{ display: 'inline-block', background: '#fe2c55', color: '#fff', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '1rem', letterSpacing: '1px' }}>LIVE ON TIKTOK</div>
            <h2 style={{ fontSize: '2.8rem', marginBottom: '1.5rem', color: '#1a202c', lineHeight: '1.2' }}>Catch Us Live!</h2>
            <p style={{ color: '#4a5568', fontSize: '1.1rem', marginBottom: '2.5rem', lineHeight: '1.7' }}>
              Join the S&G Trading community! We kick back, play old-school Nintendo games, and open packs live for the community. Come hang out!
            </p>
            
            <div className="schedule-card" style={{ background: '#fff', borderRadius: '16px', padding: '2.5rem', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', textAlign: 'left' }}>
              <h3 style={{ borderBottom: '2px solid #edf2f7', paddingBottom: '1rem', marginBottom: '1.5rem', fontSize: '1.3rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                📅 Weekly Stream Schedule
              </h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0', fontWeight: 'bold' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem' }}><span style={{ color: '#e53e3e', fontSize: '1.4rem' }}>●</span> Friday Live Open & Chill</span>
                  <span style={{ background: '#ebf4ff', color: '#2b6cb0', padding: '6px 12px', borderRadius: '8px' }}>6:00 PM EST</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0', borderTop: '1px solid #edf2f7' }}>
                  <span style={{ color: '#718096', display: 'flex', alignItems: 'center', gap: '8px' }}>Tuesday Live Open & Chill <span style={{ fontSize: '0.75rem', background: '#edf2f7', color: '#4a5568', padding: '3px 8px', borderRadius: '20px', fontWeight: 'bold', textTransform: 'uppercase' }}>Coming Soon</span></span>
                  <span style={{ color: '#a0aec0', padding: '6px 12px' }}>6:00 PM EST</span>
                </li>
              </ul>
              <a href="https://www.tiktok.com/@sgtradingcard" target="_blank" rel="noreferrer" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginTop: '2rem', background: '#000', color: '#fff', padding: '14px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1rem', transition: 'background 0.2s', border: '2px solid #000' }} onMouseOver={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#000'; }} onMouseOut={(e) => { e.currentTarget.style.background = '#000'; e.currentTarget.style.color = '#fff'; }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.589 6.686A4.757 4.757 0 0 0 15.3 2.057a.428.428 0 0 0-.428.428v14.17c0 2.21-1.791 4.004-4.003 4.004-2.21 0-4.002-1.794-4.002-4.004 0-2.21 1.792-4.004 4.002-4.004.283 0 .56.03.826.085v-4.108c-.266-.021-.54-.035-.826-.035-4.42 0-8.006 3.585-8.006 8.062s3.586 8.063 8.006 8.063c4.321 0 7.848-3.413 7.994-7.669h.01v-6.315c1.4.922 3.09 1.481 4.908 1.542V8.167a8.55 8.55 0 0 1-4.192-1.48z"/>
                </svg>
                Follow @sgtradingcard
              </a>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="story-section">
          <h2>Collect with Confidence</h2>
          <p>
            We started this shop with one simple goal: to give collectors and fans a place where trading cards and collectibles feel exciting and trustworthy again. Every pack, box, and item on our shelves is 100% authentic! The same way we'd want to buy it ourselves.
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
                style={{ height: '90px', objectFit: 'contain' }}
              />
            </div>
            <nav className="main-nav">
              <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); }} style={{ fontWeight: currentPage === 'home' ? 'bold' : 'normal', color: currentPage === 'home' ? '#000' : '' }}>Home</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('shop'); }} style={{ fontWeight: currentPage === 'shop' ? 'bold' : 'normal', color: currentPage === 'shop' ? '#000' : '' }}>Shop</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('grand-exchange'); }} style={{ fontWeight: currentPage === 'grand-exchange' ? 'bold' : 'normal', color: currentPage === 'grand-exchange' ? '#000' : '' }}>The Grand Exchange</a>
            </nav>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
              <a href="https://www.tiktok.com/@sgtradingcard" target="_blank" rel="noreferrer" title="Follow us on TikTok" style={{ fontSize: '1.2rem', color: '#000', textDecoration: 'none', display: 'flex', alignItems: 'center', transition: 'opacity 0.2s' }} onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'} onMouseOut={(e) => e.currentTarget.style.opacity = '1'}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.589 6.686A4.757 4.757 0 0 0 15.3 2.057a.428.428 0 0 0-.428.428v14.17c0 2.21-1.791 4.004-4.003 4.004-2.21 0-4.002-1.794-4.002-4.004 0-2.21 1.792-4.004 4.002-4.004.283 0 .56.03.826.085v-4.108c-.266-.021-.54-.035-.826-.035-4.42 0-8.006 3.585-8.006 8.062s3.586 8.063 8.006 8.063c4.321 0 7.848-3.413 7.994-7.669h.01v-6.315c1.4.922 3.09 1.481 4.908 1.542V8.167a8.55 8.55 0 0 1-4.192-1.48z"/>
                </svg>
              </a>
              <div className="cart-icon" onClick={() => setCurrentPage('cart')} style={{ cursor: 'pointer' }}>
                <span style={{ color: currentPage === 'cart' ? '#000' : '' }}>Cart ({cartCount})</span>
              </div>
            </div>
          </div>
        </header>

        {renderPage()}

        {/* Footer */}
        <footer className="site-footer">
          <div className="footer-content">
            <div className="footer-brand" style={{ flex: '1', minWidth: '280px' }}>
              <h3 style={{ marginBottom: '1rem', fontWeight: 'bold' }}>S&G Trading Card</h3>
              <p style={{ marginBottom: '1.5rem' }}>Your trusted source for authentic trading cards, collectibles, and all things nerd culture.</p>
              
              <div className="newsletter-signup" style={{ marginTop: '1rem' }}>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: '#fff' }}>Join our mailing list</h4>
                <p style={{ fontSize: '0.8rem', color: '#aaa', marginBottom: '0.8rem' }}>Get notified about restocks and new upcoming sets!</p>
                <form 
                  onSubmit={(e) => { 
                    e.preventDefault(); 
                    showToast("Thanks for subscribing! We'll keep you updated.");
                    e.target.reset();
                  }}
                  style={{ display: 'flex', gap: '0.5rem', maxWidth: '350px' }}
                >
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    required 
                    style={{ flex: '1', padding: '10px 12px', borderRadius: '4px', border: 'none', fontSize: '0.9rem' }}
                  />
                  <button type="submit" style={{ backgroundColor: '#2b6cb0', color: 'white', border: 'none', borderRadius: '4px', padding: '0 15px', fontWeight: '600', cursor: 'pointer' }}>
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
            <div className="footer-links" style={{ flex: '1', minWidth: '200px', alignItems: 'flex-start' }}>
              <h4 style={{ color: '#fff', marginBottom: '1rem' }}>Store</h4>
              <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('faq'); window.scrollTo(0, 0); }}>FAQ</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('policies'); window.scrollTo(0, 0); }}>Policies, Terms, & Conditions</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('reviews'); window.scrollTo(0, 0); }}>Customer Reviews</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('contact'); window.scrollTo(0, 0); }}>Contact Us</a>
            </div>
            
            <div className="footer-links" style={{ flex: '1', minWidth: '150px', alignItems: 'flex-start' }}>
              <h4 style={{ color: '#fff', marginBottom: '1rem' }}>Social</h4>
              <a href="https://www.tiktok.com/@sgtradingcard" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.589 6.686A4.757 4.757 0 0 0 15.3 2.057a.428.428 0 0 0-.428.428v14.17c0 2.21-1.791 4.004-4.003 4.004-2.21 0-4.002-1.794-4.002-4.004 0-2.21 1.792-4.004 4.002-4.004.283 0 .56.03.826.085v-4.108c-.266-.021-.54-.035-.826-.035-4.42 0-8.006 3.585-8.006 8.062s3.586 8.063 8.006 8.063c4.321 0 7.848-3.413 7.994-7.669h.01v-6.315c1.4.922 3.09 1.481 4.908 1.542V8.167a8.55 8.55 0 0 1-4.192-1.48z"/>
                </svg>
                TikTok
              </a>
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
