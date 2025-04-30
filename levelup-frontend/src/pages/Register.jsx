import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token); // Save token in localStorage
        alert("Registered successfully! You are now logged in.");
        navigate("/"); // Redirect to home page
      } else {
        alert(data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred during registration.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h1>Register</h1>
      <input
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: "block", width: "100%", padding: "10px", marginBottom: "10px" }}
      />
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ display: "block", width: "100%", padding: "10px", marginBottom: "10px" }}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: "block", width: "100%", padding: "10px", marginBottom: "10px" }}
      />
      <button onClick={handleRegister} style={{ padding: "10px 20px" }}>
        Sign Up
      </button>
    </div>
  );
}

export default Register;