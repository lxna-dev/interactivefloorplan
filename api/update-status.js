export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const body = await req.json();
  const { propertyId, newStatus } = body;

  if (!propertyId || !newStatus) {
    return res.status(400).json({ message: "Missing propertyId or newStatus" });
  }

  const tokenRes = await fetch(
    "https://interactivefloorplan.vercel.app/api/zoho-token"
  );
  const { token: accessToken } = await tokenRes.json();

  const updateRes = await fetch(
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

  const result = await updateRes.json();
  return res.status(updateRes.status).json(result);
}
