import "./AdminPanel.css";
import { useEffect, useState } from "react";

function AdminPanel() {
  const [proofs, setProofs] = useState([]);

  const fetchProofs = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/proofs`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setProofs(data);
  };

  const handleAction = async (id, action) => {
    const token = localStorage.getItem("token");
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/${action}/${id}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchProofs();
  };

  useEffect(() => {
    fetchProofs();
  }, []);

  return (
    <div className="admin-body">
      <div className="sidebar">
        <ul>
          <li><a href="/dashboard">Dashboard</a></li>
          <li><a href="/EduZone">EduZone</a></li>
          <li><a href="/FitZone">FitZone</a></li>
          <li><a href="/profile">Profile</a></li>
          <li><a href="/admin">Admin</a></li>
        </ul>
      </div>

      <div className="admin-main">
        <h1>🛠️ Admin Panel</h1>
        <p>Manage user-submitted proofs below:</p>

        <div className="proof-grid">
          {proofs.length === 0 ? (
            <p>No pending proofs found.</p>
          ) : (
            proofs.map((proof) => (
              <div key={proof._id} className={`proof-card ${proof.status}`}>
                <img src={proof.url} alt="proof" />
                <div className="proof-info">
                  <span>Status: {proof.status}</span>
                  <div className="buttons">
                    <button onClick={() => handleAction(proof._id, "approve")}>✅ Approve</button>
                    <button onClick={() => handleAction(proof._id, "reject")}>❌ Reject</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
