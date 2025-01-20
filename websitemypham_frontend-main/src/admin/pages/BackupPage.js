import React, { useState } from "react";
import "./Backup.css";


const BackupPage = () => {
  const [dbName, setDbName] = useState("comestics-store");
  const [dbNameRestore, setDbNameRestore] = useState("comestics-store2");
  const [backupPath, setBackupPath] = useState("");
  const token = sessionStorage.getItem("jwtToken");

  const handleBackup = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/backup?dbName=${dbName}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${dbName}_backup.zip`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      } else {
        alert("Backup failed!");
      }
    } catch (error) {
      alert("Backup failed: " + error.message);
    }
  };

  const handleRestore = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/restore?dbName=${dbNameRestore}&backupPath=${encodeURIComponent(
          backupPath
        )}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.text();
      alert(result);
    } catch (error) {
      console.error("Error during restore:", error);
    }
  };

  return (
    <div className="backup-container">
      <h1>MongoDB Backup</h1>
      <div>
        <label>
          Database Name:
          <input
            type="text"
            value={dbName}
            onChange={(e) => setDbName(e.target.value)}
          />
        </label>
      </div>
      <button onClick={handleBackup}>Backup</button>

      <div className="restore-section">
        <h1>Restore MongoDB Database</h1>
        <div>
          <label>
            Database Name:
            <input
              type="text"
              value={dbNameRestore}
              onChange={(e) => setDbNameRestore(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Backup Path:
            <input
              type="text"
              value={backupPath}
              onChange={(e) => setBackupPath(e.target.value)}
            />
          </label>
        </div>
        <button onClick={handleRestore}>Restore</button>
      </div>
    </div>
  );
};

export default BackupPage;
