const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

// Use Render's assigned PORT or default to 3000 locally
const PORT = process.env.PORT || 3000;

// ✅ Serve static files from "harry" (make sure this folder has index.html)
app.use(express.static(path.join(__dirname, 'harry')));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Contact form endpoint
app.post('/contact', async (req, res) => {
  const { user_name, user_email, mobile, message } = req.body;

  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'homeinteriorssanctuary@gmail.com', // replace with your email
        pass: 'drdujneoyczesitk' // replace with app password
      }
    });

    const mailOptions = {
      from: user_email,
      to: 'homeinteriorssanctuary@gmail.com',
      subject: `Contact Form Submission from ${user_name}`,
      text: `Name: ${user_name}\nEmail: ${user_email}\nMobile: ${mobile}\nMessage: ${message}`
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Thank you! Your message has been sent.' });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Sorry, there was an error sending your message. Please try again.' });
  }
});

// ✅ Catch-all route for SPA / frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

