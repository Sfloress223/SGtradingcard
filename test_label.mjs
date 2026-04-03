import jwt from 'jsonwebtoken';

async function testPurchase() {
  const token = jwt.sign({ username: 'sgadmin', role: 'admin' }, 'sg-trading-secret-key-change-me-in-production', { expiresIn: '1h' });

  // 1. Get rates from live
  const res1 = await fetch('https://sgtradingcard.onrender.com/api/shipments/quote', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({
      toAddress: { name: 'Sam Floress', street1: '4011 Ridgecrest Trl', city: 'Carrollton', state: 'TX', zip: '75007', country: 'US' },
      parcel: { length: 8, width: 4, height: 1, weight: 4 }
    })
  });
  
  const data1 = await res1.json();
  if (!data1.rates || data1.rates.length === 0) return console.log('No rates found', data1);
  
  const uspsRate = data1.rates.find(r => r.provider === 'USPS');
  if (!uspsRate) return console.log('No USPS rate found');

  const rateId = uspsRate.object_id;
  
  console.log('Attempting to buy USPS rate LIVE:', rateId, '-', uspsRate.servicelevel.name);

  // 2. Buy label live
  const res2 = await fetch('https://sgtradingcard.onrender.com/api/shipments/label', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({ rateId, orderId: 'test_order' })
  });

  const text2 = await res2.text();
  console.log('STATUS:', res2.status);
  console.log('BODY:', text2);
}
testPurchase();
