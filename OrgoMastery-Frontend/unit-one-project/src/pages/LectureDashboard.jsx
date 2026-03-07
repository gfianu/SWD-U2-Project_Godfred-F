import { useEffect, useMemo, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import Button from "../components/Button";
import "../styles/LectureDashboard.css";
import { API_BASE_URL } from "../api/config";
import { useAuth } from "../context/AuthContext";

export default function LectureDashboard() {
  const { lecture } = useOutletContext();
  const { token, isAuthenticated } = useAuth();

  const videoCount = lecture?.videos?.length || 0;
  const notesCount = lecture?.notes?.length || 0;
  const quizzes = useMemo(() => lecture?.quizzes || [], [lecture?.quizzes]);
  const quizCount = quizzes.length;

  const [attemptsByQuizId, setAttemptsByQuizId] = useState({});
  const [attemptsLoading, setAttemptsLoading] = useState(false);
  const [attemptsError, setAttemptsError] = useState("");

  useEffect(() => {
    if (!isAuthenticated || !token) {
      setAttemptsByQuizId({});
      setAttemptsError("");
      setAttemptsLoading(false);
      return;
    }

    if (!quizzes.length) {
      setAttemptsByQuizId({});
      setAttemptsError("");
      setAttemptsLoading(false);
      return;
    }

    const controller = new AbortController();

    async function loadLatestAttempts() {
      try {
        setAttemptsLoading(true);
        setAttemptsError("");

        const results = await Promise.allSettled(
          quizzes.map(async (q) => {
            const res = await fetch(
              `${API_BASE_URL}/api/quizzes/${q.id}/attempts/latest`,
              {
                signal: controller.signal,
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            if (res.status === 204) return { quizId: q.id, attempt: null };
            if (res.status === 401) {
              throw new Error("Please log in to view your quiz attempts.");
            }
            if (!res.ok) throw new Error(`Quiz ${q.id}: failed (${res.status})`);

            const attempt = await res.json();
            return { quizId: q.id, attempt };
          })
        );

        const map = {};
        let anyError = "";

        for (const r of results) {
          if (r.status === "fulfilled") {
            map[r.value.quizId] = r.value.attempt;
          } else if (!anyError) {
            anyError = r.reason?.message || "Failed to load";
          }
        }

        setAttemptsByQuizId(map);
        setAttemptsError(anyError);
      } catch (err) {
        if (err?.name !== "AbortError") {
          setAttemptsError(err?.message || "Failed to load attempts.");
        }
      } finally {
        setAttemptsLoading(false);
      }
    }

    loadLatestAttempts();
    return () => controller.abort();
  }, [quizzes, isAuthenticated, token]);

  const mostRecentAttempt = useMemo(() => {
    const attempts = Object.values(attemptsByQuizId).filter(Boolean);
    if (!attempts.length) return null;

    return attempts.reduce((latest, cur) => {
      const a = new Date(latest.createdAt).getTime();
      const b = new Date(cur.createdAt).getTime();
      return b > a ? cur : latest;
    });
  }, [attemptsByQuizId]);

  const lastActivity =
    localStorage.getItem(`activity_${lecture?.id}`) || "No recent activity";
  const lastActivityAt = localStorage.getItem(`activityAt_${lecture?.id}`);

  const lastActivityLabel = lastActivityAt
    ? `${lastActivity} · ${new Date(lastActivityAt).toLocaleString()}`
    : lastActivity;

  return (
    <section className="lecture-dashboard">
      <h2 className="dashboard-title">Progress — {lecture.title}</h2>

      <div className="dashboard-grid">
        <div className="dash-card">
          <h3>Videos</h3>
          <p className="dash-number">{videoCount}</p>
          <p className="dash-label">Total videos</p>
        </div>

        <div className="dash-card">
          <h3>Notes</h3>
          <p className="dash-number">{notesCount}</p>
          <p className="dash-label">Available notes</p>
        </div>

        <div className="dash-card">
          <h3>Quizzes</h3>
          <p className="dash-number">{quizCount}</p>
          <p className="dash-label">Available quizzes</p>
        </div>

        <div className="dash-card">
          <h3>Last Activity</h3>
          <p className="dash-activity">{lastActivityLabel}</p>
        </div>

        <div className="dash-card">
          <h3>Most Recent Quiz Attempt</h3>
          {!isAuthenticated ? (
            <p className="dash-label">
              <Link to="/login">Log in</Link> to view your attempts
            </p>
          ) : mostRecentAttempt ? (
            <>
              <p className="dash-number">
                {mostRecentAttempt.score}/{mostRecentAttempt.total}
              </p>
              <p className="dash-label">
                {new Date(mostRecentAttempt.createdAt).toLocaleString()}
              </p>
            </>
          ) : (
            <p className="dash-label">No attempts yet</p>
          )}
        </div>
      </div>

      <div style={{ marginTop: "1.5rem" }}>
        <h3 style={{ marginBottom: "0.75rem" }}>Quiz Attempts</h3>

        {!isAuthenticated ? (
          <p className="muted">
            Please <Link to="/login">log in</Link> to view your quiz attempts.
          </p>
        ) : (
          <>
            {attemptsLoading && <p className="muted">Loading quiz attempts…</p>}
            {!attemptsLoading && attemptsError && (
              <p className="muted">{attemptsError}</p>
            )}
            {!attemptsLoading && quizzes.length === 0 && (
              <p className="muted">No quizzes for this lecture yet.</p>
            )}

            {!attemptsLoading && quizzes.length > 0 && (
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {quizzes.map((q) => {
                  const attempt = attemptsByQuizId[q.id];

                  return (
                    <li
                      key={q.id}
                      style={{
                        padding: "0.75rem 0",
                        borderBottom: "1px solid rgba(255,255,255,0.08)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "1rem",
                      }}
                    >
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontWeight: 600, marginBottom: "0.25rem" }}>
                          {q.title}
                        </div>

                        {attempt === undefined ? (
                          <div className="muted">Error loading attempt</div>
                        ) : attempt === null ? (
                          <div className="muted">No attempts yet</div>
                        ) : (
                          <div className="muted">
                            Latest: <strong>{attempt.score}</strong>/
                            <strong>{attempt.total}</strong> ·{" "}
                            {new Date(attempt.createdAt).toLocaleString()}
                          </div>
                        )}
                      </div>

                      <Link to={`/lectures/${lecture.id}/quizzes/${q.id}`}>
                        <Button
                          label={attempt ? "Retake" : "Start"}
                          variant="primary"
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </>
        )}
      </div>

      <div className="quick-nav">
        <Link to={`/lectures/${lecture.id}/videos`}>
          <Button label="Go to Videos" variant="primary" />
        </Link>

        <Link to={`/lectures/${lecture.id}/notes`}>
          <Button label="Go to Notes" variant="secondary" />
        </Link>

        <Link to={`/lectures/${lecture.id}/quizzes`}>
          <Button label="Go to Quizzes" variant="primary" />
        </Link>
      </div>
    </section>
  );
}
