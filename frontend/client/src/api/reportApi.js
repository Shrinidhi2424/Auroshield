import axios from "axios";

const API_URL = "http://localhost:8080/reports";

export const fetchReports = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const submitReport = async (report, file) => {
  const formData = new FormData();
  formData.append("title", report.title);
  formData.append("description", report.description);
  formData.append("userId", report.userId);
  formData.append("location", report.location);
  if (file) formData.append("evidence", file);

  const res = await axios.post(API_URL, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};
