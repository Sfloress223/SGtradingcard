import jwt from 'jsonwebtoken';

// Simulate the EXACT flow the user does in the browser
async function simulateUserFlow() {
  const token = jwt.sign({ username: 'sgadmin', role: 'admin' }, 'sg-trading-secret-key-change-me-in-production', { expiresIn: '1h' });
  const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };

  // Step 1: Get a quote (same as when user clicks "Get Live Quote")
  console.log('Step 1: Getting quote...');
  const quoteRes = await fetch('https://sgtradingcard.onrender.com/api/shipments/quote', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      toAddress: { name: 'Test Customer', street1: '123 Main St', city: 'Dallas', state: 'TX', zip: '75201', country: 'US' },
      parcel: { length: 6, width: 4, height: 0.25, weight: 1 }
    })
  });
  const quoteData = await quoteRes.json();
  console.log('Quote status:', quoteRes.status);
  console.log('Number of rates:', quoteData.rates?.length);
  
  // Filter to USPS only (same as frontend does)
  const uspsRates = quoteData.rates?.filter(r => r.provider === 'USPS') || [];
  console.log('USPS rates:', uspsRates.length);
  
  if (uspsRates.length === 0) {
    console.log('No USPS rates found!');
    console.log('All rates:', JSON.stringify(quoteData.rates?.map(r => ({ provider: r.provider, service: r.servicelevel?.name, id: r.object_id })), null, 2));
    return;
  }
  
  const selectedRate = uspsRates[0];
  console.log(`\nStep 2: Buying rate: ${selectedRate.provider} ${selectedRate.servicelevel?.name} - $${selectedRate.amount}`);
  console.log('Rate object_id:', selectedRate.object_id);
  
  // Step 2: Purchase label (same as when user clicks "Buy")
  const labelRes = await fetch('https://sgtradingcard.onrender.com/api/shipments/label', {
    method: 'POST',
    headers,
    body: JSON.stringify({ rateId: selectedRate.object_id, orderId: 'test_sim_order' })
  });
  
  const labelText = await labelRes.text();
  console.log('\nLabel purchase status:', labelRes.status);
  console.log('Label purchase response:', labelText);
}

simulateUserFlow();
