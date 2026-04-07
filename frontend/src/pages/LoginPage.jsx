import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import client from "../api/client";

export default function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await client.post("/api/auth/login", {
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username || "");
      localStorage.setItem("email", data.email || "");
      localStorage.setItem("role", data.role || "");

      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Login failed. Check email and password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Welcome back</h1>
        <p>Sign in to manage your tasks.</p>

        {error && <div className="alert error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p>
          No account? <Link to="/signup">Create one</Link>
        </p>
      </div>
    </div>
  );
}