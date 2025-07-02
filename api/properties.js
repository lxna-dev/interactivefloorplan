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

    const allData = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const zohoRes = await fetch(
        `https://creator.zoho.com/api/v2/mobaha_baytiraqi/interactive-floor-plan/report/Properties_List?page=${page}&page_size=200`,
        {
          headers: {
            Authorization: `Zoho-oauthtoken ${accessToken}`,
          },
        }
      );

      const result = await zohoRes.json();

      if (result.code !== 3000 || !result.data) {
        return res
          .status(500)
          .json({ error: "Zoho API error", details: result });
      }

      allData.push(...result.data);

      if (result.data.length < 200) {
        hasMore = false;
      } else {
        page++;
      }
    }

    res.status(200).json({ code: 3000, data: allData });
  } catch (err) {
    res.status(500).json({ error: "Server error", message: err.message });
  }
}
