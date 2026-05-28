import React, { useEffect } from 'react';

const OrderConfirmation = ({ order, onBackToHome }) => {
  useEffect(() => {
    if (!order || !order.id || !order.shipping?.email) return;

    // Load the Google Customer Reviews platform script
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/platform.js?onload=renderOptIn';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    // Calculate an estimated delivery date (7 days from today in YYYY-MM-DD format)
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 7);
    const yyyy = deliveryDate.getFullYear();
    const mm = String(deliveryDate.getMonth() + 1).padStart(2, '0');
    const dd = String(deliveryDate.getDate()).padStart(2, '0');
    const formattedDeliveryDate = `${yyyy}-${mm}-${dd}`;

    window.renderOptIn = () => {
      if (window.gapi && window.gapi.load) {
        window.gapi.load('surveyoptin', () => {
          window.gapi.surveyoptin.render({
            "merchant_id": 5685714111, // Your official Google Merchant ID
            "order_id": order.id,
            "email": order.shipping.email,
            "delivery_country": "US",
            "estimated_delivery_date": formattedDeliveryDate
          });
        });
      }
    };

    return () => {
      // Clean up script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      delete window.renderOptIn;
    };
  }, [order]);

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
