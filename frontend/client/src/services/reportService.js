import { API_URL } from "../config";
import { getCurrentUserUid } from "../firebaseAuth";

// Submit a report with evidence (image/audio)
export async function submitReport({ title, description, location, evidenceFile }) {
  const uid = getCurrentUserUid();

  const formData = new FormData();
  formData.append("uid", uid);
  formData.append("title", title);
  formData.append("description", description);
  formData.append("location", location);
  if (evidenceFile) formData.append("evidence", evidenceFile);

  const response = await fetch(`${API_URL}/reports/submit`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) throw new Error("Failed to submit report");
  return await response.json(); // Returns the saved report object
}
