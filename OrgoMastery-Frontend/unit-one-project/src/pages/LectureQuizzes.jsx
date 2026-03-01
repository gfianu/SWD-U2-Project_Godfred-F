import { useOutletContext, Link } from "react-router-dom";
import quizzesData from "../data/quizzesData";
import Button from "../components/Button";

export default function LectureQuizzes() {
  const { lecture } = useOutletContext();

  const filtered = quizzesData.filter((q) => q.title === lecture.title);

  return (
    <section>
      {filtered.length === 0 ? (
        <p className="muted">No quizzes available for this lecture yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {filtered.map((q) => (
            <li
              key={q.id}
              style={{
                marginBottom: "1rem",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Link to={`${q.id}`}>
                <Button
                  label={`Take Quiz for ${lecture.title}`}
                  variant="primary"
                />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

