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
      "https://www.zohoapis.com/creator/v2.1/mobaha_baytiraqi/interactive-floor-plan/report/Properties_List";

    let allData = [];
    let nextCursor = null;

    do {
      const url = new URL(baseUrl);
      url.searchParams.set("max_records", "1000");

      const headers = {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
      };

      if (nextCursor) {
        headers["record_cursor"] = nextCursor;
      }

      const response = await fetch(url.toString(), { headers });

      if (!response.ok) {
        const err = await response.json();
        return res.status(500).json({ error: "Zoho API error", details: err });
      }

      const data = await response.json();
      allData.push(...data.data);

      // Look for the next cursor in the response header
      nextCursor = response.headers.get("record_cursor");
    } while (nextCursor);

    res.status(200).json({ code: 3000, data: allData });
  } catch (err) {
    res.status(500).json({ error: "Server error", message: err.message });
  }
}
