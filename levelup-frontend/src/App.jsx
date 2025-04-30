import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import EduZone from "./pages/EduZone";
import FitZone from "./pages/FitZone";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Leaderboard from "./pages/Leaderboard";
import AdminPanel from "./pages/AdminPanel";

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Dashboard</Link> |{" "}
        <Link to="/eduzone">EduZone</Link> |{" "}
        <Link to="/fitzone">FitZone</Link> |{" "}
        <Link to="/profile">Profile</Link> |{" "}
        <Link to="/about">About</Link>
        <Link to="/leaderboard">Leaderboard</Link>
        <Link to="/admin">Admin</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/eduzone" element={<EduZone />} />
        <Route path="/fitzone" element={<FitZone />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={<AdminPanel />} />
<Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </div>
  );
}

export default App;
