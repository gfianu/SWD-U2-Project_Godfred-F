import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function InstructorDashboard() {
  const { user } = useAuth();

  return (
    <section className="container" style={{ marginTop: "2rem" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}
      >
        <header>
          <h2 style={{ marginBottom: "0.5rem" }}>Instructor Dashboard</h2>
          <p style={{ color: "#555" }}>
            Welcome{user?.username ? `, ${user.username}` : ""}. Manage course
            content, quizzes, and future analytics from here.
          </p>
        </header>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1rem",
          }}
        >
          <div
            style={{
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              padding: "1.25rem",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
          >
            <h3 style={{ marginBottom: "0.5rem" }}>Manage Lectures</h3>
            <p style={{ color: "#666", marginBottom: "1rem" }}>
              Add or update lecture content, videos, and notes.
            </p>
            <Link to="/instructor/lectures">
              <button type="button">Go to Lecture Management</button>
            </Link>
          </div>

          <div
            style={{
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              padding: "1.25rem",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
          >
            <h3 style={{ marginBottom: "0.5rem" }}>Manage Quizzes</h3>
            <p style={{ color: "#666", marginBottom: "1rem" }}>
              Create quizzes, add questions, and edit existing assessments.
            </p>
            <Link to="/instructor/questions">
              <button type="button">Go to Question Management</button>
            </Link>
          </div>

          <div
            style={{
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              padding: "1.25rem",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
          >
            <h3 style={{ marginBottom: "0.5rem" }}>Analytics</h3>
            <p style={{ color: "#666", marginBottom: "1rem" }}>
              View quiz attempts, student performance, and score trends.
            </p>
            <Link to="/instructor/analytics">
              <button type="button">Go to Analytics</button>
            </Link>
          </div>

          <div
            style={{
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              padding: "1.25rem",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
          >
            <h3 style={{ marginBottom: "0.5rem" }}>Comments Moderation</h3>
            <p style={{ color: "#666", marginBottom: "1rem" }}>
              Review and manage student discussion activity.
            </p>
            <button type="button" disabled>
              Coming Soon
            </button>
          </div>
        </div>

        <div
          style={{
            background: "#f8fafc",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            padding: "1.25rem",
          }}
        >
          <h3 style={{ marginBottom: "0.75rem" }}>Future Build</h3>
          <p style={{ color: "#555", marginBottom: "0.75rem" }}>
            Some features I am planning for the next build:
          </p>
          <ol style={{ paddingLeft: "1.25rem", color: "#555", margin: 0 }}>
            <li>Create a page to list questions by quiz</li>
            <li>Add a form to create a new question</li>
            <li>Add edit and delete actions</li>
          </ol>
        </div>
      </div>
    </section>
  );
}
