import JSZip from "jszip";

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

    // Step 1: Create bulk read job
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
    const jobId = bulkInitData?.details?.id;

    if (!jobId) {
      return res.status(500).json({
        error: "Failed to create bulk read job",
        details: bulkInitData,
      });
    }

    // Step 2: Poll for job completion
    let status = "In-progress";
    let attempts = 0;
    let downloadUrl = null;

    while (status === "In-progress" && attempts < 10) {
      await new Promise((r) => setTimeout(r, 2000)); // wait 2s
      const pollRes = await fetch(
        `https://www.zohoapis.com/creator/v2.1/bulk/mobaha_baytiraqi/interactive-floor-plan/job/${jobId}`,
        {
          headers: {
            Authorization: `Zoho-oauthtoken ${accessToken}`,
          },
        }
      );

      const pollData = await pollRes.json();
      status = pollData.details?.status;
      downloadUrl = pollData.details?.result?.download_url;
      attempts++;
    }

    if (status !== "Completed" || !downloadUrl) {
      return res
        .status(500)
        .json({ error: "Bulk read job did not complete", status });
    }

    // Step 3: Download ZIP and extract JSON
    const downloadRes = await fetch(downloadUrl);
    const zipBuffer = await downloadRes.arrayBuffer();
    const zip = await JSZip.loadAsync(zipBuffer);
    const firstFile = Object.keys(zip.files)[0];
    const jsonContent = await zip.files[firstFile].async("string");
    const records = JSON.parse(jsonContent);

    res.status(200).json({ code: 3000, data: records.data || [] });
  } catch (err) {
    res.status(500).json({ error: "Server error", message: err.message });
  }
}
