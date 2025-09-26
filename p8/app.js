const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const counterFile = path.join(__dirname, 'counter.json');

app.use(bodyParser.json());
app.use(express.static('public'));

// Read count from file
const getCount = () => {
  if (!fs.existsSync(counterFile)) return 0;
  const data = fs.readFileSync(counterFile);
  return JSON.parse(data).count;
};

// Write count to file
const setCount = (count) => {
  fs.writeFileSync(counterFile, JSON.stringify({ count }));
};

// API routes
app.get('/api/count', (req, res) => {
  res.json({ count: getCount() });
});

app.post('/api/increment', (req, res) => {
  const count = getCount() + 1;
  setCount(count);
  res.json({ count });
});

app.post('/api/decrement', (req, res) => {
  let count = getCount();
  if (count > 0) {
    count--;
  }
  setCount(count);
  res.json({ count });
});

app.post('/api/reset', (req, res) => {
  setCount(0);
  res.json({ count: 0 });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
