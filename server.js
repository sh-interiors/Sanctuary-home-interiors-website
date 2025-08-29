const express = require('express');
const path = require('path');
const app = express();

// Serve your front-end build (adjust folder name if needed)
app.use(express.static(path.join(__dirname, 'build'))); // or 'dist'

// Example health endpoint
app.get('/api/health', (req, res) => res.json({ ok: true }));

// For SPAs: send index.html for all non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html')); // or 'dist/index.html'
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on ${port}`));
