const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;
    // Basic validation
    if (!name || !email || !message || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        return res.redirect('/contact?error');
    }

    // Configure NodeMailer
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_FROM,
            pass: process.env.MAIL_PASS
        }
    });

    let mailOptions = {
        from: process.env.MAIL_FROM,
        to: process.env.MAIL_FROM,
        subject: `Portfolio Contact from ${name}`,
        text: message + `\n\nFrom: ${name} <${email}>`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.redirect('/contact?success');
    } catch (err) {
        console.error('NodeMailer error:', err);
        let errorMsg = 'Failed to send message. Please check your email setup and try again.';
        res.redirect('/contact?error=' + encodeURIComponent(errorMsg));
    }
});

app.get('/', (req, res) => {
    res.redirect('/contact');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Portfolio website running on http://localhost:${PORT}`);
});
