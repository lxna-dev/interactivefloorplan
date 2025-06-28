export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", async () => {
    const { propertyId, newStatus } = JSON.parse(body);

    if (!propertyId || !newStatus) {
      return res
        .status(400)
        .json({ message: "Missing propertyId or newStatus" });
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
      res.status(zohoRes.status).json(result);
    } catch (err) {
      res
        .status(500)
        .json({ error: "Internal Server Error", details: err.message });
    }
  });
}
