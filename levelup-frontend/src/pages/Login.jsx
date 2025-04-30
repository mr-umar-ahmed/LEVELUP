import "./Login.css";
import { useState } from "react";

function Login() {
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div className="login-container">
      <div className="left">
        {/* === LOGIN FORM === */}
        {!showSignup && (
          <div className="form-section active">
            <h2>Login</h2>
            <div className="form-group">
              <input type="text" placeholder="Username" />
              <i className="fas fa-user"></i>
            </div>
            <div className="form-group">
              <input type="password" placeholder="Password" />
              <i className="fas fa-lock"></i>
            </div>
            <button className="btn">Login</button>
            <p className="link-text">
              Don't have an account?{" "}
              <a onClick={() => setShowSignup(true)}>Sign Up</a>
            </p>
          </div>
        )}

        {/* === SIGNUP FORM === */}
        {showSignup && (
          <div className="form-section active">
            <h2>Sign Up</h2>
            <div className="form-group">
              <input type="text" placeholder="Username" />
              <i className="fas fa-user"></i>
            </div>
            <div className="form-group">
              <input type="email" placeholder="Email" />
              <i className="fas fa-envelope"></i>
            </div>
            <div className="form-group">
              <input type="password" placeholder="Password" />
              <i className="fas fa-lock"></i>
            </div>
            <button className="btn">Sign Up</button>
            <p className="link-text">
              Already have an account?{" "}
              <a onClick={() => setShowSignup(false)}>Login</a>
            </p>
          </div>
        )}
      </div>

      <div className="right">
        <h2>WELCOME<br />BACK!</h2>
        <p>Are you ready for LevelUp!!.</p>
      </div>
    </div>
  );
}

export default Login;
