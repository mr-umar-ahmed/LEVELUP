import { useEffect, useState } from "react";
import "./AdminPanel.css";

function AdminPanel() {
  const [proofs, setProofs] = useState([]);

  // Fetch all proofs from the backend
  const fetchProofs = async () => {
    try {
      const res = await fetch("http://localhost:5000/admin/proofs", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch proofs.");
      }
      const data = await res.json();
      setProofs(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load proofs. Please try again.");
    }
  };

  // Update proof status (approve or reject)
  const updateStatus = async (id, action) => {
    try {
      await fetch(`http://localhost:5000/admin/${action}/${id}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchProofs(); // Refresh proofs after update
    } catch (error) {
      console.error(error);
      alert("Failed to update proof status. Please try again.");
    }
  };

  // Check authorization and role on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Not authorized");
      window.location.href = "/";
      return;
    }

    fetch("http://localhost:5000/user/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to verify user.");
        }
        return res.json();
      })
      .then((user) => {
        if (user.role !== "admin") {
          alert("Admin access only");
          window.location.href = "/";
        }
      })
      .catch((error) => {
        console.error(error);
        alert("Authorization failed. Please log in again.");
        window.location.href = "/";
      });
  }, []);

  // Fetch proofs when the component mounts
  useEffect(() => {
    fetchProofs();
  }, []);

  return (
    <div className="admin-panel">
      <h1>🛡️ Admin: Proof Submissions</h1>
      {proofs.length > 0 ? (
        proofs.map((proof) => (
          <div key={proof._id} className="proof-row">
            <div>
              <strong>Hash:</strong> {proof.hash.slice(0, 10)}...
            </div>
            <div>
              Status:{" "}
              <span className={`status ${proof.status}`}>{proof.status}</span>
            </div>
            <div className="actions">
              <button onClick={() => updateStatus(proof._id, "approve")}>
                Approve
              </button>
              <button onClick={() => updateStatus(proof._id, "reject")}>
                Reject
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No proofs submitted yet.</p>
      )}
    </div>
  );
}

export default AdminPanel;