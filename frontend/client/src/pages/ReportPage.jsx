import { useState, useEffect } from "react";
import { fetchReports, submitReport } from "./api/reportApi";
import { getAuth } from "firebase/auth";

function ReportPage() {
  const [reports, setReports] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [location, setLocation] = useState("");
  const [file, setFile] = useState(null);

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    fetchReports().then(setReports);
  }, []);

  const handleSubmit = async () => {
    if (!user) return alert("Login first!");
    const report = {
      title,
      description: desc,
      userId: user.uid,
      location,
    };
    await submitReport(report, file);
    fetchReports().then(setReports);
  };

  return (
    <div>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <input placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)} />
      <input placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} />
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={handleSubmit}>Submit Report</button>

      <h2>All Reports</h2>
      <ul>
        {reports.map(r => (
          <li key={r.id}>
            {r.title} - {r.description} <br />
            <img src={r.evidenceUrl} width="100" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReportPage;
