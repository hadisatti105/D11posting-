document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('pingForm');
  const responseBox = document.getElementById('responseBox');

  // 🔒 Hardcoded values
  const campaignId = '679166ed7181b';
  const campaignKey = '6FtjKx9b4QJDL8VMXNrm';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const callerId = document.getElementById('callerId').value.trim();

    if (!callerId) {
      showResponse('❌ Caller ID is required.', false);
      return;
    }

    const payload = new URLSearchParams();
    payload.append('lp_campaign_id', campaignId);
    payload.append('lp_campaign_key', campaignKey);
    payload.append('caller_id', callerId);

    try {
      const res = await fetch('/api/ping', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
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
