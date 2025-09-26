const countEl = document.getElementById('count');
const incrementBtn = document.getElementById('increment');
const decrementBtn = document.getElementById('decrement');
const resetBtn = document.getElementById('reset');

const updateCount = async () => {
  const res = await fetch('/api/count');
  const data = await res.json();
  countEl.textContent = data.count;
};

incrementBtn.onclick = async () => {
  const res = await fetch('/api/increment', { method: 'POST' });
  const data = await res.json();
  countEl.textContent = data.count;
};

decrementBtn.onclick = async () => {
  const res = await fetch('/api/decrement', { method: 'POST' });
  const data = await res.json();
  countEl.textContent = data.count;
};

resetBtn.onclick = async () => {
  const res = await fetch('/api/reset', { method: 'POST' });
  const data = await res.json();
  countEl.textContent = data.count;
};

updateCount(); // Load initial count
