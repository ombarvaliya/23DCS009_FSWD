import React, { useState } from 'react';

function CounterApp() {
  const [count, setCount] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  const reset = () => setCount(0);
  const incrementFive = () => setCount(prev => prev + 5);

  return (
    <div style={{ textAlign: 'center', padding: '30px', fontFamily: 'Arial' }}>
      <h1>Count: {count}</h1>
      <div>
        <button onClick={reset}>Reset</button>
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
        <button onClick={incrementFive}>Increment 5</button>
      </div>

      <h1 style={{ marginTop: '40px' }}>Welcome to CHARUSAT!!!</h1>

      <div style={{ marginTop: '20px' }}>
        <label>
          First Name: 
          <input
            type="text"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            style={{ marginLeft: '10px' }}
          />
        </label>
        <br /><br />
        <label>
          Last Name: 
          <input
            type="text"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            style={{ marginLeft: '10px' }}
          />
        </label>
      </div>

      <div style={{ marginTop: '30px' }}>
        <p><strong>First Name:</strong> {firstName}</p>
        <p><strong>Last Name:</strong> {lastName}</p>
      </div>
    </div>
  );
}

export default CounterApp;
