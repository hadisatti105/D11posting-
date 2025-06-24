const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('node-fetch'); // must be v2

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/api/ping', async (req, res) => {
  console.log('🔁 [PING] Payload:', req.body);

  try {
    const response = await fetch('https://track.edmleadnetwork.com/call-preping.do', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(req.body)
    });

    const result = await response.json();
    console.log('✅ [PING] Response:', result);
    res.json(result);
  } catch (error) {
    console.error('❌ [PING] Error:', error.message);
    res.status(500).json({ success: false, message: 'Proxy error: could not ping EDM' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Proxy server running at http://localhost:${PORT}`);
});
