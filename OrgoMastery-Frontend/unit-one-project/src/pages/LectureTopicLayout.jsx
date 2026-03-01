import { useParams, Link, Outlet } from "react-router-dom";
import lecturesData from "../data/lecturesData";
import TopicSubNav from "../components/TopicSubNav";
import Button from "../components/Button";
import "../styles/LectureTopicLayout.css";

export default function LectureTopicLayout() {
  const { id } = useParams();
  const lecture = lecturesData.find((l) => l.id === Number(id));

  if (!lecture) {
    return (
      <section className="lecture-not-found container">
        <h2>Lecture Not Found</h2>
        <p>The lecture you are looking for does not exist.</p>
        <Link to="/lectures">
          <Button label="Back to Lectures" variant="primary" />
        </Link>
      </section>
    );
  }

  const currentLectureId = lecture.id;
  const basePath = `/lectures/${currentLectureId}`;

  return (
    <div className="lecture-layout">
      {/* --------------------------------------------------
          LEFT SIDEBAR 
      -------------------------------------------------- */}
      <aside className="lecture-sidebar">
        <h3 className="sidebar-title">Lectures</h3>

        <ul className="sidebar-lecture-list">
          {lecturesData.map((lec) => (
            <li key={lec.id}>
              <Link
                to={`/lectures/${lec.id}`}
                className={`sidebar-link ${
                  lec.id === currentLectureId ? "active" : ""
                }`}
              >
                {lec.title}
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* --------------------------------------------------
          MAIN CONTENT AREA
      -------------------------------------------------- */}
      <section className="lecture-main">
        {/* Topic header (title + metadata) */}
        <header className="lecture-topic-header">
          <h1 className="lecture-title">{lecture.title}</h1>
        </header>

        {/* Horizontal style tabs */}
        <TopicSubNav basePath={basePath} />

        {/* Nested content (video, notes, quizzes, etc.) */}
        <main className="lecture-content-area">
          <Outlet context={{ lecture }} />
        </main>
      </section>
    </div>
  );
}
