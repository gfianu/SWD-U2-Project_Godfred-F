import { useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";
import Button from "../components/Button";

export default function LectureQuizzes() {
  const { lecture } = useOutletContext();

  const title = lecture?.title || "Lecture";
  // From backend: lecture.quizzes is an array of QuizSummaryDto
  const quizzes = lecture?.quizzes ?? [];

  useEffect(() => {
    if (lecture?.title) {
      localStorage.setItem(`activity_${lecture.title}`, "Viewed Quizzes");
    }
  }, [lecture?.title]);

  return (
    <section>
      <h2>Quizzes — {title}</h2>

      {quizzes.length === 0 ? (
        <p className="muted">No quizzes available for this lecture yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {quizzes.map((q) => (
            <li
              key={q.id}
              style={{
                marginBottom: "1rem",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Link to={`${q.id}`}>
                <Button label={`Take ${q.title}`} variant="primary" />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

