export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { propertyId, newStatus } = req.body;

  // Get your Zoho token securely
  const tokenRes = await fetch(
    "https://interactivefloorplan.vercel.app/api/zoho-token"
  );
  const { token: accessToken } = await tokenRes.json();

  const response = await fetch(
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

  const result = await response.json();
  return res.status(response.status).json(result);
}
