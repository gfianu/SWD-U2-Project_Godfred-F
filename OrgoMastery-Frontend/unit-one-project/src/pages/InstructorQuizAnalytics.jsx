import { useEffect, useMemo, useState } from "react";
import { API_BASE_URL } from "../api/config";
import { useAuth } from "../context/AuthContext";
import "../styles/InstructorQuizAnalytics.css";

export default function InstructorQuizAnalytics() {
  const { token } = useAuth();

  const [lectures, setLectures] = useState([]);
  const [selectedLectureId, setSelectedLectureId] = useState("");
  const [selectedQuizId, setSelectedQuizId] = useState("");

  const [analytics, setAnalytics] = useState(null);

  const [loadingLectures, setLoadingLectures] = useState(true);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);
  const [error, setError] = useState("");

  // Load lectures + quiz summaries
  useEffect(() => {
    let ignore = false;

    async function loadLecturesAndDetails() {
      try {
        setLoadingLectures(true);
        setError("");

        const lecturesRes = await fetch(`${API_BASE_URL}/api/lectures`);
        if (!lecturesRes.ok) {
          throw new Error(`Failed to load lectures (${lecturesRes.status})`);
        }

        const lectureSummaries = await lecturesRes.json();

        const detailResults = await Promise.all(
          lectureSummaries.map(async (lecture) => {
            const res = await fetch(`${API_BASE_URL}/api/lectures/${lecture.id}`);
            if (!res.ok) {
              throw new Error(`Failed to load lecture ${lecture.id} (${res.status})`);
            }
            return res.json();
          })
        );

        if (!ignore) {
          setLectures(detailResults);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || "Failed to load lectures.");
        }
      } finally {
        if (!ignore) {
          setLoadingLectures(false);
        }
      }
    }

    loadLecturesAndDetails();
    return () => {
      ignore = true;
    };
  }, []);

  const selectedLecture = useMemo(() => {
    return lectures.find((lecture) => String(lecture.id) === String(selectedLectureId)) || null;
  }, [lectures, selectedLectureId]);

  const availableQuizzes = selectedLecture?.quizzes ?? [];

  useEffect(() => {
    let ignore = false;

    async function loadAnalytics() {
      if (!selectedQuizId) {
        setAnalytics(null);
        return;
      }

      try {
        setLoadingAnalytics(true);
        setError("");
        setAnalytics(null);

        const res = await fetch(`${API_BASE_URL}/api/quizzes/${selectedQuizId}/analytics`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401) {
          throw new Error("Unauthorized. Please log in again.");
        }

        if (res.status === 403) {
          throw new Error("Instructor access required.");
        }

        if (!res.ok) {
          throw new Error(`Failed to load analytics (${res.status})`);
        }

        const data = await res.json();
        if (!ignore) {
          setAnalytics(data);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || "Failed to load analytics.");
        }
      } finally {
        if (!ignore) {
          setLoadingAnalytics(false);
        }
      }
    }

    loadAnalytics();
    return () => {
      ignore = true;
    };
  }, [selectedQuizId, token]);

  function handleLectureChange(e) {
    setSelectedLectureId(e.target.value);
    setSelectedQuizId("");
    setAnalytics(null);
    setError("");
  }

  function handleQuizChange(e) {
    setSelectedQuizId(e.target.value);
    setError("");
  }

  return (
    <section className="iqa-page container">
      <h2>Instructor Quiz Analytics</h2>
      <p className="iqa-subtitle">
        Review quiz performance and student attempt summaries.
      </p>

      <div className="iqa-controls">
        <div className="iqa-field">
          <label htmlFor="lectureSelect">Lecture</label>
          <select
            id="lectureSelect"
            value={selectedLectureId}
            onChange={handleLectureChange}
            disabled={loadingLectures}
          >
            <option value="">Select a lecture</option>
            {lectures.map((lecture) => (
              <option key={lecture.id} value={lecture.id}>
                {lecture.title}
              </option>
            ))}
          </select>
        </div>

        <div className="iqa-field">
          <label htmlFor="quizSelect">Quiz</label>
          <select
            id="quizSelect"
            value={selectedQuizId}
            onChange={handleQuizChange}
            disabled={!selectedLectureId || availableQuizzes.length === 0}
          >
            <option value="">Select a quiz</option>
            {availableQuizzes.map((quiz) => (
              <option key={quiz.id} value={quiz.id}>
                {quiz.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && <p className="iqa-message error">{error}</p>}

      {!selectedQuizId ? (
        <div className="iqa-empty">
          <p>Select a lecture and quiz to view analytics.</p>
        </div>
      ) : loadingAnalytics ? (
        <p className="muted">Loading analytics...</p>
      ) : analytics ? (
        <>
          <div className="iqa-summary-grid">
            <div className="iqa-card">
              <h3>Attempts</h3>
              <p className="iqa-number">{analytics.attemptCount}</p>
              <p className="iqa-label">Total submissions</p>
            </div>

            <div className="iqa-card">
              <h3>Average Score</h3>
              <p className="iqa-number">{analytics.averageScore}</p>
              <p className="iqa-label">Average correct answers</p>
            </div>

            <div className="iqa-card">
              <h3>Average %</h3>
              <p className="iqa-number">{analytics.averagePercent}%</p>
              <p className="iqa-label">Average performance</p>
            </div>

            <div className="iqa-card">
              <h3>Highest Score</h3>
              <p className="iqa-number">{analytics.highestScore}</p>
              <p className="iqa-label">Best submission</p>
            </div>

            <div className="iqa-card">
              <h3>Lowest Score</h3>
              <p className="iqa-number">{analytics.lowestScore}</p>
              <p className="iqa-label">Lowest submission</p>
            </div>
          </div>

          <div className="iqa-table-wrap">
            <h3 className="iqa-table-title">Student Attempt Summary</h3>

            {analytics.studentStats?.length ? (
              <table className="iqa-table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Email</th>
                    <th>Attempts</th>
                    <th>Best Score</th>
                    <th>Latest Score</th>
                    <th>Total Questions</th>
                    <th>Latest Attempt</th>
                  </tr>
                </thead>
                <tbody>
                  {analytics.studentStats.map((student) => (
                    <tr key={student.userId}>
                      <td>{student.username}</td>
                      <td>{student.email}</td>
                      <td>{student.attemptCount}</td>
                      <td>{student.bestScore}</td>
                      <td>{student.latestScore}</td>
                      <td>{student.totalQuestions}</td>
                      <td>
                        {student.latestAttemptAt
                          ? new Date(student.latestAttemptAt).toLocaleString()
                          : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="muted">No student attempts found for this quiz yet.</p>
            )}
          </div>
        </>
      ) : null}
    </section>
  );
}