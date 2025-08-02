const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5148;

// ✅ Changed this line: serve current directory instead of "harry"
app.use(express.static(path.join(__dirname)));

app.use(bodyParser.urlencoded({ extended: false }));

// ✅ NEW: Serve index.html on GET /
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Contact form endpoint
app.post('/contact', async (req, res) => {
  const { user_name, user_email, mobile, message } = req.body;

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'homeinteriorssanctuary@gmail.com',
      pass: 'drdujneoyczesitk'
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
    res.send(`<script>alert('Thank you! Your message has been sent.');window.location.href='/'</script>`);
  } catch (error) {
    res.send(`<script>alert('Sorry, there was an error sending your message. Please try again.');window.location.href='/'</script>`);
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
