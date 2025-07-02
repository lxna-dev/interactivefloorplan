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

    let allData = [];
    let hasMore = true;
    let offset = 0;

    while (hasMore) {
      const url = `https://creator.zoho.com/api/v2.1/mobaha_baytiraqi/interactive-floor-plan/report/Properties_List?max_records=1000&offset=${offset}`;

      const zohoRes = await fetch(url, {
        headers: {
          Authorization: `Zoho-oauthtoken ${accessToken}`,
        },
      });

      const data = await zohoRes.json();

      if (data.code !== 3000 || !data.data) {
        return res.status(500).json({ error: "Zoho API error", details: data });
      }

      allData.push(...data.data);

      if (data.data.length < 1000) {
        hasMore = false;
      } else {
        offset += 1000;
      }
    }

    res.status(200).json({ code: 3000, data: allData });
  } catch (err) {
    res.status(500).json({ error: "Server error", message: err.message });
  }
}
