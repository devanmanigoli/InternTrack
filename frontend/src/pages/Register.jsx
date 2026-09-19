import { useState } from "react";
import {
  ArrowRight,
  BarChart3,
  LockKeyhole,
  Mail,
  UserRound
} from "lucide-react";

import { registerUser } from "../services/authService";

function Register({ onRegister, onSwitch }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setForm((previous) => ({
      ...previous,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (form.name.trim().length < 2) {
      setError("Please enter your full name.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const user = await registerUser({
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password
      });

      onRegister(user);
    } catch (err) {
      console.error("Registration failed:", err);

      setError(
        err.message || "Unable to create account."
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
          <p className="auth-eyebrow">GET STARTED</p>

          <h2>Create your workspace</h2>

          <p>
            Build your internship pipeline and manage everything
            in one place.
          </p>
        </div>

        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >
          <label>
            Full name

            <div className="input-wrapper">
              <UserRound size={17} />

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                autoComplete="name"
                required
              />
            </div>
          </label>

          <label>
            Email address

            <div className="input-wrapper">
              <Mail size={17} />

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </div>
          </label>

          <label>
            Password

            <div className="input-wrapper">
              <LockKeyhole size={17} />

              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Minimum 6 characters"
                autoComplete="new-password"
                required
              />
            </div>
          </label>

          <button
            className="auth-submit"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Creating account..."
              : "Create account"}

            {!loading && <ArrowRight size={17} />}
          </button>
        </form>

        <div className="auth-switch">
          <span>Already have an account?</span>

          <button
            type="button"
            onClick={onSwitch}
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;