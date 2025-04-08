"use client";  // Add this at the top

import { useState } from "react";
import styles from "./upload.module.css";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setText(data.text);
      } else {
        alert("Failed to process PDF");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file.");
    }
  };

  return (
    <div className={styles.upload}>
      <h1>Upload your file here</h1>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {text && (
        <div>
          <h2>Extracted Text:</h2>
          <p>{text}</p>
        </div>
      )}
    </div>
  );
}
