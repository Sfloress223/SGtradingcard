import React from 'react';

const PoliciesPage = ({ onBack }) => {
  return (
    <div className="policies-page" style={{ padding: '0 5%', maxWidth: '1000px', margin: '0 auto', textAlign: 'left' }}>
      <button 
        onClick={onBack} 
        style={{ background: 'none', border: 'none', cursor: 'pointer', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '5px', color: '#666' }}
      >
        ← Back to Home
      </button>

      <h1 style={{ marginBottom: '2rem', fontSize: '2.5rem' }}>Policies, Terms & Conditions</h1>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ borderBottom: '1px solid #eee', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Privacy Policy</h2>
        <p style={{ lineHeight: '1.6', marginBottom: '1rem' }}>
          At S&G Trading Card, we respect your privacy and are committed to protecting your personal data. We collect information you provide directly to us, such as when you create an account, place an order, or contact us. This information is used solely to fulfill your orders, process payments, and improve your shopping experience.
        </p>
        <p style={{ lineHeight: '1.6' }}>
          We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties except trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.
        </p>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ borderBottom: '1px solid #eee', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Return & Refund Policy</h2>
        <p style={{ lineHeight: '1.6', marginBottom: '1rem' }}>
          Due to the nature of collectible trading cards and the potential for tampering, <strong>there are absolutely no returns or refunds</strong> on any products. All sales are final.
        </p>
        <p style={{ lineHeight: '1.6', marginBottom: '1rem' }}>
          The only exception is if your item arrives damaged on delivery. If this occurs, please contact us immediately with pictures of the damage so we can resolve the issue.
        </p>
        <p style={{ lineHeight: '1.6' }}>
          If you have any questions or concerns regarding our policy, please don't hesitate to reach out and contact us!
        </p>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ borderBottom: '1px solid #eee', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Terms of Service</h2>
        <p style={{ lineHeight: '1.6', marginBottom: '1rem' }}>
          By accessing and using sgtradingcard.com, you agree to be bound by these Terms and Conditions. We reserve the right to update or modify these terms at any time without prior notice.
        </p>
        <p style={{ lineHeight: '1.6', marginBottom: '1rem' }}>
          <strong>Pre-orders:</strong> Pre-orders will ship on or around the official release date of the product. If your order contains both in-stock and pre-order items, the entire order will be held until the pre-order items are ready to ship. If you want in-stock items quickly, please place separate orders.
        </p>
        <p style={{ lineHeight: '1.6' }}>
          <strong>Order Cancellations:</strong> We reserve the right to cancel any order for any reason, including but not limited to suspect fraud, pricing errors, or inventory discrepancies.
        </p>
      </section>
    </div>
  );
};

export default PoliciesPage;
