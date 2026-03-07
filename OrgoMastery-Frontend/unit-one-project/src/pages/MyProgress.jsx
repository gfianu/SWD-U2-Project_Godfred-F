import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../api/config";
import "../styles/MyProgress.css";

export default function MyProgress() {
  const { token, isAuthenticated } = useAuth();

  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function loadAttempts() {
      if (!isAuthenticated || !token) {
        setAttempts([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const res = await fetch(`${API_BASE_URL}/api/quizzes/my-attempts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401) {
          throw new Error("Please log in to view your progress.");
        }

        if (!res.ok) {
          throw new Error(`Failed to load attempts (${res.status})`);
        }

        const data = await res.json();
        if (!ignore) {
          setAttempts(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || "Failed to load progress.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadAttempts();
    return () => {
      ignore = true;
    };
  }, [isAuthenticated, token]);

  if (loading) {
    return (
      <section className="progress-page container">
        <p className="muted">Loading your progress…</p>
      </section>
    );
  }

  if (!isAuthenticated) {
    return (
      <section className="progress-page container">
        <h2>My Progress</h2>
        <p className="muted">
          Please <Link to="/login">log in</Link> to view your quiz history.
        </p>
      </section>
    );
  }

  return (
    <section className="progress-page container">
      <div className="progress-header">
        <h2>My Progress</h2>
        <p className="progress-subtitle">
          Review your quiz attempts across OrgoMastery.
        </p>
      </div>

      {error && <p className="muted">{error}</p>}

      {!error && attempts.length === 0 ? (
        <div className="progress-empty">
          <p>You have not submitted any quiz attempts yet.</p>
          <Link to="/lectures" className="progress-link-btn">
            Browse Lectures
          </Link>
        </div>
      ) : (
        <div className="progress-table-wrap">
          <table className="progress-table">
            <thead>
              <tr>
                <th>Lecture</th>
                <th>Quiz</th>
                <th>Score</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {attempts.map((attempt) => (
                <tr key={attempt.attemptId}>
                  <td>{attempt.lectureTitle}</td>
                  <td>{attempt.quizTitle}</td>
                  <td>
                    <strong>
                      {attempt.score}/{attempt.total}
                    </strong>
                  </td>
                  <td>{new Date(attempt.createdAt).toLocaleString()}</td>
                  <td>
                    <div className="progress-actions">
                      <Link to={`/lectures/${attempt.lectureId}/dashboard`}>
                        View Lecture
                      </Link>
                      <Link to={`/lectures/${attempt.lectureId}/quizzes/${attempt.quizId}`}>
                        Retake Quiz
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}