module.exports = async (req, res) => {
  if (req.method !== "PUT") {
    res.statusCode = 405;
    res.end(JSON.stringify({ message: "Method Not Allowed" }));
    return;
  }

  let body = "";
  req.on("data", (chunk) => (body += chunk));
  req.on("end", async () => {
    const { propertyId, newStatus } = JSON.parse(body);

    if (!propertyId || !newStatus) {
      res.statusCode = 400;
      res.end(JSON.stringify({ message: "Missing propertyId or newStatus" }));
      return;
    }

    try {
      const tokenRes = await fetch(
        "https://interactivefloorplan.vercel.app/api/zoho-token"
      );
      const { token: accessToken } = await tokenRes.json();

      const zohoRes = await fetch(
        `https://creator.zoho.com/api/v2/mobaha_baytiraqi/interactive-floor-plan/form/Properties_List/${propertyId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Zoho-oauthtoken ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: { Status: newStatus },
          }),
        }
      );

      const result = await zohoRes.json();
      res.statusCode = zohoRes.status;
      res.end(JSON.stringify(result));
    } catch (err) {
      res.statusCode = 500;
      res.end(
        JSON.stringify({ error: "Internal Server Error", details: err.message })
      );
    }
  });
};
