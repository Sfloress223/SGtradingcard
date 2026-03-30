import React from 'react';

const CartPage = ({ cartItems, onUpdateQty, onRemove, onContinueShopping, onCheckout }) => {
  if (cartItems.length === 0) {
    return (
      <section className="cart-section">
        <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Your Cart</h2>
        <div className="cart-empty">
          <span className="cart-empty-icon">🛒</span>
          <p>Your cart is empty</p>
          <button className="view-all-btn" onClick={onContinueShopping}>Continue Shopping</button>
        </div>
      </section>
    );
  }

  const subtotal = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('$', ''));
    return sum + price * item.qty;
  }, 0);

  return (
    <section className="cart-section">
      <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Your Cart</h2>
      
      <div className="cart-layout">
        <div className="cart-items">
          {cartItems.map(item => {
            const unitPrice = parseFloat(item.price.replace('$', ''));
            return (
              <div className="cart-item" key={item.id}>
                <div className="cart-item-image">
                  {item.imgUrl ? <img src={item.imgUrl} alt={item.title} /> : <span>📦</span>}
                </div>
                <div className="cart-item-details">
                  <h3 className="cart-item-title">{item.title}</h3>
                  <p className="cart-item-price">{item.price}</p>
                </div>
                <div className="cart-item-qty">
                  <button className="qty-btn" onClick={() => onUpdateQty(item.id, item.qty - 1)}>−</button>
                  <span className="qty-value">{item.qty}</span>
                  <button className="qty-btn" onClick={() => onUpdateQty(item.id, item.qty + 1)}>+</button>
                </div>
                <div className="cart-item-total">
                  ${(unitPrice * item.qty).toFixed(2)}
                </div>
                <button className="cart-item-remove" onClick={() => onRemove(item.id)} title="Remove">✕</button>
              </div>
            );
          })}
        </div>

        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="cart-summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="cart-summary-row">
            <span>Shipping</span>
            <span>{subtotal >= 150 ? 'FREE' : 'Calculated at checkout'}</span>
          </div>
          {subtotal >= 150 && (
            <p className="cart-free-shipping-note">🎉 You qualify for free shipping!</p>
          )}
          <div className="cart-summary-row cart-summary-total">
            <span>Estimated Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <button className="checkout-btn" onClick={onCheckout}>Proceed to Checkout</button>
          <button className="continue-shopping-btn" onClick={onContinueShopping}>Continue Shopping</button>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
