const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const MY_GMAIL = process.env.MY_GMAIL;
const MY_GMAIL_PASSWORD = process.env.MY_GMAIL_PASSWORD;

const app = express();

app.use(cors());
app.use(express.json());  // Add this if you're expecting to receive JSON payload from the frontend

app.post('/sendMessage', async (req, res) => {
    const { name, email, message, subject } = req.body;  // Added subject here

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: MY_GMAIL,
            pass: MY_GMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: email,
        to: MY_GMAIL,
        subject: `Message from Portfolio - ${name} - ${subject}`,
        text: `Email: ${email}\n\nName: ${name}\n\nMessage: ${message}`
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to send email');
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).send('Service is up and running');
});


app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
});
