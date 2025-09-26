// app.js
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// --- Middleware ---
app.use(express.urlencoded({ extended: false, limit: '1mb' })); // parse form POST
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/**
 * Parse and sanitize a user input string into a number.
 * Accepts things like "1,234.56" or "$1234" and strips commas/currency,
 * then converts to Number. Returns NaN if invalid.
 */
function parseIncome(value) {
  if (typeof value !== 'string') return NaN;
  const cleaned = value.trim().replace(/,/g, '').replace(/[^\d.-]/g, '');
  // disallow empty or just "-" or "."
  if (!cleaned || cleaned === '-' || cleaned === '.' || cleaned === '-.') return NaN;
  const num = Number(cleaned);
  return Number.isFinite(num) ? num : NaN;
}

// --- Routes ---
app.get('/', (req, res) => {
  res.render('form', { error: null, values: { income1: '', income2: '' } });
});

app.post('/calculate', (req, res) => {
  // raw values from form
  const raw1 = req.body.income1 ?? '';
  const raw2 = req.body.income2 ?? '';

  // server-side parsing & validation
  const income1 = parseIncome(raw1);
  const income2 = parseIncome(raw2);

  const errors = [];
  if (Number.isNaN(income1) || income1 < 0) errors.push('Income Source 1 must be a non-negative number.');
  if (Number.isNaN(income2) || income2 < 0) errors.push('Income Source 2 must be a non-negative number.');

  if (errors.length) {
    return res.status(400).render('form', {
      error: errors.join(' '),
      values: { income1: raw1, income2: raw2 }
    });
  }

  const total = income1 + income2;

  // render the result view (server-side calculation)
  res.render('result', {
    income1,
    income2,
    total
  });
});

// Start
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
