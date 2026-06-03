import jwt from 'jsonwebtoken';

async function testHeaders() {
  const token = jwt.sign({ username: 'sgadmin', role: 'admin' }, 'sg_live_7x9B2mQ4pL1vW8cR5nK3jH9f', { expiresIn: '1h' });
  const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };

  console.log('Sending combine request...');
  const res = await fetch('https://sgtradingcard.onrender.com/api/admin/orders/combine', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      targetOrderId: 'ord_1778294826145',
      sourceOrderIds: ['ord_1778423628000']
    })
  });

  console.log('Combine response status:', res.status);
  console.log('Headers:', Object.fromEntries(res.headers.entries()));
  const text = await res.text();
  console.log('Response (first 500 chars):', text.substring(0, 500));
}

testHeaders();
