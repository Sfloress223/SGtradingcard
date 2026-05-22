import jwt from 'jsonwebtoken';

async function checkOrders() {
  const token = jwt.sign({ username: 'sgadmin', role: 'admin' }, 'sg_live_7x9B2mQ4pL1vW8cR5nK3jH9f', { expiresIn: '1h' });

  const res = await fetch('https://sgtradingcard.onrender.com/api/admin/orders', {
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
  });
  
  const text = await res.text();
  console.log('STATUS:', res.status);
  console.log('RAW BODY:', text);
}
checkOrders();
