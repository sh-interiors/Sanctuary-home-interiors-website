const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5148; // change if needed

// Serve static files (adjust folder name if not "harry")
app.use(express.static(path.join(__dirname, 'harry')));

// Parse form data & JSON
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // <-- added

// Contact form endpoint
app.post('/contact', async (req, res) => {
  const { user_name, user_email, mobile, message } = req.body;

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

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Thank you! Your message has been sent.' }); // <-- return JSON
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Sorry, there was an error sending your message. Please try again.' }); // <-- return JSON
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

