import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AuthPage from "./components/AuthPage";
import RegisterMedicine from "./components/RegisterMedicine";
import VerifyMedicine from "./components/VerifyMedicine";
import ViewLogs from "./components/ViewLogs";

export default function App() {
  return (
    <Router>
      <nav style={{ padding: "10px", background: "#f4f4f4" }}>
        <Link to="/" style={{ marginRight: "10px" }}>Login / Register</Link>
        <Link to="/register-medicine" style={{ marginRight: "10px" }}>Register Medicine</Link>
        <Link to="/verify-medicine" style={{ marginRight: "10px" }}>Verify Medicine</Link>
        <Link to="/view-logs">Verify Logs</Link>
      </nav>

      <div style={{ padding: "20px" }}>
        <Routes>
          {/* Login / Register */}
          <Route path="/" element={<AuthPage />} />

          {/* Manufacturer */}
          <Route path="/register-medicine" element={<RegisterMedicine />} />

          {/* Pharmacy Owner */}
          <Route path="/verify-medicine" element={<VerifyMedicine />} />
          <Route path="/view-logs" element={<ViewLogs />} />
        </Routes>
      </div>
    </Router>
  );
}
