import { useState } from "react";
import {
  ArrowRight,
  BarChart3,
  LockKeyhole,
  Mail,
  UserRound
} from "lucide-react";

import { loginUser } from "../services/authService";

function Login({ onSwitchToRegister, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      await loginUser({
        email,
        password
      });

      onLoginSuccess();
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data ||
        "Unable to sign in"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-background" />

      <div className="auth-card">
        <div className="auth-brand">
          <div className="auth-logo">
            <BarChart3 size={22} />
          </div>

          <div>
            <h1>InternTrack</h1>
            <span>Career Command Center</span>
          </div>
        </div>

        <div className="auth-heading">
          <p className="auth-eyebrow">WELCOME BACK</p>
          <h2>Sign in to your workspace</h2>
          <p>
            Track your applications and stay ahead of your internship journey.
          </p>
        </div>

        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Email address

            <div className="input-wrapper">
              <Mail size={19} />

              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
          </label>

          <label>
            Password

            <div className="input-wrapper">
              <LockKeyhole size={19} />

              <input
                type="password"
                name="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
          </label>

          <button
            className="auth-submit"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        <div className="auth-switch">
          <span>Don't have an account?</span>

          <button
            type="button"
            onClick={onSwitchToRegister}
          >
            Create account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;