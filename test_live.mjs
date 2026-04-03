async function test() {
  try {
    const res = await fetch('https://sgtradingcard.onrender.com/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: [{id: 1, title: 'Test', qty: 1, price: '$10.00'}],
        shipping: { name: 'Test', email: 'test@example.com' },
        platformShipping: 0,
        sellerShipping: 0
      })
    });
    const text = await res.text();
    console.log('STATUS:', res.status);
    console.log('RESPONSE TEXT:', text);
  } catch(e) {
    console.log('ERROR:', e.message);
  }
}
test();
