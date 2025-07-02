export default async function handler(req, res) {
  try {
    // 1. Get Zoho token
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

    // 2. Start Bulk Read Job
    const bulkInitRes = await fetch(
      "https://www.zohoapis.com/creator/v2.1/bulk/mobaha_baytiraqi/interactive-floor-plan/report/Properties_List/read",
      {
        method: "POST",
        headers: {
          Authorization: `Zoho-oauthtoken ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          file_type: "json",
          fields: [
            "ID",
            "Property_Number",
            "Status",
            "Add_Developments.Development_Name",
          ],
        }),
      }
    );

    const bulkInitData = await bulkInitRes.json();
    const jobId = bulkInitData?.job_id;

    if (!jobId) {
      return res
        .status(500)
        .json({
          error: "Failed to create bulk read job",
          details: bulkInitData,
        });
    }

    // 3. Poll Job Status
    let status = "IN_PROGRESS";
    let attempts = 0;
    let downloadUrl = null;

    while (status === "IN_PROGRESS" && attempts < 10) {
      await new Promise((r) => setTimeout(r, 2000)); // wait 2 seconds
      const pollRes = await fetch(
        `https://www.zohoapis.com/creator/v2.1/bulk/mobaha_baytiraqi/interactive-floor-plan/job/${jobId}`,
        {
          headers: {
            Authorization: `Zoho-oauthtoken ${accessToken}`,
          },
        }
      );

      const pollData = await pollRes.json();
      status = pollData.status;
      downloadUrl = pollData.result?.download_url;
      attempts++;
    }

    if (status !== "COMPLETED" || !downloadUrl) {
      return res
        .status(500)
        .json({ error: "Bulk read job did not complete", status });
    }

    // 4. Download and return data
    const downloadRes = await fetch(downloadUrl);
    const fullData = await downloadRes.json();

    res.status(200).json({ code: 3000, data: fullData });
  } catch (err) {
    res.status(500).json({ error: "Server error", message: err.message });
  }
}
