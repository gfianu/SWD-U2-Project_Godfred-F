import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import "../styles/LectureList.css";
import { API_BASE_URL } from "../api/config";

function LectureList() {
  const [lectures, setLectures] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function loadLectures() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`${API_BASE_URL}/api/lectures`);
        if (!res.ok) {
          throw new Error(`Failed to load lectures (${res.status})`);
        }

        const data = await res.json();
        if (!ignore) setLectures(Array.isArray(data) ? data : []);
      } catch (err) {
        if (!ignore) setError(err.message || "Something went wrong.");
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    loadLectures();
    return () => {
      ignore = true;
    };
  }, []);

  const filtered = useMemo(() => {
    return lectures.filter((lec) =>
      lec.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [lectures, search]);

  return (
    <section className="lecture-list container">
      <h2 className="lecture-heading">Lecture Library</h2>

      <input
        type="text"
        className="lecture-search"
        placeholder="Search lectures..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="Search lectures"
      />

      {loading && <p className="muted">Loading lectures…</p>}

      {!loading && error && (
        <p className="muted">
          {error}{" "}
          <button
            onClick={() => window.location.reload()}
            style={{ marginLeft: "0.5rem" }}
          >
            Retry
          </button>
        </p>
      )}

      {!loading && !error && (
        <ul className="lecture-list-ul">
          {filtered.length === 0 ? (
            <li className="no-results">No lectures found.</li>
          ) : (
            filtered.map((lecture) => (
              <li key={lecture.id} className="lecture-list-item">
                <div className="lecture-card">
                  <h3>{lecture.title}</h3>

                  <Link to={`/lectures/${lecture.id}`}>
                    <Button label="View Topic" variant="primary" />
                  </Link>
                </div>
              </li>
            ))
          )}
        </ul>
      )}
    </section>
  );
}

export default LectureList;


