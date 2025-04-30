import { useState, useEffect } from "react";
import "./Profile.css";

function Profile() {
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [streak, setStreak] = useState(0);
  const [proofs, setProofs] = useState([]);

  useEffect(() => {
    // Fetch user data (XP and streak) from the backend
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch user data.");
        }

        const { xp, streak } = await res.json();
        setXp(xp);
        setLevel(Math.floor(xp / 100) + 1); // Calculate level based on XP
        setStreak(streak);
      } catch (error) {
        console.error(error);
      }
    };

    // Fetch proofs from the backend
    const fetchProofs = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/user/proofs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch proofs.");
        }

        const data = await res.json();
        setProofs(data); // [{ url, status }]
      } catch (error) {
        console.error(error);
      }
    };

    // Call both functions when the component mounts
    fetchUserData();
    fetchProofs();
  }, []);

  return (
    <div className="profile-container">
      <h1>👤 Your Profile</h1>

      {/* Stats Section */}
      <div className="stats">
        <p>⭐ XP: {xp}</p>
        <p>🏅 Level: {level}</p>
        <p>🔥 Streak: {streak} day{streak > 1 ? "s" : ""}</p>
      </div>

      {/* Proof History Section */}
      <h2>📸 Proof History</h2>
      {proofs.length > 0 ? (
        <div className="proofs">
          {proofs.map((proof, index) => (
            <div className="proof-card" key={index}>
              <img src={proof.url} alt={`Proof ${index + 1}`} />
              <span className={`status ${proof.status}`}>{proof.status}</span>
            </div>
          ))}
        </div>
      ) : (
        <p>No proof submitted yet.</p>
      )}
    </div>
  );
}

export default Profile;