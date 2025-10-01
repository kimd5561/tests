import React, { useState, useRef, useEffect } from "react";
import {Link} from "react-router-dom";

import "./style.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: add login logic
  };

  useEffect(() => {
    document.title = "Login";
  }, []);

  return (
    <div className="login-page">
      {/* Header / Tagline */}
      <h1 className="headline">Your memories, all in one place.</h1>

      {/* Form Card */}
      <form className="login-card" onSubmit={handleSubmit}>
        {/* Email Field */}
        <label className="field">
          <span className="label-text">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        {/* Password Field */}
        <label className="field">
          <span className="label-text">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        {/* Remember Me + Forgot Password */}
        <div className="options">
          <label className="remember">
            <input type="checkbox" /> Remember me
          </label>
          <Link to="/forgot" className="forgot">
            Forget password?
          </Link>
        </div>

        {/* Sign In Button */}
        <button type="submit" className="sign-in-btn">
          Sign In
        </button>
      </form>

      {/* Sign Up Link */}
      <p className="signup">
        Don’t have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
}
