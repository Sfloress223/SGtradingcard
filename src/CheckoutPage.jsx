import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Load Stripe Promise using publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({ cartItems, shipping, selectedShippingId, selectedShippingOption, subtotal, taxAmount, total, onBack, onOrderComplete }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    setError(null);

    // Save order data in localStorage in case of payment redirect (e.g. Klarna redirect)
    localStorage.setItem('sg_pending_order', JSON.stringify({
      amount: total,
      shipping,
      taxAmount,
      items: cartItems
    }));

    try {
      const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/?redirect_status=succeeded#confirmation`,
          payment_method_data: {
            billing_details: {
              name: shipping.name,
              email: shipping.email,
              phone: shipping.phone || undefined,
              address: {
                line1: shipping.address,
                city: shipping.city,
                state: shipping.state,
                postal_code: shipping.zip,
                country: 'US',
              },
            },
          },
        },
        redirect: 'if_required',
      });

      if (stripeError) {
        setError(stripeError.message);
        setProcessing(false);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        localStorage.removeItem('sg_pending_order');
        onOrderComplete({
          id: paymentIntent.id,
          amount: total,
          shipping,
          taxAmount,
          items: cartItems,
        });
      }
    } catch (err) {
      console.error('Stripe Element confirmation error:', err);
      setError(`Checkout failed: ${err.message || 'Payment confirmation error'}`);
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-layout">
      <div className="checkout-form-area">
        {/* Shipping summary card */}
        <div className="checkout-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Shipping Address</h3>
            <p style={{ margin: '8px 0 0 0', color: '#666', fontSize: '0.95rem', lineHeight: '1.5' }}>
              <strong>{shipping.name}</strong><br />
              {shipping.address}, {shipping.city}, {shipping.state} {shipping.zip}<br />
              {shipping.email} {shipping.phone ? `| ${shipping.phone}` : ''}
            </p>
            <p style={{ margin: '8px 0 0 0', color: '#007bff', fontWeight: 600, fontSize: '0.9rem' }}>
              Method: {selectedShippingOption.name} ({selectedShippingOption.price === 0 ? 'FREE' : `$${selectedShippingOption.price.toFixed(2)}`})
            </p>
          </div>
          <button 
            type="button" 
            onClick={onBack} 
            style={{ background: 'none', border: 'none', color: '#007bff', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.95rem' }}
          >
            Edit Address
          </button>
        </div>

        {/* Stripe Payment Element Card */}
        <div className="checkout-card">
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Secure Payment</h3>
          <PaymentElement />
          {error && <p className="checkout-error" style={{ color: '#e53e3e', marginTop: '1.5rem', fontWeight: 500 }}>{error}</p>}
        </div>
      </div>

      {/* Order Summary column */}
      <div className="checkout-summary">
        <h3>Order Summary</h3>
        <div className="checkout-items-list">
          {cartItems.map(item => (
            <div key={item.id} className="checkout-item-row">
              <div className="checkout-item-info">
                <span className="checkout-item-name">
                  {item.title}
                  {item.trackedShipping && <span style={{ marginLeft: '6px', fontSize: '0.65rem', padding: '2px 4px', background: '#e6fffa', color: '#276749', borderRadius: '4px', fontWeight: 'bold' }}>TRACKED</span>}
                </span>
                <span className="checkout-item-qty">Qty: {item.qty}</span>
              </div>
              <span className="checkout-item-amount">
                ${(parseFloat(item.price.replace('$', '')) * item.qty).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <div className="checkout-totals">
          <div className="cart-summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="cart-summary-row">
            <span>Shipping</span>
            <span>{selectedShippingOption.price === 0 ? 'FREE' : `$${selectedShippingOption.price.toFixed(2)}`}</span>
          </div>
          <div className="cart-summary-row">
            <span>Estimated Tax</span>
            <span>${taxAmount.toFixed(2)}</span>
          </div>
          {selectedShippingOption.price === 0 && <p className="cart-free-shipping-note">🎉 Free shipping applied!</p>}
          <div className="cart-summary-row cart-summary-total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <button 
          type="submit" 
          className="pay-now-btn" 
          disabled={!stripe || processing}
        >
          {processing ? 'Processing Payment...' : `Complete Purchase — $${total.toFixed(2)}`}
        </button>

        <div className="checkout-secure-note">
          <span>🔒</span> Payments dynamically and securely processed by Stripe
        </div>
      </div>
    </form>
  );
};

const CheckoutPage = ({ cartItems, onBack, onOrderComplete }) => {
  // Guard: if cart is empty, show message instead of crashing
  if (!cartItems || cartItems.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '5rem 2rem' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛒</div>
        <h2 style={{ marginBottom: '1rem' }}>Your cart is empty</h2>
        <p style={{ color: '#666', marginBottom: '2rem' }}>Add some products before checking out.</p>
        <button onClick={onBack} style={{ background: '#000', color: '#fff', border: 'none', padding: '12px 28px', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>
          Continue Shopping
        </button>
      </div>
    );
  }

  const [shipping, setShipping] = useState({
    name: '', email: '', phone: '', address: '', city: '', state: '', zip: ''
  });
  const [checkoutStep, setCheckoutStep] = useState('shipping'); // 'shipping' or 'payment'
  const [clientSecret, setClientSecret] = useState(null);
  const [loadingClientSecret, setLoadingClientSecret] = useState(false);
  const [error, setError] = useState(null);

  const [selectedShippingId, setSelectedShippingId] = useState('');

  const isSellerCart = cartItems.length > 0 && !!cartItems[0].sellerId;

  const subtotal = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('$', ''));
    return sum + price * item.qty;
  }, 0);

  // Cart Classification
  const isHeavy = (item) => {
    const t = (item.title || '').toLowerCase();
    return t.includes('elite trainer box') || 
           t.includes('booster box') || 
           t.includes('collection box') || 
           t.includes('upc') ||
           t.includes('premium collection') ||
           t.includes('poster collection');
  };

  const isGradedCard = (item) => {
    const t = (item.title || '').toLowerCase();
    return t.includes('psa') || t.includes('cgc') || t.includes('bgs') || t.includes('graded');
  };

  const isPackOrBox = (item) => {
    const t = (item.title || '').toLowerCase();
    return !isHeavy(item) && !isGradedCard(item) && (
      t.includes('pack') || 
      t.includes('box') || 
      t.includes('bundle') || 
      t.includes('sleeve') ||
      t.includes('collection') ||
      t.includes('tin') ||
      t.includes('blister') ||
      t.includes('deck') ||
      t.includes('etb')
    );
  };

  const hasHeavy = cartItems.some(isHeavy);
  const hasPacksOrBoxes = cartItems.some(isPackOrBox);
  const hasGraded = cartItems.some(isGradedCard);
  
  const isStrictlySingles = !hasHeavy && !hasPacksOrBoxes && !hasGraded;
  const isFreeShipping = !isSellerCart && subtotal >= 100;

  const getShippingOptions = () => {
    if (isSellerCart) {
      const sellerTotal = cartItems.reduce((sum, item) => sum + parseFloat((item.shippingFee || '$0').replace('$', '')) * item.qty, 0);
      return [{ id: 'seller_rate', name: 'Seller Flat Rate', price: sellerTotal }];
    }
    
    if (hasHeavy) {
      return [
        { id: 'heavy_std', name: 'Standard Shipping (Heavy)', price: isFreeShipping ? 0 : 8.00 },
        { id: 'heavy_exp', name: 'Priority Express', price: 15.00 }
      ];
    }
    
    if (hasPacksOrBoxes) {
      return [
        { id: 'reg_std', name: 'Standard Shipping', price: isFreeShipping ? 0 : 5.99 },
        { id: 'reg_exp', name: 'Priority Express', price: 12.99 }
      ];
    }
 
    if (hasGraded) {
      return [
        { id: 'slab_trk', name: 'Standard Tracked Bubble Mailer', price: isFreeShipping ? 0 : 4.99 },
        { id: 'slab_exp', name: 'Priority Express', price: 12.99 }
      ];
    }
    
    if (cartItems.length > 0) {
      return [
        { id: 'pwe_std', name: 'Plain White Envelope (Untracked)', price: 1.00 },
        { id: 'pwe_trk', name: 'Standard Tracked Bubble Mailer', price: isFreeShipping ? 0 : 4.99 },
        { id: 'pwe_exp', name: 'Priority Express', price: 12.99 }
      ];
    }
 
    return [{ id: 'reg_std', name: 'Standard Shipping', price: isFreeShipping ? 0 : 5.99 }];
  };

  const shippingOptions = getShippingOptions();
  
  useEffect(() => {
    if ((!selectedShippingId || !shippingOptions.find(o => o.id === selectedShippingId)) && shippingOptions.length > 0) {
      setSelectedShippingId(shippingOptions[0].id);
    }
  }, [shippingOptions, selectedShippingId]);

  const selectedShippingOption = shippingOptions.find(o => o.id === selectedShippingId) || shippingOptions[0] || { price: 0 };
  const totalShipping = selectedShippingOption.price;
  const platformShipping = isSellerCart ? 0 : totalShipping;
  const sellerShipping = isSellerCart ? totalShipping : 0;
  
  const taxRate = (shipping.state && ['TX', 'TEXAS'].includes(shipping.state.toUpperCase())) ? 0.0825 : 0;
  const taxAmount = (subtotal + totalShipping) * taxRate;
  const total = subtotal + totalShipping + taxAmount;

  const handleInputChange = (e) => {
    setShipping(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleProceedToPayment = async (e) => {
    e.preventDefault();
    if (!shipping.name || !shipping.email || !shipping.address || !shipping.city || !shipping.state || !shipping.zip) {
      setError('Please fill in all required shipping fields.');
      return;
    }

    setLoadingClientSecret(true);
    setError(null);

    try {
      const response = await fetch('https://sgtradingcard.onrender.com/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cartItems, shipping, platformShipping, sellerShipping, taxAmount }),
      });

      const { clientSecret: secret, error: serverError } = await response.json();
      if (serverError) {
        setError(serverError);
        setLoadingClientSecret(false);
        return;
      }

      setClientSecret(secret);
      setCheckoutStep('payment');
    } catch (err) {
      console.error('Failed to create payment intent:', err);
      setError(`Checkout initialization failed: ${err.message || 'Server error'}`);
    } finally {
      setLoadingClientSecret(false);
    }
  };

  return (
    <section className="checkout-section">
      <button className="back-btn" onClick={checkoutStep === 'payment' ? () => setCheckoutStep('shipping') : onBack}>
        {checkoutStep === 'payment' ? '← Back to Address' : '← Back to Cart'}
      </button>
      <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Checkout</h2>

      {checkoutStep === 'shipping' ? (
        <form onSubmit={handleProceedToPayment} className="checkout-layout">
          <div className="checkout-form-area">
            {/* Shipping Information Card */}
            <div className="checkout-card">
              <h3>Shipping Information</h3>
              <div className="form-grid">
                <div className="form-group full-width">
                  <label>Full Name</label>
                  <input type="text" name="name" value={shipping.name} onChange={handleInputChange} required placeholder="John Doe" />
                </div>
                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label>Email</label>
                  <input type="email" name="email" value={shipping.email} onChange={handleInputChange} required placeholder="john@example.com" />
                </div>
                <div className="form-group">
                  <label>Phone <span style={{ fontWeight: 400, textTransform: 'none', color: '#aaa' }}>(optional)</span></label>
                  <input type="tel" name="phone" value={shipping.phone} onChange={handleInputChange} placeholder="(555) 123-4567" />
                </div>
                <div className="form-group full-width">
                  <label>Street Address</label>
                  <input type="text" name="address" value={shipping.address} onChange={handleInputChange} required placeholder="123 Main St" />
                </div>
                <div className="form-group">
                  <label>City</label>
                  <input type="text" name="city" value={shipping.city} onChange={handleInputChange} required placeholder="New York" />
                </div>
                <div className="form-group">
                  <label>State</label>
                  <input type="text" name="state" value={shipping.state} onChange={handleInputChange} required placeholder="NY" />
                </div>
                <div className="form-group">
                  <label>ZIP Code</label>
                  <input type="text" name="zip" value={shipping.zip} onChange={handleInputChange} required placeholder="10001" />
                </div>
              </div>
            </div>

            {/* Shipping Method Card */}
            <div className="checkout-card">
              <h3>Shipping Method</h3>
              <div className="shipping-options-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                {shippingOptions.map(option => (
                  <label key={option.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', border: `1px solid ${selectedShippingId === option.id ? '#007bff' : '#eee'}`, borderRadius: '8px', cursor: 'pointer', background: selectedShippingId === option.id ? '#f8fbff' : '#fff' }}>
                    <input 
                      type="radio" 
                      name="shippingMethod" 
                      value={option.id} 
                      checked={selectedShippingId === option.id}
                      onChange={(e) => setSelectedShippingId(e.target.value)}
                      style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                    />
                    <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 500, color: '#333' }}>{option.name}</span>
                      <span style={{ fontWeight: 600, color: '#111' }}>{option.price === 0 ? 'FREE' : `$${option.price.toFixed(2)}`}</span>
                    </div>
                  </label>
                ))}
              </div>
              {hasHeavy && !isSellerCart && <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '1rem' }}>* Cart contains heavy items (ETBs, Booster Boxes) which require special shipping rates.</p>}
              {isStrictlySingles && !isSellerCart && <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '1rem' }}>* Cart contains only single cards, qualifying for Plain White Envelope shipping.</p>}
            </div>
            {error && <p className="checkout-error" style={{ color: '#e53e3e', fontWeight: 500 }}>{error}</p>}
          </div>

          {/* Order Summary column (Step 1) */}
          <div className="checkout-summary">
            <h3>Order Summary</h3>
            <div className="checkout-items-list">
              {cartItems.map(item => (
                <div key={item.id} className="checkout-item-row">
                  <div className="checkout-item-info">
                    <span className="checkout-item-name">{item.title}</span>
                    <span className="checkout-item-qty">Qty: {item.qty}</span>
                  </div>
                  <span className="checkout-item-amount">${(parseFloat(item.price.replace('$', '')) * item.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="checkout-totals">
              <div className="cart-summary-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="cart-summary-row">
                <span>Shipping</span>
                <span>{selectedShippingOption.price === 0 ? 'FREE' : `$${selectedShippingOption.price.toFixed(2)}`}</span>
              </div>
              <div className="cart-summary-row">
                <span>Estimated Tax</span>
                <span>${taxAmount.toFixed(2)}</span>
              </div>
              {selectedShippingOption.price === 0 && <p className="cart-free-shipping-note">🎉 Free shipping applied!</p>}
              <div className="cart-summary-row cart-summary-total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button 
              type="submit" 
              className="pay-now-btn" 
              disabled={loadingClientSecret}
            >
              {loadingClientSecret ? 'Preparing Checkout...' : 'Proceed to Payment'}
            </button>
          </div>
        </form>
      ) : (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm 
            cartItems={cartItems}
            shipping={shipping}
            selectedShippingId={selectedShippingId}
            selectedShippingOption={selectedShippingOption}
            subtotal={subtotal}
            taxAmount={taxAmount}
            total={total}
            onBack={() => setCheckoutStep('shipping')}
            onOrderComplete={onOrderComplete}
          />
        </Elements>
      )}
    </section>
  );
};

export default CheckoutPage;
