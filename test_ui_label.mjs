import jwt from 'jsonwebtoken';

async function testPurchaseUI() {
  const token = jwt.sign({ username: 'sgadmin', role: 'admin' }, 'sg-trading-secret-key-change-me-in-production', { expiresIn: '1h' });

  // Get rates 
  const res1 = await fetch('https://sgtradingcard.onrender.com/api/shipments/quote', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({
      toAddress: { name: 'Sam Floress', street1: '4011 Ridgecrest Trl', city: 'Carrollton', state: 'TX', zip: '75007', country: 'US' },
      parcel: { length: 6, width: 4, height: 0.25, weight: 1 } // PWE dimensions
    })
  });
  const data1 = await res1.json();
  const uspsRate = data1.rates.find(r => r.provider === 'USPS');
  if (!uspsRate) return console.log('No USPS rate found');
  const rateId = uspsRate.object_id;

  console.log('Sending RateID:', rateId);

  // Mimic the exact browser payload using the exact order
  const res2 = await fetch('https://sgtradingcard.onrender.com/api/shipments/label', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({ rateId, orderId: 'ord_1775009132652' })
  });

  const text2 = await res2.text(); // fetch RAW text so we don't crash on HTML
  console.log('STATUS:', res2.status);
  console.log('BODY:', text2);
}
testPurchaseUI();
