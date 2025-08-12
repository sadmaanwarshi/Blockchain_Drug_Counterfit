import { useState } from "react";
import axios from "axios";

export default function VerifyMedicine() {
  const [tagId, setTagId] = useState("");
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState("");

  // Retrieve token & role from localStorage (saved at login)
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleVerify = async () => {
    setMessage("");
    setResult(null);

    if (!token) {
      setMessage("❌ You must be logged in as a pharmacy owner to verify medicine.");
      return;
    }

    if (role !== "pharmacy_owner") {
      setMessage("❌ Access denied. Only pharmacy owners can verify medicine.");
      return;
    }

    try {
      const res = await axios.post(
        "https://blockchain-drug-counterfit.vercel.app/api/verify",
        { tag_id: tagId },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token for authentication
          },
        }
      );
      setResult(res.data);
      setMessage(res.data.found ? "✅ Medicine found!" : "❌ Medicine not found.");
    } catch (err) {
      setMessage("❌ Error verifying medicine.");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Verify Medicine</h2>
      <input
        type="text"
        value={tagId}
        placeholder="Enter Tag ID"
        onChange={(e) => setTagId(e.target.value)}
      />
      <button onClick={handleVerify}>Verify</button>

      {message && <p>{message}</p>}
      {result && result.found && (
        <pre>{JSON.stringify(result.medicine, null, 2)}</pre>
      )}
    </div>
  );
}
