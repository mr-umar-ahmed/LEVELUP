import { useEffect, useState } from "react";
import "./Leaderboard.css";

function Leaderboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch leaderboard data from backend
    fetch("http://localhost:5000/leaderboard")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Failed to fetch leaderboard:", err));
  }, []);

  return (
    <div className="leaderboard-container">
      <h1>🏆 Global Leaderboard</h1>
      <ol>
        {users.length > 0 ? (
          users.map((user, index) => (
            <li key={index} className={user.username === "You" ? "you" : ""}>
              <span>#{index + 1}</span> {user.username} | XP: {user.xp} | 🔥 Streak: {user.streak}
            </li>
          ))
        ) : (
          <li>No users found.</li>
        )}
      </ol>
    </div>
  );
}

export default Leaderboard;