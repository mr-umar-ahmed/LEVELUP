import "./EduZone.css";
import { useState, useRef } from "react";
function EduZone() {
  const [tasks, setTasks] = useState([
    { text: "Read a chapter", completed: false },
    { text: "Solve 5 math problems", completed: false },
    { text: "Watch a tutorial", completed: false },
  ]);
  const [newTask, setNewTask] = useState("");
  const [timer, setTimer] = useState(0);
  const timerRef = useRef(null);

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const startTimer = () => {
    if (timerRef.current) return;
    timerRef.current = setInterval(() => setTimer((prev) => prev + 1), 1000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  const resetTimer = () => {
    stopTimer();
    setTimer(0);
  };

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="eduzone-body">
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
        <h1>📚 EduZone</h1>

        <div className="eduzone-section">
          <div className="task-manager">
            <h2>🎯 Study Tasks</h2>
            <ul>
              {tasks.map((task, idx) => (
                <li
                  key={idx}
                  className={task.completed ? "completed" : ""}
                  onClick={() => toggleTask(idx)}
                >
                  {task.text}
                </li>
              ))}
            </ul>
            <input
              type="text"
              placeholder="New task..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <button onClick={addTask}>Add Task</button>
          </div>

          <div className="timer">
            <h2>⏱️ Study Timer</h2>
            <div className="timer-display">{formatTime(timer)}</div>
            <div className="timer-controls">
              <button onClick={startTimer}>Start</button>
              <button onClick={stopTimer}>Stop</button>
              <button onClick={resetTimer}>Reset</button>
            </div>
          </div>

          <div className="proof-upload">
            <h2>📸 Upload Study Proof</h2>
            <input type="file" accept="image/*" />
            <button>Submit for XP</button>
          </div>
        </div>

        <div className="chatbot">
          <h2>💬 Edu AI Assistant</h2>
          <p>Ask for a study suggestion or motivation!</p>
          <button>🎓 Get AI Tip</button>
        </div>
      </div>
    </div>
  );
}

export default EduZone;
