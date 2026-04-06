import React, { useState } from 'react';

export const FaqPage = ({ onBack }) => {
  return (
    <div className="policies-page" style={{ padding: '0 5%', maxWidth: '1000px', margin: '0 auto', textAlign: 'left' }}>
      <button 
        onClick={onBack} 
        style={{ background: 'none', border: 'none', cursor: 'pointer', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '5px', color: '#666' }}
      >
        ← Back to Home
      </button>

      <h1 style={{ marginBottom: '2rem', fontSize: '2.5rem' }}>Frequently Asked Questions</h1>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ borderBottom: '1px solid #eee', paddingBottom: '0.5rem', marginBottom: '1rem', fontSize: '1.4rem' }}>How fast do you ship?</h2>
        <p style={{ lineHeight: '1.6', marginBottom: '1rem' }}>
          During checkout, you get to choose your preferred shipping speed based on the carrier options we provide. 
        </p>
        <p style={{ lineHeight: '1.6', marginBottom: '1rem' }}>
          <strong>Handling Time:</strong> We have a 24-hour handling time on weekdays. If you place an order on Monday, it will be packaged and handed to the carrier by Tuesday.
        </p>
        <p style={{ lineHeight: '1.6' }}>
          <em>Please note:</em> Orders placed on Fridays will be securely packaged over the weekend and will ship out first thing on Monday morning!
        </p>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ borderBottom: '1px solid #eee', paddingBottom: '0.5rem', marginBottom: '1rem', fontSize: '1.4rem' }}>Are your sealed products authentic?</h2>
        <p style={{ lineHeight: '1.6' }}>
          Absolutely. We source all our sealed products from highly reputable, verified distributors. We have a zero-tolerance policy for tampering, resealing, or weighing packs. When you buy from S&G Trading, you are getting 100% factory authentic sealed products—the exact same quality we want for our own personal collections.
        </p>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ borderBottom: '1px solid #eee', paddingBottom: '0.5rem', marginBottom: '1rem', fontSize: '1.4rem' }}>How are single cards and graded slabs packaged?</h2>
        <p style={{ lineHeight: '1.6' }}>
          Singles are placed in a soft sleeve and a rigid toploader, then sealed in a team bag. Graded slabs are secured in protective sleeves and bubble-wrapped heavily. We ship everything in sturdy boxes or reinforced padded mailers to ensure they arrive in the exact condition they left our shop.
        </p>
      </section>
      
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ borderBottom: '1px solid #eee', paddingBottom: '0.5rem', marginBottom: '1rem', fontSize: '1.4rem' }}>When will my pre-order ship?</h2>
        <p style={{ lineHeight: '1.6' }}>
          Pre-orders ship on or around the manufacturer's official release date. In most cases, we aim to have pre-orders arrive at your door on release day! If your order includes both currently available items and pre-order items, your <strong>entire order will be held</strong> until the pre-order items are released. If you need the currently available items sooner, please place two separate orders.
        </p>
      </section>
    </div>
  );
};

export const ContactPage = ({ onBack }) => {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    // In the future this can hit a real mailing endpoint
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <div className="policies-page" style={{ padding: '0 5%', maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}>
      <button 
        onClick={onBack} 
        style={{ background: 'none', border: 'none', cursor: 'pointer', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '5px', color: '#666' }}
      >
        ← Back to Home
      </button>

      <h1 style={{ marginBottom: '1.5rem', fontSize: '2.5rem' }}>Contact Us</h1>
      
      <p style={{ lineHeight: '1.6', marginBottom: '1.5rem', color: '#555' }}>
        Have questions about an order, a specific product, or an upcoming release? We'd love to hear from you. 
        Fill out the form below, email us directly at <strong>Sgtradingcard@gmail.com</strong>, or come visit us in-store!
      </p>

      <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '2.5rem' }}>
        <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>Our Storefront</h3>
        <p style={{ margin: 0, color: '#4a5568', lineHeight: '1.4' }}>
          <strong>S&G Trading</strong><br />
          11605 Harry Hines Blvd<br />
          Dallas, TX 75229
        </p>
      </div>

      {sent ? (
        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '2rem', borderRadius: '8px', textAlign: 'center', color: '#166534' }}>
          <h3 style={{ marginBottom: '0.5rem' }}>Message Sent!</h3>
          <p>Thanks for reaching out. We will get back to you within 24 hours.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label htmlFor="name" style={{ fontWeight: 600, fontSize: '0.9rem' }}>Name</label>
              <input type="text" id="name" required style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }} />
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label htmlFor="email" style={{ fontWeight: 600, fontSize: '0.9rem' }}>Email Option</label>
              <input type="email" id="email" required style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }} />
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label htmlFor="order" style={{ fontWeight: 600, fontSize: '0.9rem' }}>Order Number (Optional)</label>
            <input type="text" id="order" style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label htmlFor="message" style={{ fontWeight: 600, fontSize: '0.9rem' }}>Message</label>
            <textarea id="message" rows="5" required style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ddd', resize: 'vertical' }}></textarea>
          </div>

          <button type="submit" className="add-to-cart-btn" style={{ alignSelf: 'flex-start', padding: '12px 30px', marginTop: '0.5rem' }}>
            Send Message
          </button>
        </form>
      )}
    </div>
  );
};
