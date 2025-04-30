import { useState, useEffect, useRef } from "react";
import "./EduZone.css";
import Chatbot from "../components/Chatbot";

function EduZone() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1); // 🧠 New: Level tracking
  const [streak, setStreak] = useState(0); // 🔥 New: Daily streak
  const [lastActivityDate, setLastActivityDate] = useState("");

  // 📎 File Upload State
  const [proofImage, setProofImage] = useState(null);
  const fileInputRef = useRef();

  // Load saved data on mount
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("edu_tasks"));
    const savedXp = JSON.parse(localStorage.getItem("edu_xp"));
    const savedStreak = JSON.parse(localStorage.getItem("edu_streak")) || 0;
    const savedDate = localStorage.getItem("edu_last_date") || "";

    if (savedTasks) setTasks(savedTasks);
    if (savedXp !== null) setXp(savedXp);
    if (savedStreak) setStreak(savedStreak);
    if (savedDate) setLastActivityDate(savedDate);

    if (savedXp !== null) {
      const newLevel = Math.floor(savedXp / 100) + 1;
      setLevel(newLevel);
    }
  }, []);

  // Save tasks, xp, streak, date
  useEffect(() => {
    localStorage.setItem("edu_tasks", JSON.stringify(tasks));
    localStorage.setItem("edu_xp", JSON.stringify(xp));
    localStorage.setItem("edu_streak", JSON.stringify(streak));
    localStorage.setItem("edu_last_date", lastActivityDate);
  }, [tasks, xp, streak, lastActivityDate]);

  const updateXp = (amount) => {
    setXp((prevXp) => {
      const newXp = prevXp + amount;
      const newLevel = Math.floor(newXp / 100) + 1;
      setLevel(newLevel);
      return newXp;
    });
  };

  const updateStreak = () => {
    const today = new Date().toDateString();
    if (today !== lastActivityDate) {
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      if (lastActivityDate === yesterday) {
        setStreak((prev) => prev + 1);
      } else {
        setStreak(1); // reset streak
      }
      setLastActivityDate(today);
    }
  };

  const handleAddTask = () => {
    if (taskText.trim() === "") return;
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };
    setTasks([newTask, ...tasks]);
    setTaskText("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          const updatedTask = { ...task, completed: !task.completed };
          if (updatedTask.completed) {
            updateXp(10);
            updateStreak(); // 💪 Update streak only on completion
          } else {
            updateXp(-5);
          }
          return updatedTask;
        }
        return task;
      })
    );
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Pomodoro Timer State & Logic
  const [time, setTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [onBreak, setOnBreak] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  useEffect(() => {
    if (time === 0) {
      if (!onBreak) {
        alert("Time for a break! 🧘‍♀️");
        setTime(5 * 60);
        setOnBreak(true);
      } else {
        alert("Break’s over! Back to work! 💪");
        setTime(25 * 60);
        setOnBreak(false);
      }
    }
  }, [time, onBreak]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // 📎 File Upload Handlers
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Image type check
    if (!file.type.startsWith("image/")) {
      alert("Only images are allowed.");
      return;
    }

    // Size limit < 5MB
    if (file.size > 5 * 1024 * 1024) {
      alert("Image too large. Max 5MB.");
      return;
    }

    setProofImage(URL.createObjectURL(file));
  };

  const handleSubmitProof = async () => {
    const file = fileInputRef.current.files[0];
    if (!file) return alert("Please select an image.");

    const formData = new FormData();
    formData.append("proof", file);

    try {
      const res = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Proof accepted! XP granted.");
        setXp((prev) => prev + 10); // Grant XP only if verified
        setProofImage(null); // Clear preview

        // 🧠 Store proof history in localStorage with status
        const prevProofs = JSON.parse(localStorage.getItem("proof_history")) || [];
        const newProof = {
          url: proofImage,
          status: "pending", // Initially pending until backend approves
        };
        localStorage.setItem(
          "proof_history",
          JSON.stringify([...prevProofs, newProof])
        );
      } else {
        alert("❌ " + (data.message || "Image rejected."));
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Error uploading proof.");
    }
  };

  return (
    <div className="eduzone-container">
      <aside className="sidebar">
        <ul>
          <li>
            <img src="/icon1.png" alt="icon1" />
            Dashboard
          </li>
          <li>
            <img src="/icon2.png" alt="icon2" />
            EduZone
          </li>
          <li>
            <img src="/icon3.png" alt="icon3" />
            FitZone
          </li>
          <li>
            <img src="/icon4.png" alt="icon4" />
            Profile
          </li>
        </ul>
      </aside>

      <main className="main-content">
        <h1>EduZone 📚</h1>

        {/* 🌟 XP & Level Display */}
        <h2>Level {level} ⭐ | XP: {xp}</h2>

        {/* 🔥 Streak Display */}
        <h3>🔥 Streak: {streak} day{streak > 1 ? "s" : ""}</h3>

        {/* 📸 Proof Upload Section */}
        <div className="proof-upload">
          <h3>📸 Upload Study Proof</h3>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            ref={fileInputRef}
          />
          {proofImage && (
            <div className="preview">
              <img src={proofImage} alt="Study proof preview" style={{ maxWidth: "100%", borderRadius: "8px", margin: "10px 0" }} />
              <button onClick={handleSubmitProof}>Submit</button>
            </div>
          )}
        </div>

        {/* --- Task Input Section --- */}
        <div className="task-input">
          <input
            type="text"
            value={taskText}
            placeholder="Enter study task..."
            onChange={(e) => setTaskText(e.target.value)}
          />
          <button onClick={handleAddTask}>Add</button>
        </div>

        {/* --- Task List --- */}
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className={task.completed ? "completed" : ""}>
              <span onClick={() => toggleTask(task.id)}>{task.text}</span>
              <button onClick={() => removeTask(task.id)}>❌</button>
            </li>
          ))}
        </ul>

        {/* --- Pomodoro Timer Section --- */}
        <div className="pomodoro">
          <h2>{onBreak ? "Break Time 🧘" : "Focus Time 🎯"}</h2>
          <div className="timer">{formatTime(time)}</div>
          <div className="buttons">
            <button onClick={() => setIsRunning(true)}>Start</button>
            <button onClick={() => setIsRunning(false)}>Pause</button>
            <button
              onClick={() => {
                setIsRunning(false);
                setTime(onBreak ? 5 * 60 : 25 * 60);
              }}
            >
              Reset
            </button>
          </div>
        </div>

        {/* ✨ Chatbot Component Added Here */}
        <Chatbot />
      </main>
    </div>
  );
}

export default EduZone;