import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import Stripe from 'stripe';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { google } from 'googleapis';
import nodemailer from 'nodemailer';

// ─── Email Transporter ───
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendStoreEmail = async (to, subject, html) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn(`⚠️ Skipping Email: Missing EMAIL_USER or EMAIL_PASS in .env. Would have sent "${subject}" to ${to}.`);
    return;
  }
  try {
    await transporter.sendMail({
      from: `"S&G Trading" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html
    });
    console.log(`✉️ Email sent to ${to}: "${subject}"`);
  } catch (err) {
    console.error(`Failed to send email to ${to}:`, err);
  }
};
// ─── Google Shopping Content API ───
let contentApi = null;
try {
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS && process.env.MERCHANT_ID) {
    const auth = new google.auth.GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/content']
    });
    contentApi = google.content({ version: 'v2.1', auth });
    console.log('✅ Google Content API initialized successfully.');
  } else {
    console.warn('⚠️ Google Content API skipping initialization: Missing credentials.');
  }
} catch (err) {
  console.error('Failed to initialize Google Content API:', err.message);
}

// Helper to instantly push inventory updates
async function syncGoogleProduct(product) {
  if (!contentApi || !process.env.MERCHANT_ID) return;
  try {
    const cleanDesc = (product.description || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const cleanTitle = (product.title || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const link = `https://sgtradingcard.com/?product=${product.id}`;
    const imgUrl = product.imgUrl && product.imgUrl.startsWith('http') ? product.imgUrl : `https://sgtradingcard.com${product.imgUrl}`;
    const condition = product.condition ? (product.condition.toLowerCase().includes('10') || product.condition.toLowerCase().includes('mint') ? 'new' : 'used') : 'new';
    
    // Parse shippingWeight (e.g. "1.6 lb")
    let parsedWeight = null;
    if (product.shippingWeight) {
      const parts = product.shippingWeight.trim().split(' ');
      if (parts.length === 2 && !isNaN(parseFloat(parts[0]))) {
         parsedWeight = { value: parseFloat(parts[0]), unit: parts[1].toLowerCase() };
      }
    }
    
    const requestBody = {
        offerId: product.id.toString(),
        title: cleanTitle,
        description: cleanDesc,
        link: link,
        imageLink: imgUrl,
        contentLanguage: 'en',
        targetCountry: 'US',
        channel: 'online',
        availability: product.soldOut ? 'out of stock' : 'in stock',
        condition: condition,
        price: {
          value: product.price ? product.price.replace('$', '') : '0.00',
          currency: 'USD'
        },
        brand: 'S&G Trading',
        identifierExists: false
      };
      
      if (parsedWeight) {
        requestBody.shippingWeight = parsedWeight;
      }
    
    await contentApi.products.insert({
      merchantId: process.env.MERCHANT_ID,
      requestBody
    });
    console.log(`📦 Synced Google Merchant Center for product ${product.id} -> ${product.soldOut ? 'OUT OF STOCK' : 'IN STOCK'}`);
  } catch (err) {
    console.error(`Failed to sync Google product ${product.id}:`, err.message);
  }
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const app = express();
const PRODUCTS_FILE = path.join(__dirname, 'data', 'products.json');
const SETS_FILE = path.join(__dirname, 'data', 'sets.json');
const USERS_FILE = path.join(__dirname, 'data', 'users.json');
const SHIPPING_PRESETS_FILE = path.join(__dirname, 'data', 'shipping_presets.json');
const ORDERS_FILE = path.join(__dirname, 'data', 'orders.json');

import shippoPkg from 'shippo';
const shippo = shippoPkg(process.env.SHIPPO_API_KEY || '');

app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:5174', 'https://sg-tradingcard-9relg96s6-sgtradingcards-projects.vercel.app', 'https://sg-tradingcard.vercel.app', 'https://sgtradingcard.com', 'https://www.sgtradingcard.com'] }));
app.use(express.json({ limit: '50mb' }));

// ─── Helpers ───
function readJSON(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function writeJSON(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// ─── Auth Middleware ───
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// ─── Auth Routes ───
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  const expectedUser = (process.env.ADMIN_USERNAME || 'sgadmin').trim();
  const expectedPass = (process.env.ADMIN_PASSWORD || 'Money7989').trim();

  if (username === expectedUser && password === expectedPass) {
    const token = jwt.sign({ username, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, username });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.post('/api/register', async (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) return res.status(400).json({ error: 'Missing required fields' });
  
  if (!fs.existsSync(USERS_FILE)) writeJSON(USERS_FILE, []);
  const users = readJSON(USERS_FILE);
  if (users.find(u => u.username === username || u.email === email)) {
    return res.status(400).json({ error: 'Username or email already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: Date.now().toString(),
    username,
    email,
    password: hashedPassword,
    role: 'seller'
  };
  
  users.push(newUser);
  writeJSON(USERS_FILE, users);
  
  const token = jwt.sign({ username: newUser.username, role: newUser.role, id: newUser.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { username: newUser.username, email: newUser.email, role: newUser.role, id: newUser.id } });
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  if (!fs.existsSync(USERS_FILE)) writeJSON(USERS_FILE, []);
  const users = readJSON(USERS_FILE);
  const user = users.find(u => u.username === username);
  
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ username: user.username, role: user.role, id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { username: user.username, email: user.email, role: user.role, id: user.id } });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.get('/api/admin/verify', authMiddleware, (req, res) => {
  res.json({ valid: true, username: req.user.username });
});

// ─── Public Product Routes ───
app.get('/api/products', (req, res) => {
  const products = readJSON(PRODUCTS_FILE);
  res.json(products);
});

app.get('/api/sets', (req, res) => {
  const sets = readJSON(SETS_FILE);
  res.json(sets);
});

// ─── Admin Category/Set Routes ───
app.post('/api/admin/upload-image', authMiddleware, (req, res) => {
  try {
    const { image } = req.body;
    if (!image) return res.status(400).json({ error: 'No image provided' });

    const matches = image.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return res.status(400).json({ error: 'Invalid base64 format' });
    }

    const type = matches[1];
    const data = Buffer.from(matches[2], 'base64');
    let ext = type.split('/')[1] || 'png';
    if (ext === 'jpeg') ext = 'jpg';
    
    const fileName = `upload_${Date.now()}.${ext}`;
    const imagesDir = path.join(__dirname, 'public', 'images');
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true });
    }
    
    const targetPath = path.join(imagesDir, fileName);
    fs.writeFileSync(targetPath, data);

    res.json({ url: `/images/${fileName}` });
  } catch (err) {
    console.error('Upload Error:', err);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

app.post('/api/admin/sets', authMiddleware, (req, res) => {
  try {
    const { name, imgUrl, color, parent = 'all-pokemon' } = req.body;
    if (!name) return res.status(400).json({ error: 'Missing name' });

    let sets = readJSON(SETS_FILE);
    const generatedId = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    if (sets.find(s => s.id === generatedId)) {
      return res.status(400).json({ error: 'Category with this name already exists' });
    }

    const newSet = {
      id: generatedId,
      parent,
      name,
      imgUrl: imgUrl || '',
      bannerUrl: imgUrl || '',
      color: color || '#E3350D'
    };
    
    sets.push(newSet);
    writeJSON(SETS_FILE, sets);
    res.json(newSet);
  } catch (err) {
    console.error('Sets Error:', err);
    res.status(500).json({ error: 'Failed to create category' });
  }
});

// ─── Admin Product Routes ───
app.put('/api/admin/products/:id', authMiddleware, (req, res) => {
  const products = readJSON(PRODUCTS_FILE);
  const idx = products.findIndex(p => p.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Product not found' });
  products[idx] = { ...products[idx], ...req.body, id: products[idx].id };
  writeJSON(PRODUCTS_FILE, products);
  res.json(products[idx]);
});

app.post('/api/admin/products', authMiddleware, (req, res) => {
  const products = readJSON(PRODUCTS_FILE);
  const maxId = products.reduce((max, p) => Math.max(max, p.id), 0);
  const newProduct = { id: maxId + 1, ...req.body };
  products.push(newProduct);
  writeJSON(PRODUCTS_FILE, products);
  res.json(newProduct);
});

app.delete('/api/admin/products/:id', authMiddleware, (req, res) => {
  let products = readJSON(PRODUCTS_FILE);
  products = products.filter(p => p.id !== parseInt(req.params.id));
  writeJSON(PRODUCTS_FILE, products);
  res.json({ success: true });
});

app.patch('/api/admin/products/:id/toggle-stock', authMiddleware, (req, res) => {
  const products = readJSON(PRODUCTS_FILE);
  const idx = products.findIndex(p => p.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Product not found' });
  products[idx].soldOut = !products[idx].soldOut;
  writeJSON(PRODUCTS_FILE, products);
  res.json(products[idx]);
});

// ─── Admin Shipping Presets ───
app.get('/api/admin/shipping-presets', authMiddleware, (req, res) => {
  if (!fs.existsSync(SHIPPING_PRESETS_FILE)) writeJSON(SHIPPING_PRESETS_FILE, []);
  res.json(readJSON(SHIPPING_PRESETS_FILE));
});

app.post('/api/admin/shipping-presets', authMiddleware, (req, res) => {
  const { name, length, width, height, weight } = req.body;
  if (!name || !length || !width || !height || !weight) {
    return res.status(400).json({ error: 'Missing required dimension values' });
  }

  if (!fs.existsSync(SHIPPING_PRESETS_FILE)) writeJSON(SHIPPING_PRESETS_FILE, []);
  const presets = readJSON(SHIPPING_PRESETS_FILE);
  
  const newPreset = {
    id: `preset_${Date.now()}`,
    name,
    length: parseFloat(length),
    width: parseFloat(width),
    height: parseFloat(height),
    weight: parseFloat(weight)
  };
  
  presets.push(newPreset);
  writeJSON(SHIPPING_PRESETS_FILE, presets);
  res.json(newPreset);
});

app.delete('/api/admin/shipping-presets/:id', authMiddleware, (req, res) => {
  if (!fs.existsSync(SHIPPING_PRESETS_FILE)) return res.json({ success: true });
  let presets = readJSON(SHIPPING_PRESETS_FILE);
  presets = presets.filter(p => p.id !== req.params.id);
  writeJSON(SHIPPING_PRESETS_FILE, presets);
  res.json({ success: true });
});

// ─── Shippo Shipping Integration ───
app.post('/api/shipments/quote', authMiddleware, async (req, res) => {
  try {
    const { toAddress, parcel } = req.body;
    
    // We statically define the S&G Trading origin point
    const addressFrom = {
      name: 'S&G Trading',
      company: 'S&G Trading',
      street1: '123 Pokemon Way',
      city: 'Austin',
      state: 'TX',
      zip: '78701',
      country: 'US',
      phone: '+1 555 341 9393',
      email: 'admin@sgtrading.com',
    };

    // The destination address supplied by the UI based on the Buyer's details
    const addressTo = {
      name: toAddress.name,
      street1: toAddress.street1 || toAddress.address || '',
      street2: toAddress.street2 || '',
      city: toAddress.city,
      state: toAddress.state,
      zip: toAddress.zip,
      country: 'US',
    };

    // Construct the package based on the Admin's custom or preset dimensions
    const shipmentParcel = {
      length: parcel.length.toString(),
      width: parcel.width.toString(),
      height: parcel.height.toString(),
      distance_unit: 'in',
      weight: parcel.weight.toString(),
      mass_unit: 'oz',
    };

    // Ask Shippo for rate quotes utilizing our active sandbox token
    const shipment = await shippo.shipment.create({
      address_from: addressFrom,
      address_to: addressTo,
      parcels: [shipmentParcel],
      async: false
    });

    // We respond with the list of rates (USPS Priority, Ground, etc.)
    res.json({ rates: shipment.rates, shipmentId: shipment.objectId });

  } catch (err) {
    console.error('Shippo Quoting Error:', err);
    res.status(500).json({ error: 'Failed to fetch shipping rates.' });
  }
});

app.post('/api/shipments/label', authMiddleware, async (req, res) => {
  try {
    const { rateId, orderId } = req.body;
    console.log('Label Purchase Request:', JSON.stringify({ rateId, orderId }));
    
    if (!rateId) {
      return res.status(400).json({ error: 'Missing rateId in request body' });
    }
    
    // Use the Shippo REST API directly instead of the legacy SDK
    const shippoRes = await fetch('https://api.goshippo.com/transactions/', {
      method: 'POST',
      headers: {
        'Authorization': `ShippoToken ${process.env.SHIPPO_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        rate: rateId,
        label_file_type: 'PDF',
        async: false
      })
    });
    
    const transaction = await shippoRes.json();
    console.log('Shippo Transaction FULL Response:', JSON.stringify(transaction));

    if (!shippoRes.ok || transaction.status === 'ERROR') {
      const errorMsg = transaction.messages?.[0]?.text || transaction.detail || JSON.stringify(transaction);
      return res.status(400).json({ error: errorMsg });
    }

    // Persist tracking details to the Order database
    if (!fs.existsSync(ORDERS_FILE)) writeJSON(ORDERS_FILE, []);
    const orders = readJSON(ORDERS_FILE);
    const orderIndex = orders.findIndex(o => o.id === orderId);
    
    if (orderIndex !== -1) {
      orders[orderIndex].status = 'fulfilled';
      orders[orderIndex].trackingNumber = transaction.tracking_number;
      orders[orderIndex].trackingUrl = transaction.tracking_url_provider;
      writeJSON(ORDERS_FILE, orders);
      
      // Dispatch Shipping Notification Email!
      const order = orders[orderIndex];
      const buyerEmail = order.shippingAddress.email;
      if (buyerEmail) {
        sendStoreEmail(
          buyerEmail,
          `Your S&G Trading Order #${order.id} Has Shipped!`,
          `<div style="font-family: sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #000;">Great news, ${order.shippingAddress.name}!</h2>
            <p>Your S&G Trading order is packed and on its way.</p>
            <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <strong>Tracking Number:</strong> ${transaction.tracking_number} <br/>
              <strong>Carrier:</strong> USPS <br/>
              <br/>
              <a href="${transaction.tracking_url_provider}" style="background: #000; color: #fff; padding: 10px 15px; text-decoration: none; border-radius: 4px; display: inline-block;">Track Package Here</a>
            </div>
            <p>Thank you again for supporting S&G Trading. We appreciate your business!</p>
          </div>`
        );
      }
    }

    // Return the successful label payload
    res.json({
      trackingNumber: transaction.tracking_number,
      trackingUrl: transaction.tracking_url_provider,
      labelUrl: transaction.label_url,
      transactionId: transaction.object_id
    });

  } catch (err) {
    console.error('Shippo Label Error:', err);
    res.status(500).json({ 
      error: `Label purchase failed: ${err.message || 'Unknown error'}`,
      type: err.type || 'unknown'
    });
  }
});

// ─── Admin Orders Interface ───
app.get('/api/admin/orders', authMiddleware, (req, res) => {
  if (!fs.existsSync(ORDERS_FILE)) writeJSON(ORDERS_FILE, []);
  res.json(readJSON(ORDERS_FILE));
});

// ─── Seller Interface (The Grand Exchange) ───
app.get('/api/seller/products', authMiddleware, (req, res) => {
  const products = readJSON(PRODUCTS_FILE);
  const sellerProducts = products.filter(p => p.sellerId === req.user.id);
  res.json(sellerProducts);
});

app.post('/api/seller/products', authMiddleware, (req, res) => {
  const products = readJSON(PRODUCTS_FILE);
  const maxId = products.reduce((max, p) => Math.max(max, p.id), 0);
  const newProduct = { 
    id: maxId + 1, 
    ...req.body, 
    sellerId: req.user.id, 
    sellerName: req.user.username 
  };
  products.push(newProduct);
  writeJSON(PRODUCTS_FILE, products);
  res.json(newProduct);
});

app.delete('/api/seller/products/:id', authMiddleware, (req, res) => {
  let products = readJSON(PRODUCTS_FILE);
  const idx = products.findIndex(p => p.id === parseInt(req.params.id) && p.sellerId === req.user.id);
  if (idx === -1) return res.status(403).json({ error: 'Unauthorized' });
  
  products.splice(idx, 1);
  writeJSON(PRODUCTS_FILE, products);
  res.json({ success: true });
});

// ─── Stripe Connect Onboarding ───
app.post('/api/seller/onboard', authMiddleware, async (req, res) => {
  try {
    const users = readJSON(USERS_FILE);
    const userIndex = users.findIndex(u => u.id === req.user.id);
    let user = users[userIndex];
    
    if (!user.stripeAccountId) {
      const account = await stripe.accounts.create({
        type: 'express',
        email: user.email,
        capabilities: {
          card_payments: { requested: true },
          transfers: { requested: true }
        }
      });
      user.stripeAccountId = account.id;
      writeJSON(USERS_FILE, users);
    }

    const accountLink = await stripe.accountLinks.create({
      account: user.stripeAccountId,
      refresh_url: 'https://sg-tradingcard.vercel.app/#dashboard',
      return_url: 'https://sg-tradingcard.vercel.app/#dashboard',
      type: 'account_onboarding'
    });

    res.json({ url: accountLink.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/seller/onboard-status', authMiddleware, async (req, res) => {
  try {
    const users = readJSON(USERS_FILE);
    const user = users.find(u => u.id === req.user.id);
    
    if (!user || !user.stripeAccountId) {
      return res.json({ charges_enabled: false });
    }

    const account = await stripe.accounts.retrieve(user.stripeAccountId);
    if (account.charges_enabled !== user.charges_enabled) {
      user.charges_enabled = account.charges_enabled;
      writeJSON(USERS_FILE, users);
    }
    
    res.json({ charges_enabled: account.charges_enabled });
  } catch (err) {
    // If testing without real stripe keys, fail gracefully for now
    res.json({ charges_enabled: false, error: err.message });
  }
});

// ─── Stripe Checkout Payment ───
app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { items, shipping, platformShipping = 0, sellerShipping = 0 } = req.body;
    
    // Check if handling a Peer-to-Peer marketplace cart
    const isSellerCart = items.length > 0 && !!items[0].sellerId;

    const subtotal = items.reduce((sum, item) => {
      const price = parseFloat(item.price.replace('$', ''));
      return sum + price * item.qty;
    }, 0);

    const amount = isSellerCart ? 
      Math.round((subtotal + sellerShipping) * 100) : 
      Math.round((subtotal + platformShipping) * 100);

    if (amount <= 0) return res.status(400).json({ error: 'Invalid cart amount' });

    const intentPayload = {
      amount,
      currency: 'usd',
      metadata: {
        customerName: shipping.name,
        customerEmail: shipping.email,
        itemCount: items.length.toString(),
        itemSummary: items.map(i => `${i.title} x${i.qty}`).join(', ').substring(0, 500)
      },
      receipt_email: shipping.email,
    };

    // Apply the 5.5% Split for Peer-to-Peer Checkouts
    if (isSellerCart) {
      const sellerId = items[0].sellerId;
      const users = readJSON(USERS_FILE);
      const seller = users.find(u => u.id === sellerId);
      
      if (seller && seller.stripeAccountId) {
         // The platform skim (5.5% of total value)
         const platformFee = Math.round(amount * 0.055); 
         intentPayload.application_fee_amount = platformFee;
         intentPayload.transfer_data = {
           destination: seller.stripeAccountId
         };
      } else {
         return res.status(400).json({ error: 'Seller has not completely connected a valid Stripe account.'});
      }
    }

    const paymentIntent = await stripe.paymentIntents.create(intentPayload);

    // Persist the order data so the Admin can fulfill it later
    if (!fs.existsSync(ORDERS_FILE)) writeJSON(ORDERS_FILE, []);
    const orders = readJSON(ORDERS_FILE);
    
    const newOrder = {
      id: `ord_${Date.now()}`,
      date: new Date().toISOString(),
      status: 'unfulfilled',
      shippingAddress: shipping,
      items: items.map(i => ({ id: i.id, title: i.title, qty: i.qty, price: i.price })),
      totalAmount: amount / 100,
      stripePaymentIntentId: paymentIntent.id
    };
    
    orders.push(newOrder);
    writeJSON(ORDERS_FILE, orders);

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error('Stripe error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/orders/confirm', (req, res) => {
  try {
    const { items } = req.body;
    if (!fs.existsSync(PRODUCTS_FILE)) return res.json({ success: false });
    
    let products = readJSON(PRODUCTS_FILE);
    let updated = false;

    (items || []).forEach(item => {
      const idx = products.findIndex(p => p.id === item.id);
      if (idx !== -1 && products[idx].stock !== undefined) {
        products[idx].stock = Math.max(0, products[idx].stock - item.qty);
        if (products[idx].stock === 0) products[idx].soldOut = true;
        updated = true;
        
        // PING GOOGLE CONTENT API instantly in background
        syncGoogleProduct(products[idx]).catch(console.error);
      }
    });

    if (updated) {
      writeJSON(PRODUCTS_FILE, products);
    }
    
    // Attempt to find the full order to send a receipt
    const { orderId } = req.body;
    let buyerEmail = null;
    let orderContext = null;
    if (orderId && fs.existsSync(ORDERS_FILE)) {
      const orders = readJSON(ORDERS_FILE);
      orderContext = orders.find(o => o.id === orderId || o.stripePaymentIntentId === orderId);
      if (orderContext && orderContext.shippingAddress) {
        buyerEmail = orderContext.shippingAddress.email;
      }
    }

    if (buyerEmail && orderContext) {
      sendStoreEmail(
        buyerEmail,
        `Order Confirmed! Receipt for #${orderContext.id}`,
        `<div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #000;">Thank you for your order, ${orderContext.shippingAddress.name}!</h2>
          <p>We've received your order and are getting it ready to ship context. You'll receive another email with tracking info soon.</p>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3>Order Summary - #${orderContext.id}</h3>
            <ul style="list-style: none; padding: 0;">
              ${orderContext.items.map(item => `
                <li style="padding: 8px 0; border-bottom: 1px solid #eee;">
                  <strong>${item.title}</strong> x${item.qty} - ${item.price}
                </li>
              `).join('')}
            </ul>
            <h3 style="text-align: right; margin-top: 15px;">Total Paid: $${(orderContext.totalAmount || 0).toFixed(2)}</h3>
          </div>
          <p>Thank you for shopping with S&G Trading!</p>
        </div>`
      );
    }

    res.json({ success: true, updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`\n  💳 S&G Trading Server running on http://localhost:${PORT}`);
  console.log(`  📦 Products: ${PRODUCTS_FILE}`);
  console.log(`  🔐 Admin: POST /api/admin/login\n`);
});
