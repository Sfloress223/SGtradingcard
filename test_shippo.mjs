import jwt from 'jsonwebtoken';

async function testShippo() {
  const token = jwt.sign({ username: 'sgadmin', role: 'admin' }, 'sg-trading-secret-key-change-me-in-production', { expiresIn: '1h' });

  const res = await fetch('http://localhost:3001/api/shipments/quote', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({
      toAddress: { name: 'Sam Floress', street1: '4011 Ridgecrest Trl', city: 'Carrollton', state: 'TX', zip: '75007', country: 'US' },
      parcel: { length: 8, width: 4, height: 1, weight: 4 }
    })
  });
  
  const text = await res.text();
  console.log('STATUS:', res.status);
  console.log('BODY:', text);
}
testShippo();
