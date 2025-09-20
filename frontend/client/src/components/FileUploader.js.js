import { useState } from "react";
import axios from "axios";

export default function FileUploader() {
  const [file, setFile] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState("");

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:8080/api/files/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUploadedUrl(res.data); // Cloudinary URL
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
      {uploadedUrl && <p>Uploaded URL: {uploadedUrl}</p>}
    </div>
  );
}
