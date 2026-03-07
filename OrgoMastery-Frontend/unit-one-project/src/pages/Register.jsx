import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "STUDENT",
  });

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      setSubmitting(true);
      await register(formData);
      navigate("/");
    } catch (err) {
      setError(err.message || "Registration failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="container" style={{ maxWidth: "500px", marginTop: "2rem" }}>
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "0.75rem", marginTop: "0.25rem" }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "0.75rem", marginTop: "0.25rem" }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "0.75rem", marginTop: "0.25rem" }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={{ width: "100%", padding: "0.75rem", marginTop: "0.25rem" }}
          >
            <option value="STUDENT">Student</option>
            <option value="INSTRUCTOR">Instructor</option>
          </select>
        </div>

        {error && <p className="muted">{error}</p>}

        <button type="submit" disabled={submitting}>
          {submitting ? "Registering..." : "Register"}
        </button>
      </form>

      <p style={{ marginTop: "1rem" }}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </section>
  );
}