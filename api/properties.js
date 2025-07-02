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

    // ✅ Try bulk read with NO body
    const bulkInitRes = await fetch(
      "https://www.zohoapis.com/creator/v2.1/bulk/mobaha_baytiraqi/interactive-floor-plan/report/Properties_List/read",
      {
        method: "POST",
        headers: {
          Authorization: `Zoho-oauthtoken ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const bulkInitData = await bulkInitRes.json();
    const jobId = bulkInitData?.job_id;

    if (!jobId) {
      return res.status(500).json({
        error: "Failed to create bulk read job",
        details: bulkInitData,
      });
    }

    // 🕒 Poll for completion
    let status = "IN_PROGRESS";
    let attempts = 0;
    let downloadUrl = null;

    while (status === "IN_PROGRESS" && attempts < 10) {
      await new Promise((r) => setTimeout(r, 2000));
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

    const downloadRes = await fetch(downloadUrl);
    const fullData = await downloadRes.json();

    res.status(200).json({ code: 3000, data: fullData });
  } catch (err) {
    res.status(500).json({ error: "Server error", message: err.message });
  }
}
