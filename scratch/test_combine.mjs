import jwt from 'jsonwebtoken';

async function testCombine() {
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
  const data = await res.json();
  console.log('Combine response data:', JSON.stringify(data, null, 2));

  console.log('\nFetching orders list after combine...');
  const listRes = await fetch('https://sgtradingcard.onrender.com/api/admin/orders', { headers });
  const listData = await listRes.json();
  console.log('Orders in list:', listData.map(o => ({ id: o.id, isCombined: o.isCombined, items: o.items.length })));
}

testCombine();
