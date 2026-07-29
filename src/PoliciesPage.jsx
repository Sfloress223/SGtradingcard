import React, { useState, useEffect } from 'react';

const PoliciesPage = ({ onBack, initialTab = 'privacy' }) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const storePhone = import.meta.env.VITE_STORE_PHONE || "(469) 364-4613";
  const storeEmail = import.meta.env.VITE_STORE_EMAIL || "sgtradingcard+help@gmail.com";
  const storeAddress = import.meta.env.VITE_STORE_ADDRESS || "11605 Harry Hines Blvd, Dallas, TX 75229";

  const tabs = [
    { id: 'refund', label: 'Return & Refund Policy' },
    { id: 'shipping', label: 'Shipping Policy' },
    { id: 'privacy', label: 'Privacy Policy' },
    { id: 'terms', label: 'Terms of Service' }
  ];

  return (
    <div className="policies-page" style={{ padding: '0 5%', maxWidth: '1000px', margin: '0 auto', textAlign: 'left' }}>
      <button 
        onClick={onBack} 
        style={{ background: 'none', border: 'none', cursor: 'pointer', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '5px', color: '#666' }}
      >
        ← Back to Home
      </button>

      <h1 style={{ marginBottom: '1.5rem', fontSize: '2.5rem' }}>Policies, Terms & Conditions</h1>

      {/* Tabs navigation */}
      <div style={{ display: 'flex', borderBottom: '2px solid #e2e8f0', marginBottom: '2rem', gap: '1rem', flexWrap: 'wrap' }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '10px 15px',
              border: 'none',
              background: 'none',
              fontSize: '1rem',
              fontWeight: activeTab === tab.id ? '600' : '400',
              borderBottom: activeTab === tab.id ? '3px solid #2b6cb0' : '3px solid transparent',
              color: activeTab === tab.id ? '#2b6cb0' : '#4a5568',
              cursor: 'pointer',
              marginBottom: '-2px',
              transition: 'all 0.2s'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ background: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0', minHeight: '300px', lineHeight: '1.7' }}>
        {activeTab === 'privacy' && (
          <section>
            <h2 style={{ color: '#2d3748', marginBottom: '1.2rem', fontSize: '1.8rem' }}>Privacy Policy</h2>
            <p style={{ marginBottom: '1rem' }}>
              At S&G Trading, we respect your privacy and are committed to protecting your personal data. This Privacy Policy outlines how we collect, use, and protect your information when you access or make a purchase from our website.
            </p>
            <h3 style={{ fontSize: '1.2rem', margin: '1.5rem 0 0.5rem 0', color: '#2d3748' }}>Information We Collect</h3>
            <p style={{ marginBottom: '1rem' }}>
              We collect information you provide directly to us when you create an account, place an order, or contact us. This includes your name, shipping address, email address, phone number, and payment information. Payment details are processed securely through Stripe and are never stored on our servers.
            </p>
            <h3 style={{ fontSize: '1.2rem', margin: '1.5rem 0 0.5rem 0', color: '#2d3748' }}>How We Use Your Information</h3>
            <p style={{ marginBottom: '1rem' }}>
              We use your information solely to:
            </p>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
              <li>Process, ship, and fulfill your orders.</li>
              <li>Provide customer support and respond to inquiries.</li>
              <li>Send transaction confirmation emails, receipts, and tracking updates.</li>
              <li>Improve our website's performance and catalog selection.</li>
            </ul>
            <h3 style={{ fontSize: '1.2rem', margin: '1.5rem 0 0.5rem 0', color: '#2d3748' }}>Information Sharing</h3>
            <p style={{ marginBottom: '1rem' }}>
              We do not sell, trade, or share your personally identifiable information with outside parties. This excludes trusted third-party partners who assist us in operating our site, processing payments (Stripe), and shipping packages (Shippo/USPS/UPS), under strict confidentiality agreements.
            </p>
            <h3 style={{ fontSize: '1.2rem', margin: '1.5rem 0 0.5rem 0', color: '#2d3748' }}>Security</h3>
            <p>
              We implement industry-standard SSL encryption and follow strict payment security protocols to ensure your data is safe. If you have questions about our privacy policy, please contact us at <strong>{storeEmail}</strong>.
            </p>
          </section>
        )}

        {activeTab === 'refund' && (
          <section>
            <h2 style={{ color: '#2d3748', marginBottom: '1.2rem', fontSize: '1.8rem' }}>Return & Refund Policy</h2>
            <p style={{ marginBottom: '1.2rem' }}>
              At S&G Trading, we want you to be confident in every purchase. We offer a <strong>14-Day Return Policy</strong> for unopened, factory-sealed products from the date of delivery.
            </p>
            
            <h3 style={{ fontSize: '1.2rem', margin: '1.5rem 0 0.5rem 0', color: '#2d3748' }}>Return Eligibility & Guidelines</h3>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
              <li><strong>Unopened & Sealed Items Only:</strong> Returns are accepted within <strong>14 days of delivery</strong> for unopened, factory-sealed products in their original manufacturer packaging.</li>
              <li><strong>Opened / Unsealed Products:</strong> Due to the nature of collectible trading cards, individual single cards, opened booster packs, unsealed boxes, and graded slabs are strictly non-returnable once opened or unsealed.</li>
              <li><strong>Restocking Fee:</strong> A restocking fee of up to 20% may apply to returned items at our discretion.</li>
              <li><strong>Return Shipping:</strong> Customers are responsible for return shipping costs and providing a valid tracking number.</li>
            </ul>

            <h3 style={{ fontSize: '1.2rem', margin: '1.5rem 0 0.5rem 0', color: '#2d3748' }}>Inspection & Anti-Tampering Verification</h3>
            <p style={{ marginBottom: '1.2rem' }}>
              All returned items undergo strict visual and physical inspection upon arrival. Returned merchandise must match the exact item, seal, and condition recorded at fulfillment. Any item showing signs of opening, resealing, unsealing, or tampering will be denied a refund.
            </p>

            <h3 style={{ fontSize: '1.2rem', margin: '1.5rem 0 0.5rem 0', color: '#2d3748' }}>Damaged or Defective Items</h3>
            <p style={{ marginBottom: '1.2rem' }}>
              If your package arrives physically damaged during transit, please contact us within <strong>48 hours of delivery</strong>:
            </p>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
              <li>Email us at <strong>{storeEmail}</strong> or call us at <strong>{storePhone}</strong>.</li>
              <li>Provide your order number and clear photos of the damaged product and outer packaging.</li>
              <li>If approved, we will provide a prepaid return label and issue a full replacement or refund.</li>
            </ul>

            <h3 style={{ fontSize: '1.2rem', margin: '1.5rem 0 0.5rem 0', color: '#2d3748' }}>Return Address</h3>
            <p style={{ marginBottom: '1.2rem' }}>
              All authorized returns must be shipped to:
              <br />
              <strong>S&G Trading (Returns Dept)</strong>
              <br />
              {storeAddress}
            </p>
          </section>
        )}

        {activeTab === 'shipping' && (
          <section>
            <h2 style={{ color: '#2d3748', marginBottom: '1.2rem', fontSize: '1.8rem' }}>Shipping Policy</h2>
            <p style={{ marginBottom: '1.2rem' }}>
              We strive to package and ship all orders with the utmost care to ensure your trading cards arrive safely.
            </p>
            
            <h3 style={{ fontSize: '1.2rem', margin: '1.5rem 0 0.5rem 0', color: '#2d3748' }}>Handling Time</h3>
            <p style={{ marginBottom: '1.2rem' }}>
              All orders are processed and handed over to carriers within <strong>24 business hours</strong>. Orders placed Monday through Friday ship the next business day. Orders placed on Friday after 4:00 PM CST, Saturday, or Sunday will be processed and shipped on Monday morning.
            </p>

            <h3 style={{ fontSize: '1.2rem', margin: '1.5rem 0 0.5rem 0', color: '#2d3748' }}>Shipping Rates & Delivery Times</h3>
            <p style={{ marginBottom: '1rem' }}>
              We offer flat-rate standard shipping and calculated shipping speeds at checkout:
            </p>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
              <li><strong>Standard Shipping (Orders under $100):</strong> $5.99 flat rate.</li>
              <li><strong>Free Standard Shipping (Orders $100 or more):</strong> $0.00 standard shipping (automatically applied at checkout).</li>
              <li><strong>Estimated Delivery:</strong> 3 to 7 business days transit time depending on your location.</li>
            </ul>

            <h3 style={{ fontSize: '1.2rem', margin: '1.5rem 0 0.5rem 0', color: '#2d3748' }}>Carrier Services & Tracking</h3>
            <p style={{ marginBottom: '1.2rem' }}>
              We ship packages using <strong>USPS</strong>, <strong>UPS</strong>, or <strong>FedEx</strong>. As soon as your order is fulfilled and handed to the carrier, a shipping confirmation email containing a clickable tracking number will be sent to your registered email address.
            </p>

            <h3 style={{ fontSize: '1.2rem', margin: '1.5rem 0 0.5rem 0', color: '#2d3748' }}>Lost or Stolen Packages</h3>
            <p>
              S&G Trading is not responsible for packages once marked as "Delivered" by the carrier. If your tracking says delivered but you have not received it, please contact the carrier directly. If your package is delayed or lost in transit, contact us at <strong>{storeEmail}</strong> and we will help open a carrier investigation.
            </p>
          </section>
        )}

        {activeTab === 'terms' && (
          <section>
            <h2 style={{ color: '#2d3748', marginBottom: '1.2rem', fontSize: '1.8rem' }}>Terms of Service</h2>
            <p style={{ marginBottom: '1.2rem' }}>
              By accessing and placing an order on <strong>sgtradingcard.com</strong>, you agree to be bound by these Terms & Conditions. Please read them carefully.
            </p>
            
            <h3 style={{ fontSize: '1.2rem', margin: '1.5rem 0 0.5rem 0', color: '#2d3748' }}>Product Listings & Inventory</h3>
            <p style={{ marginBottom: '1.2rem' }}>
              We make every effort to display accurate product details, pricing, and stock levels. In the event of a pricing or description error, we reserve the right to cancel any affected orders and issue a full refund prior to shipment.
            </p>

            <h3 style={{ fontSize: '1.2rem', margin: '1.5rem 0 0.5rem 0', color: '#2d3748' }}>Pre-Orders</h3>
            <p style={{ marginBottom: '1.2rem' }}>
              Pre-order products will ship on or immediately around the manufacturer's official release date. If an order contains both in-stock items and pre-order items, the entire order will be held until the pre-order items are released. If you wish to receive in-stock items sooner, please place separate orders.
            </p>

            <h3 style={{ fontSize: '1.2rem', margin: '1.5rem 0 0.5rem 0', color: '#2d3748' }}>Order Cancellations</h3>
            <p style={{ marginBottom: '1.2rem' }}>
              We reserve the right to refuse or cancel any order for any reason, including suspected fraud, bulk buying limit violations, pricing discrepancies, or shipping carrier restrictions.
            </p>

            <h3 style={{ fontSize: '1.2rem', margin: '1.5rem 0 0.5rem 0', color: '#2d3748' }}>Contact & Business Information</h3>
            <p>
              For legal inquiries, feedback, or storefront questions, please reach out to us at:
              <br />
              <strong>S&G Trading</strong>
              <br />
              Address: {storeAddress}
              <br />
              Phone: {storePhone}
              <br />
              Email: {storeEmail}
            </p>
          </section>
        )}
      </div>
    </div>
  );
};

export default PoliciesPage;
