import { useState, useEffect } from "react";
import "./FitZone.css";
import Chatbot from "../components/Chatbot"; // 🧩 Import Chatbot

function FitZone() {
  const [workouts, setWorkouts] = useState([]);
  const [workoutText, setWorkoutText] = useState("");
  const [hydration, setHydration] = useState(0);
  const [xp, setXp] = useState(0);

  useEffect(() => {
    const savedWorkouts = JSON.parse(localStorage.getItem("fit_workouts"));
    const savedHydration = JSON.parse(localStorage.getItem("fit_hydration"));
    const savedXp = JSON.parse(localStorage.getItem("fit_xp"));
    if (savedWorkouts) setWorkouts(savedWorkouts);
    if (savedHydration) setHydration(savedHydration);
    if (savedXp) setXp(savedXp);
  }, []);

  useEffect(() => {
    localStorage.setItem("fit_workouts", JSON.stringify(workouts));
    localStorage.setItem("fit_hydration", JSON.stringify(hydration));
    localStorage.setItem("fit_xp", JSON.stringify(xp));
  }, [workouts, hydration, xp]);

  const addWorkout = () => {
    if (workoutText.trim() === "") return;
    const newWorkout = {
      id: Date.now(),
      text: workoutText,
      completed: false,
    };
    setWorkouts([newWorkout, ...workouts]);
    setWorkoutText("");
  };

  const toggleWorkout = (id) => {
    setWorkouts(
      workouts.map((w) => {
        if (w.id === id) {
          const updated = { ...w, completed: !w.completed };
          if (updated.completed) {
            setXp((prev) => prev + 15);
          } else {
            setXp((prev) => Math.max(0, prev - 10));
          }
          return updated;
        }
        return w;
      })
    );
  };

  const addHydration = () => {
    setHydration((prev) => prev + 1);
    setXp((prev) => prev + 5);
  };

  return (
    <div className="fitzone-container">
      <h1>🏋️ FitZone</h1>
      <h2>Your XP: {xp} ⭐</h2>

      <div className="fit-input">
        <input
          type="text"
          value={workoutText}
          placeholder="Add workout (e.g., Push-ups x20)"
          onChange={(e) => setWorkoutText(e.target.value)}
        />
        <button onClick={addWorkout}>Add Workout</button>
      </div>

      <ul className="fit-list">
        {workouts.map((w) => (
          <li key={w.id} className={w.completed ? "done" : ""}>
            <span onClick={() => toggleWorkout(w.id)}>{w.text}</span>
          </li>
        ))}
      </ul>

      <div className="hydration">
        <h3>💧 Water Intake</h3>
        <p>Glasses: {hydration}</p>
        <button onClick={addHydration}>+1 Glass</button>
      </div>

      {/* ✨ Chatbot Component Added Here */}
      <Chatbot />
    </div>
  );
}

export default FitZone;