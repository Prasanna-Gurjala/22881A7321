function shortenUrl() {
  const longUrl = document.getElementById("longUrl").value;
  if (!longUrl) return alert("Please enter a URL");

  const shortCode = Math.random().toString(36).substring(2, 8);
  const shortUrl = window.location.href.split('#')[0] + "#" + shortCode;

  const data = {
    longUrl,
    shortCode,
    createdAt: new Date().toISOString(),
    clicks: 0,
  };

  localStorage.setItem(shortCode, JSON.stringify(data));
  showShortUrl(shortUrl);
  renderLinks();
}

function showShortUrl(shortUrl) {
  const output = document.getElementById("shortUrlOutput");
  output.innerHTML = `<p>Shortened URL: <a href="${shortUrl}" target="_blank">${shortUrl}</a></p>`;
}

function handleRedirect() {
  const hash = window.location.hash.substring(1);
  if (hash) {
    const item = localStorage.getItem(hash);
    if (item) {
      const data = JSON.parse(item);
      data.clicks += 1;
      localStorage.setItem(hash, JSON.stringify(data));
      window.location.href = data.longUrl;
    }
  }
}

function renderLinks() {
  const urlList = document.getElementById("urlList");
  urlList.innerHTML = "";
  Object.keys(localStorage).forEach((key) => {
    try {
      const data = JSON.parse(localStorage.getItem(key));
      if (data && data.longUrl) {
        const div = document.createElement("div");
        div.className = "url-item";
        div.innerHTML = `
          <p><strong>Short:</strong> <a href="#${key}">${window.location.href.split('#')[0]}#${key}</a></p>
          <p><strong>Original:</strong> ${data.longUrl}</p>
          <p><strong>Clicks:</strong> ${data.clicks}</p>
          <p><strong>Created:</strong> ${new Date(data.createdAt).toLocaleString()}</p>
        `;
        urlList.appendChild(div);
      }
    } catch (e) {}
  });
}

renderLinks();
handleRedirect();