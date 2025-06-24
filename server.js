const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('node-fetch'); // v2 only

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (index.html, script.js, style.css) from /public
app.use(express.static('public'));

// POST /api/ping → Proxy request to EDM
app.post('/api/ping', async (req, res) => {
  try {
    const edmURL = 'https://track.edmleadnetwork.com/call-preping.do';

    const edmResponse = await fetch(edmURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(req.body),
    });

    const result = await edmResponse.json();
    console.log('✅ [PING] Response:', result);
    res.json(result);
  } catch (err) {
    console.error('❌ [PING] Error:', err.message);
    res.status(500).json({ success: false, message: 'Proxy error: could not ping EDM' });
  }
});

// Health check route (optional)
app.get('/health', (req, res) => {
  res.send('✅ Proxy server is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
