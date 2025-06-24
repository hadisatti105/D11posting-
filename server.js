const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('node-fetch'); // use v2

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve frontend
app.use(express.static('public'));

// Ping endpoint
app.post('/api/ping', async (req, res) => {
  try {
    const response = await fetch('https://track.edmleadnetwork.com/call-preping.do', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(req.body),
    });

    const result = await response.json();
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Proxy error: could not ping EDM' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
