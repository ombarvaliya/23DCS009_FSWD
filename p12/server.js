// Simple Express server for Kid Calculator
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Serve static files from public
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine to serve HTML from view folder
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

// Home page (calculator form)
app.get('/', (req, res) => {
    res.render('calculator.html', { result: null, error: null });
});

// Handle calculation
app.post('/calculate', (req, res) => {
    const { num1, num2, operation } = req.body;
    let result = null;
    let error = null;

    // Validate input
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);
    if (isNaN(n1) || isNaN(n2)) {
        error = 'Please enter valid numbers!';
    } else {
        switch (operation) {
            case 'add':
                result = n1 + n2;
                break;
            case 'subtract':
                result = n1 - n2;
                break;
            case 'multiply':
                result = n1 * n2;
                break;
            case 'divide':
                if (n2 === 0) {
                    error = 'Cannot divide by zero!';
                } else {
                    result = n1 / n2;
                }
                break;
            default:
                error = 'Invalid operation!';
        }
    }

    res.render('calculator.html', { result, error });
});

app.listen(PORT, () => {
    console.log(`Kid Calculator server running at http://localhost:${PORT}`);
});
