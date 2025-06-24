document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('pingForm');
  const responseBox = document.getElementById('responseBox');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form values
    const campaignId = document.getElementById('campaignId').value.trim();
    const campaignKey = document.getElementById('campaignKey').value.trim();
    const callerId = document.getElementById('callerId').value.trim();

    // Validate
    if (!campaignId || !campaignKey || !callerId) {
      showResponse('❌ All fields are required.', false);
      return;
    }

    // Prepare payload
    const payload = new URLSearchParams();
    payload.append('lp_campaign_id', campaignId);
    payload.append('lp_campaign_key', campaignKey);
    payload.append('caller_id', callerId);

    try {
      const res = await fetch('/api/ping', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: payload,
      });

      const data = await res.json();

      if (data.success) {
        showResponse(`
          ✅ <strong>Ping Accepted</strong><br>
          📞 Transfer Number: <code>${data.number}</code><br>
          💰 Payout: $${data.payout}<br>
          ⏱️ Duration: ${data.duration} seconds
        `, true);
      } else {
        showResponse(`❌ Ping Rejected: ${data.message || 'No Match'}`, false);
      }

    } catch (err) {
      console.error('❌ Network error:', err);
      showResponse('❌ Network error. Is the proxy running?', false);
    }
  });

  function showResponse(message, isSuccess) {
    responseBox.innerHTML = message;
    responseBox.style.color = isSuccess ? 'green' : 'red';
    responseBox.style.display = 'block';
  }
});
