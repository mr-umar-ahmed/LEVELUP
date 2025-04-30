import "./FitZone.css";
import { useState } from "react";

function FitZone() {
  const [activities, setActivities] = useState([
    { text: "Do 15 push-ups", completed: false },
    { text: "Walk 2km", completed: false },
    { text: "Stretch for 10 mins", completed: false },
  ]);
  const [newActivity, setNewActivity] = useState("");

  const toggleActivity = (index) => {
    const updated = [...activities];
    updated[index].completed = !updated[index].completed;
    setActivities(updated);
  };

  const addActivity = () => {
    if (newActivity.trim()) {
      setActivities([...activities, { text: newActivity, completed: false }]);
      setNewActivity("");
    }
  };

  return (
    <div className="fitzone-body">
      <div className="sidebar">
        <ul>
          <li><a href="/dashboard">Dashboard</a></li>
          <li><a href="/EduZone">EduZone</a></li>
          <li><a href="/FitZone">FitZone</a></li>
          <li><a href="/profile">Profile</a></li>
          <li><a href="/leaderboard">Leaderboard</a></li>
        </ul>
      </div>

      <div className="main">
        <h1>🏋️ FitZone</h1>

        <div className="fitzone-section">
          <div className="activity-tracker">
            <h2>🔥 Workout Activities</h2>
            <ul>
              {activities.map((activity, idx) => (
                <li
                  key={idx}
                  className={activity.completed ? "completed" : ""}
                  onClick={() => toggleActivity(idx)}
                >
                  {activity.text}
                </li>
              ))}
            </ul>
            <input
              type="text"
              placeholder="New activity..."
              value={newActivity}
              onChange={(e) => setNewActivity(e.target.value)}
            />
            <button onClick={addActivity}>Add Activity</button>
          </div>

          <div className="proof-upload">
            <h2>📸 Upload Workout Proof</h2>
            <input type="file" accept="image/*" />
            <button>Submit for XP</button>
          </div>
        </div>

        <div className="chatbot">
          <h2>🤖 Fit AI Assistant</h2>
          <p>Need a quick workout or motivational quote?</p>
          <button>💪 Get Fitness Tip</button>
        </div>
      </div>
    </div>
  );
}

export default FitZone;
