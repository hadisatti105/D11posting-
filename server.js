const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('node-fetch'); // Use v2, not v3+

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS and body parsing
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static frontend files from the 'public' folder
app.use(express.static('public'));

// POST /api/ping → For pinging EDM
app.post('/api/ping', async (req, res) => {
  try {
    console.log('🔁 [PING] Payload:', req.body);

    const response = await fetch('https://track.edmleadnetwork.com/call-preping.do', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(req.body),
    });

    const result = await response.json();
    console.log('✅ [PING] Response:', result);
    res.json(result);
  } catch (err) {
    console.error('❌ [PING] Error:', err.message);
    res.status(500).json({ success: false, message: 'Proxy error: could not ping EDM' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
