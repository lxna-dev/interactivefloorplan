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
    const baseUrl =
      "https://www.zohoapis.com/creator/v2.1/data/mobaha_baytiraqi/interactive-floor-plan/report/Properties_List";

    let allData = [];
    let hasMore = true;
    let cursor = null;

    while (hasMore) {
      const headers = {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
      };

      if (cursor) {
        headers["record_cursor"] = cursor;
      }

      const response = await fetch(`${baseUrl}?max_records=1000`, {
        headers,
      });

      const data = await response.json();

      if (data.code !== 3000 || !data.data) {
        return res.status(500).json({ error: "Zoho API error", details: data });
      }

      allData.push(...data.data);

      // Get record_cursor from response headers
      const rawCursor = response.headers.get("record_cursor");
      if (rawCursor) {
        cursor = rawCursor;
      } else {
        hasMore = false;
      }
    }

    res.status(200).json({ code: 3000, data: allData });
  } catch (err) {
    res.status(500).json({ error: "Server error", message: err.message });
  }
}
