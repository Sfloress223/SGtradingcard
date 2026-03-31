import React, { useState } from 'react';
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';

const ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#333',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      '::placeholder': { color: '#aab7c4' },
    },
    invalid: { color: '#e33' },
  },
};

const CheckoutPage = ({ cartItems, onBack, onOrderComplete }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [shipping, setShipping] = useState({
    name: '', email: '', phone: '', address: '', city: '', state: '', zip: ''
  });
  const [cardName, setCardName] = useState('');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const isSellerCart = cartItems.length > 0 && !!cartItems[0].sellerId;

  const subtotal = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('$', ''));
    return sum + price * item.qty;
  }, 0);

  const isFreeShipping = !isSellerCart && subtotal >= 150;
  const platformShipping = isFreeShipping ? 0 : 8.99;
  
  const sellerShipping = isSellerCart ? cartItems.reduce((sum, item) => {
    const fee = parseFloat((item.shippingFee || '$0').replace('$', ''));
    return sum + fee * item.qty; // Assume flat rate per item for simplicity MVP
  }, 0) : 0;

  const totalShipping = isSellerCart ? sellerShipping : platformShipping;
  const total = subtotal + totalShipping;

  const handleInputChange = (e) => {
    setShipping(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    setError(null);

    try {
      const response = await fetch('https://sgtradingcard.onrender.com/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cartItems, shipping, platformShipping, sellerShipping }),
      });

      const { clientSecret, error: serverError } = await response.json();
      if (serverError) {
        setError(serverError);
        setProcessing(false);
        return;
      }

      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: cardName || shipping.name,
            email: shipping.email,
            phone: shipping.phone,
            address: {
              line1: shipping.address,
              city: shipping.city,
              state: shipping.state,
              postal_code: shipping.zip,
              country: 'US',
            },
          },
        },
      });

      if (stripeError) {
        setError(stripeError.message);
        setProcessing(false);
      } else if (paymentIntent.status === 'succeeded') {
        onOrderComplete({
          id: paymentIntent.id,
          amount: total,
          shipping,
          items: cartItems,
        });
      }
    } catch {
      setError('Something went wrong. Please try again.');
      setProcessing(false);
    }
  };

  return (
    <section className="checkout-section">
      <button className="back-btn" onClick={onBack}>← Back to Cart</button>
      <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Checkout</h2>

      <form onSubmit={handleSubmit} className="checkout-layout">
        <div className="checkout-form-area">
          {/* Shipping Information */}
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
                <label>Phone <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0, color: '#aaa' }}>(optional)</span></label>
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

          {/* Payment */}
          <div className="checkout-card">
            <h3>Payment Details</h3>
            <div className="form-grid">
              <div className="form-group full-width">
                <label>Name on Card</label>
                <input type="text" value={cardName} onChange={(e) => setCardName(e.target.value)} required placeholder="John Doe" />
              </div>
              <div className="form-group full-width">
                <label>Card Number</label>
                <div className="stripe-card-wrapper">
                  <CardNumberElement options={ELEMENT_OPTIONS} />
                </div>
              </div>
              <div className="form-group" style={{ gridColumn: 'span 2' }}>
                <label>Expiration Date</label>
                <div className="stripe-card-wrapper">
                  <CardExpiryElement options={ELEMENT_OPTIONS} />
                </div>
              </div>
              <div className="form-group">
                <label>CVC</label>
                <div className="stripe-card-wrapper">
                  <CardCvcElement options={ELEMENT_OPTIONS} />
                </div>
              </div>
            </div>
            {error && <p className="checkout-error">{error}</p>}
          </div>
        </div>

        {/* Order Summary */}
        <div className="checkout-summary">
          <h3>Order Summary</h3>
          <div className="checkout-items-list">
            {cartItems.map(item => (
              <div key={item.id} className="checkout-item-row">
                <div className="checkout-item-info">
                  <span className="checkout-item-name">{item.title}</span>
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
              <span>{totalShipping === 0 ? 'FREE' : `$${totalShipping.toFixed(2)}`}</span>
            </div>
            {isFreeShipping && <p className="cart-free-shipping-note">🎉 Free shipping applied!</p>}
            {isSellerCart && <p className="cart-free-shipping-note" style={{color:'#666', background:'transparent'}}>This is a Grand Exchange peer-to-peer order. Shipping is set by the seller.</p>}
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
            {processing ? 'Processing...' : `Pay $${total.toFixed(2)}`}
          </button>

          <div className="checkout-secure-note">
            <span>🔒</span> Payments securely processed by Stripe
          </div>
        </div>
      </form>
    </section>
  );
};

export default CheckoutPage;
