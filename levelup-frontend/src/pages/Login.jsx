import "./Login.css";
import { useState } from "react";

function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ email: "", username: "", password: "" });
  const [error, setError] = useState("");

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const endpoint = isSignup ? "register" : "login";
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
      } else {
        localStorage.setItem("token", data.token);
        window.location.href = "/dashboard";
      }
   } catch (err) {
  console.error("Fetch error:", err); // Log error for debugging
  setError("Network error");
}
  };

  return (
    <div className="login-container">
      <div className="left">
        <div className="form-section active">
          <h2>{isSignup ? "Sign Up" : "Login"}</h2>

          {isSignup && (
            <div className="form-group">
              <input
                type="text"
                placeholder="Username"
                name="username"
                value={form.username}
                onChange={handleInput}
              />
            </div>
          )}

          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={form.email}
              onChange={handleInput}
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={form.password}
              onChange={handleInput}
            />
          </div>

          <button className="btn" onClick={handleSubmit}>
            {isSignup ? "Sign Up" : "Login"}
          </button>

          {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

          <p className="link-text">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <a onClick={() => setIsSignup(!isSignup)}>{isSignup ? "Login" : "Sign Up"}</a>
          </p>
        </div>
      </div>

      <div className="right">
        <h2>WELCOME<br />BACK!</h2>
        <p>Your personalized study and fitness tracker!</p>
      </div>
    </div>
  );
}

export default Login;
