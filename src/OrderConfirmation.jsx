import React from 'react';

const OrderConfirmation = ({ order, onBackToHome }) => {
  return (
    <section className="confirmation-section">
      <div className="confirmation-card">
        <div className="confirmation-icon">✓</div>
        <h2>Order Confirmed!</h2>
        <p className="confirmation-id">Order ID: {order.id.substring(0, 20)}...</p>
        
        <div className="confirmation-details">
          <div className="confirmation-row">
            <span>Email</span>
            <span>{order.shipping.email}</span>
          </div>
          <div className="confirmation-row">
            <span>Ship To</span>
            <span>{order.shipping.name}<br />{order.shipping.address}<br />{order.shipping.city}, {order.shipping.state} {order.shipping.zip}</span>
          </div>
          <div className="confirmation-row">
            <span>Items</span>
            <span>{order.items.reduce((sum, i) => sum + i.qty, 0)} item(s)</span>
          </div>
          <div className="confirmation-row total">
            <span>Total Paid</span>
            <span>${order.amount.toFixed(2)}</span>
          </div>
        </div>

        <p className="confirmation-note">A receipt has been sent to your email. Your order will ship within 1-3 business days.</p>

        <button className="view-all-btn" onClick={onBackToHome}>
          Continue Shopping
        </button>
      </div>
    </section>
  );
};

export default OrderConfirmation;
