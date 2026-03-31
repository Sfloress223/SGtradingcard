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

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const app = express();
const PRODUCTS_FILE = path.join(__dirname, 'data', 'products.json');
const SETS_FILE = path.join(__dirname, 'data', 'sets.json');
const USERS_FILE = path.join(__dirname, 'data', 'users.json');

app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:5174', 'https://sg-tradingcard-9relg96s6-sgtradingcards-projects.vercel.app', 'https://sg-tradingcard.vercel.app'] }));
app.use(express.json());

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
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
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

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error('Stripe error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`\n  💳 S&G Trading Server running on http://localhost:${PORT}`);
  console.log(`  📦 Products: ${PRODUCTS_FILE}`);
  console.log(`  🔐 Admin: POST /api/admin/login\n`);
});
