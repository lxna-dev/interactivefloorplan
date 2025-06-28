export default async function handler(req, res) {
  const CLIENT_ID = "YOUR_CLIENT_ID";
  const CLIENT_SECRET = "YOUR_CLIENT_SECRET";
  const REFRESH_TOKEN = "YOUR_REFRESH_TOKEN";

  const body = new URLSearchParams({
    refresh_token: REFRESH_TOKEN,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    grant_type: "refresh_token",
  });

  const response = await fetch("https://accounts.zoho.com/oauth/v2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  const data = await response.json();

  if (data.access_token) {
    res.status(200).json({ token: data.access_token });
  } else {
    res.status(500).json({ error: "Failed to get token", details: data });
  }
}
