const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5148;


// Serve static files
app.use(express.static(path.join(__dirname, 'harry')));
app.use(bodyParser.urlencoded({ extended: false }));

// Contact form endpoint
app.post('/contact', async (req, res) => {
  const { user_name, user_email, mobile, message } = req.body;

  // Configure your SMTP transporter (use your real credentials)
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'homeinteriorssanctuary@gmail.com', // replace with your email
      pass: 'drdujneoyczesitk' // replace with your app password
    }
  });

  const mailOptions = {
    from: user_email,
    to: 'homeinteriorssanctuary@gmail.com', // your receiving email
    subject: `Contact Form Submission from ${user_name}`,
    text: `Name: ${user_name}\nEmail: ${user_email}\nMobile: ${mobile}\nMessage: ${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    // Redirect back with a success message (or render a thank you page)
    res.send(`<script>alert('Thank you! Your message has been sent.');window.location.href='/'</script>`);
  } catch (error) {
    res.send(`<script>alert('Sorry, there was an error sending your message. Please try again.');window.location.href='/'</script>`);
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
