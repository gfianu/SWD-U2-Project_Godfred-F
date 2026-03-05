import { useEffect, useMemo, useState } from "react";
import { useParams, Link, Outlet, useNavigate } from "react-router-dom";
import TopicSubNav from "../components/TopicSubNav";
import Button from "../components/Button";
import "../styles/LectureTopicLayout.css";
import { API_BASE_URL } from "../api/config";

export default function LectureTopicLayout() {
  const { id } = useParams();
  const navigate = useNavigate();

  const lectureId = useMemo(() => Number(id), [id]);
  const isValidId = Number.isFinite(lectureId) && lectureId > 0;

  const [lecture, setLecture] = useState(null);

  // Sidebar list
  const [lecturesList, setLecturesList] = useState([]);
  const [listLoading, setListLoading] = useState(true);
  const [listError, setListError] = useState("");

  // Detail loading
  const [detailLoading, setDetailLoading] = useState(true);
  const [detailError, setDetailError] = useState("");

  // 1) Load sidebar lecture list ONCE
  useEffect(() => {
    let ignore = false;

    async function loadList() {
      try {
        setListLoading(true);
        setListError("");

        const res = await fetch(`${API_BASE_URL}/api/lectures`);
        if (!res.ok) throw new Error(`Failed to load lectures (${res.status})`);

        const data = await res.json();
        if (!ignore) setLecturesList(Array.isArray(data) ? data : []);
      } catch (err) {
        if (!ignore) setListError(err?.message || "Failed to load lectures.");
      } finally {
        if (!ignore) setListLoading(false);
      }
    }

    loadList();
    return () => {
      ignore = true;
    };
  }, []);

  // 2) Load lecture detail when id changes
  useEffect(() => {
    let ignore = false;

    async function loadDetail() {
      if (!isValidId) {
        setLecture(null);
        setDetailLoading(false);
        setDetailError("");
        return;
      }

      try {
        setDetailLoading(true);
        setDetailError("");

        const res = await fetch(`${API_BASE_URL}/api/lectures/${lectureId}`);

        if (res.status === 404) {
          if (!ignore) setLecture(null);
          return;
        }

        if (!res.ok) throw new Error(`Failed to load lecture (${res.status})`);

        const data = await res.json();
        if (!ignore) setLecture(data);
      } catch (err) {
        if (!ignore) setDetailError(err?.message || "Failed to load lecture.");
      } finally {
        if (!ignore) setDetailLoading(false);
      }
    }

    loadDetail();
    return () => {
      ignore = true;
    };
  }, [lectureId, isValidId]);

  const basePath = `/lectures/${lectureId}`;

  // ---- UI states ----
  if (listLoading || detailLoading) {
    return (
      <section className="container">
        <p className="muted">Loading lecture…</p>
      </section>
    );
  }

  if (listError || detailError) {
    const msg = listError || detailError;
    return (
      <section className="container">
        <p className="muted">
          {msg}{" "}
          <button
            onClick={() => navigate(0)}
            style={{ marginLeft: "0.5rem" }}
          >
            Retry
          </button>
        </p>
      </section>
    );
  }

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
                className={`sidebar-link ${lec.id === lecture.id ? "active" : ""}`}
              >
                {lec.title}
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* MAIN CONTENT */}
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