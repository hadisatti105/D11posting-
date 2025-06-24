document.getElementById('pingForm').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const formData = new FormData(e.target);
    const payload = new URLSearchParams(formData);
  
    try {
      const response = await fetch('http://localhost:3000/api/ping', {
        method: 'POST',
        body: payload
      });
  
      const json = await response.json();
      const resultBox = document.getElementById('pingResult');
  
      if (json.success) {
        resultBox.innerHTML = `
          <div class="success">
            <p><strong>✅ Ping Accepted</strong></p>
            <p><strong>Ping ID:</strong> ${json.ping_id}</p>
            <p><strong>Payout:</strong> $${json.payout}</p>
            <p><strong>Required Duration:</strong> ${json.duration} seconds</p>
            <p><strong>Transfer Number:</strong> <a href="tel:${json.number}">${json.number}</a></p>
          </div>
        `;
      } else {
        resultBox.innerHTML = `<p class="error">❌ Ping Rejected: ${json.message}</p>`;
      }
    } catch (err) {
      document.getElementById('pingResult').innerHTML =
        `<p class="error">❌ Network error. Is the proxy running?</p>`;
    }
  });
  