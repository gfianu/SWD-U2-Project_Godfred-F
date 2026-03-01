import { useOutletContext } from "react-router-dom";
import notesData from "../data/notesData";
import quizzesData from "../data/quizzesData";
import Button from "../components/Button";
import "../styles/LectureDashboard.css";

export default function LectureDashboard() {
  const { lecture } = useOutletContext();

  const notesEntry = notesData.find((n) => n.title === lecture.title);
  const notesCount = notesEntry ? notesEntry.notes.length : 0;

  const relatedQuizzes = quizzesData.filter((q) => q.title === lecture.title);
  const quizCount = relatedQuizzes.length;

  const videoCount = lecture.videos ? lecture.videos.length : 0;

  const lastQuizScore =
    localStorage.getItem(`quizScore_${lecture.title}`) || "No recent quiz";

  const lastActivity =
    localStorage.getItem(`activity_${lecture.title}`) || "No recent activity";

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
          <h3>Last Quiz Score</h3>
          <p className="dash-number">{lastQuizScore}</p>
          <p className="dash-label">Most recent attempt</p>
        </div>

        <div className="dash-card">
          <h3>Last Activity</h3>
          <p className="dash-activity">{lastActivity}</p>
        </div>
      </div>

      {/* ---- QUICK NAVIGATION ---- */}
      <div className="quick-nav">
        <Button
          label="Go to Videos"
          variant="primary"
          onClick={() => (window.location.href = `/lectures/${lecture.id}/videos`)}
        />

        <Button
          label="Go to Notes"
          variant="secondary"
          onClick={() => (window.location.href = `/lectures/${lecture.id}/notes`)}
        />

        <Button
          label="Go to Quizzes"
          variant="primary"
          onClick={() => (window.location.href = `/lectures/${lecture.id}/quizzes`)}
        />
      </div>
    </section>
  );
}

