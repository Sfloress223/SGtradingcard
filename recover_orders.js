import 'dotenv/config';
import Stripe from 'stripe';
import fs from 'fs';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const ORDERS_FILE = './data/orders.json';

async function recover() {
  const intents = await stripe.paymentIntents.list({ limit: 50 });
  const orders = JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf8'));
  const existingIds = new Set(orders.map(o => o.stripePaymentIntentId));
  
  let recovered = 0;
  for (const intent of intents.data) {
    if (intent.status === 'succeeded' && !existingIds.has(intent.id)) {
      console.log('Found missing successful payment!', intent.id);
      
      const newOrder = {
        id: `ord_${intent.created * 1000}`,
        date: new Date(intent.created * 1000).toISOString(),
        status: 'paid',
        shippingAddress: {
          name: intent.shipping?.name || intent.metadata.customerName || 'Unknown',
          email: intent.receipt_email || intent.metadata.customerEmail || '',
          phone: intent.shipping?.phone || '',
          street1: intent.shipping?.address?.line1 || '',
          street2: intent.shipping?.address?.line2 || '',
          city: intent.shipping?.address?.city || '',
          state: intent.shipping?.address?.state || '',
          zip: intent.shipping?.address?.postal_code || ''
        },
        items: [{ title: intent.metadata.itemSummary || 'Recovered Items', qty: parseInt(intent.metadata.itemCount || 1), price: `$${(intent.amount / 100).toFixed(2)}` }],
        totalAmount: intent.amount / 100,
        platformFeeUsd: 0,
        platformFeePercentage: 0,
        stripePaymentIntentId: intent.id,
        paymentConfirmed: true
      };
      orders.push(newOrder);
      recovered++;
    }
  }
  
  if (recovered > 0) {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
    console.log(`Recovered ${recovered} orders!`);
  } else {
    console.log('No missing successful orders found in Stripe.');
  }
}

recover().catch(console.error);
