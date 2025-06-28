export default async function handler(req, res) {
  try {
    const tokenRes = await fetch(
      `${
        process.env.BASE_URL || "https://interactivefloorplan.vercel.app"
      }/api/zoho-token`
    );
    const tokenData = await tokenRes.json();

    if (!tokenData.token) {
      return res.status(500).json({ error: "Failed to get Zoho token" });
    }

    const accessToken = tokenData.token;

    const zohoRes = await fetch(
      "https://creator.zoho.com/api/v2/mobaha_baytiraqi/interactive-floor-plan/report/Properties_List",
      {
        headers: {
          Authorization: `Zoho-oauthtoken ${accessToken}`,
        },
      }
    );

    const data = await zohoRes.json();

    if (data.code !== 3000 && !data.data) {
      return res.status(500).json({ error: "Zoho API error", details: data });
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Server error", message: err.message });
  }
}
