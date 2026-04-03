const fetch = require('node-fetch');

async function test() {
  const res = await fetch('http://localhost:3001/api/create-payment-intent', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      items: [{id: 1, title: 'Test', qty: 1, price: '$10.00'}],
      shipping: { name: 'Test', email: 'test@example.com' },
      platformShipping: 0,
      sellerShipping: 0
    })
  });
  const data = await res.json();
  console.log(data);
}
test();
