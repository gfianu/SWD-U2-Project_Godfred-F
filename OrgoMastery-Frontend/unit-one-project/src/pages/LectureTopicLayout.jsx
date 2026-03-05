import { useEffect, useMemo, useState } from "react";
import { useParams, Link, Outlet } from "react-router-dom";
import TopicSubNav from "../components/TopicSubNav";
import Button from "../components/Button";
import "../styles/LectureTopicLayout.css";
import { API_BASE_URL } from "../api/config";

export default function LectureTopicLayout() {
  const { id } = useParams();

  const [lecture, setLecture] = useState(null);
  const [lecturesList, setLecturesList] = useState([]); // for sidebar
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        setLoading(true);
        setError("");

        const [listRes, detailRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/lectures`),
          fetch(`${API_BASE_URL}/api/lectures/${id}`),
        ]);

        if (!listRes.ok) throw new Error(`Failed to load lectures (${listRes.status})`);

        // If lecture id doesn't exist, treat as not found (no hard error)
        if (detailRes.status === 404) {
          const listData = await listRes.json();
          if (!ignore) {
            setLecturesList(Array.isArray(listData) ? listData : []);
            setLecture(null);
          }
          return;
        }

        if (!detailRes.ok) {
          throw new Error(`Failed to load lecture (${detailRes.status})`);
        }

        const [listData, detailData] = await Promise.all([
          listRes.json(),
          detailRes.json(),
        ]);

        if (!ignore) {
          setLecturesList(Array.isArray(listData) ? listData : []);
          setLecture(detailData);
        }
      } catch (err) {
        if (!ignore) setError(err?.message || "Something went wrong.");
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, [id]);

  const currentLectureId = useMemo(() => Number(id), [id]);
  const basePath = `/lectures/${currentLectureId}`;

  // Loading
  if (loading) {
    return (
      <section className="container">
        <p className="muted">Loading lecture…</p>
      </section>
    );
  }

  // Error
  if (error) {
    return (
      <section className="container">
        <p className="muted">
          {error}{" "}
          <button
            onClick={() => window.location.reload()}
            style={{ marginLeft: "0.5rem" }}
          >
            Retry
          </button>
        </p>
      </section>
    );
  }

  // Not found
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

  return (
    <div className="lecture-layout">
      {/* LEFT SIDEBAR */}
      <aside className="lecture-sidebar">
        <h3 className="sidebar-title">Lectures</h3>

        <ul className="sidebar-lecture-list">
          {lecturesList.map((lec) => (
            <li key={lec.id}>
              <Link
                to={`/lectures/${lec.id}`}
                className={`sidebar-link ${
                  lec.id === lecture.id ? "active" : ""
                }`}
              >
                {lec.title}
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* MAIN CONTENT AREA */}
      <section className="lecture-main">
        <header className="lecture-topic-header">
          <h1 className="lecture-title">{lecture.title}</h1>
        </header>

        <TopicSubNav basePath={basePath} />

        <main className="lecture-content-area">
          <Outlet context={{ lecture }} />
        </main>
      </section>
    </div>
  );
}
