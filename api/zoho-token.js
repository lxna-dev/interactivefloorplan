export default async function handler(req, res) {
  const CLIENT_ID = "1000.STJU7BGXGZLLC25TFXJNFPVULA62KD";
  const CLIENT_SECRET = "f530306ab0be6a03f3f9f05b622f806d09b577ea7b";
  const REFRESH_TOKEN =
    "1000.87070d32af067f584587414d71ce2409.afbd569784e2a24bfdc94e08daff6feb";
  // old "1000.77ccce891d8d2dad76ce87ceeea2bd23.39df35043a5a2f9dbbbbc42c432a2e7e";

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
