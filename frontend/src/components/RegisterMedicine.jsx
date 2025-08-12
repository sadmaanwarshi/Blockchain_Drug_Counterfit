import { useState } from "react";
import axios from "axios";

export default function RegisterMedicine() {
  const [form, setForm] = useState({
    name: "",
    batch: "",
    expiry: "",
    manufacturer: "",
  });
  const [message, setMessage] = useState("");
  const [generatedTagId, setGeneratedTagId] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setGeneratedTagId("");

    try {
      // ✅ Get JWT token from storage
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("❌ You must be logged in as a manufacturer.");
        return;
      }

      const res = await axios.post(
        "https://blockchain-drug-counterfit.vercel.app/api/medicine/register",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Send token to backend
          },
        }
      );

      setMessage("✅ Medicine registered successfully!");
      setGeneratedTagId(res.data.tag_id); // backend returns tag_id
      setForm({ name: "", batch: "", expiry: "", manufacturer: "" });
    } catch (err) {
      if (err.response?.status === 403) {
        setMessage("❌ Access denied: Only manufacturers can register medicines.");
      } else {
        setMessage("❌ Error registering medicine.");
      }
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Register Medicine</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="batch"
          placeholder="Batch"
          value={form.batch}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="expiry"
          value={form.expiry}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="manufacturer"
          placeholder="Manufacturer"
          value={form.manufacturer}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>

      {message && <p>{message}</p>}

      {generatedTagId && (
        <div style={{ marginTop: "20px" }}>
          <p>
            <strong>Generated Tag ID:</strong> {generatedTagId}
          </p>
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
              generatedTagId
            )}`}
            alt="QR Code"
          />
        </div>
      )}
    </div>
  );
}
