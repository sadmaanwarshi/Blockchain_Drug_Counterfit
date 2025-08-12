import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [role, setRole] = useState("manufacturer");
  const [form, setForm] = useState({
    name: "",
    license_no: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      if (isRegister) {
        if (form.password !== form.confirmPassword) {
          setMessage("❌ Passwords do not match");
          return;
        }
        // Registration
        await axios.post(`http://localhost:5000/api/register/${role}`, {
          name: form.name,
          license_no: form.license_no,
          email: form.email,
          password: form.password,
        });
        setMessage("✅ Registration successful! Please log in.");
        setIsRegister(false);
      } else {
        // Login
        const res = await axios.post(`http://localhost:5000/api/login/${role}`, {
          email: form.email,
          password: form.password,
        });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);

        // Redirect based on role
        if (role === "manufacturer") {
          navigate("/register-medicine");
        } else {
          navigate("/verify-medicine");
        }
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Authentication failed");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2>{isRegister ? "Register" : "Login"}</h2>

      {/* Role Selection */}
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        style={{ marginBottom: "10px", width: "100%" }}
      >
        <option value="manufacturer">Manufacturer</option>
        <option value="pharmacy">Pharmacy Owner</option>
      </select>

      <form onSubmit={handleSubmit}>
        {isRegister && (
          <>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="license_no"
              placeholder="License Number"
              value={form.license_no}
              onChange={handleChange}
              required
            />
          </>
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        {isRegister && (
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
        )}
        <button type="submit">
          {isRegister ? "Register" : "Login"}
        </button>
      </form>

      {message && <p>{message}</p>}

      <p
        style={{ color: "blue", cursor: "pointer", marginTop: "10px" }}
        onClick={() => setIsRegister(!isRegister)}
      >
        {isRegister
          ? "Already have an account? Login"
          : "Don't have an account? Register"}
      </p>
    </div>
  );
}
