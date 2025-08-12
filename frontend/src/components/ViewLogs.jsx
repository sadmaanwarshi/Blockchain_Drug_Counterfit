import React, { useState } from "react";

const ViewLogs = () => {
  const [tagId, setTagId] = useState("");
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchLogs = async () => {
    if (!tagId.trim()) {
      setError("Please enter a tag ID");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/blockchain/logs/${tagId}`);
      const data = await res.json();

      if (!res.ok) {
        setLogs([]);
        setError(data.message || "Error fetching logs");
      } else {
        setLogs(data.logs);
      }
    } catch (err) {
      setError("Server error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
      <h2>Medicine Verification Logs</h2>

      {/* Search input */}
      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="Enter Tag ID"
          value={tagId}
          onChange={(e) => setTagId(e.target.value)}
          style={{
            padding: "8px",
            width: "250px",
            marginRight: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
        <button
          onClick={fetchLogs}
          style={{
            padding: "8px 15px",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Search Logs
        </button>
      </div>

      {/* Loading */}
      {loading && <p>Loading logs...</p>}

      {/* Error */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Logs Table */}
      {logs.length > 0 && (
        <table
          border="1"
          cellPadding="8"
          style={{
            borderCollapse: "collapse",
            width: "100%",
            marginTop: "20px",
            background: "#f9f9f9",
          }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Index</th>
              <th>Timestamp</th>
              <th>Transaction</th>
              <th>Prev Hash</th>
              <th>Hash</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id}>
                <td>{log.id}</td>
                <td>{log.index_no}</td>
                <td>{new Date(log.timestamp).toLocaleString()}</td>
                <td>
                  <pre>{JSON.stringify(log.tx, null, 2)}</pre>
                </td>
                <td>{log.prev_hash}</td>
                <td>{log.hash}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewLogs;
