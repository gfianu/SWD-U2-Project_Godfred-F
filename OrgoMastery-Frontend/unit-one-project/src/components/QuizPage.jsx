import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/QuizPage.css";
import Button from "./Button";
import { API_BASE_URL } from "../api/config";

export default function QuizPage() {
  const { quizId } = useParams();

  const [quiz, setQuiz] = useState(null);

  // quiz load state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // taking the quiz
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { [questionId]: selectedIndex }
  const [submitted, setSubmitted] = useState(false);

  // submit result from backend
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null); // AttemptResultDto
  const [submitError, setSubmitError] = useState("");

  // ---------- load quiz ----------
  useEffect(() => {
    let ignore = false;

    async function loadQuiz() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`${API_BASE_URL}/api/quizzes/${quizId}`);
        if (res.status === 404) {
          if (!ignore) setQuiz(null);
          return;
        }
        if (!res.ok) throw new Error(`Failed to load quiz (${res.status})`);

        const data = await res.json();
        if (!ignore) setQuiz(data);
      } catch (err) {
        if (!ignore) setError(err?.message || "Something went wrong.");
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    loadQuiz();
    return () => {
      ignore = true;
    };
  }, [quizId]);

  const questions = useMemo(() => quiz?.questions ?? [], [quiz?.questions]);
  const currentQuestion = questions[currentIndex];
  const selectedIndex =
    currentQuestion ? answers[currentQuestion.id] ?? null : null;

  // Require *all* questions answered before submit (more robust)
  const allAnswered =
    questions.length > 0 && questions.every((q) => answers[q.id] !== undefined);

  // ---------- navigation ----------
  function handleSelect(idx) {
    if (!currentQuestion) return;
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: idx }));
  }

  function handleNext() {
    setCurrentIndex((prev) => Math.min(prev + 1, questions.length - 1));
  }

  function handleBack() {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  }

  async function handleSubmit() {
    if (!quiz) return;

    try {
      setSubmitting(true);
      setSubmitError("");

      const payload = {
        answers: questions
          .filter((q) => answers[q.id] !== undefined)
          .map((q) => ({
            questionId: q.id,
            selectedIndex: answers[q.id],
          })),
      };

      const res = await fetch(`${API_BASE_URL}/api/quizzes/${quiz.id}/attempts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`Submit failed (${res.status})`);

      const data = await res.json();
      setResult(data);
      setSubmitted(true);

      // Store activity consistently by lectureId
      localStorage.setItem(
        `activity_${quiz.lectureId}`,
        `Completed Quiz (${data.score} correct)`
      );
    } catch (err) {
      setSubmitError(err?.message || "Failed to submit attempt.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleRetake() {
    // reset local UI state; keeps quiz loaded
    setCurrentIndex(0);
    setAnswers({});
    setSubmitted(false);
    setResult(null);
    setSubmitError("");
  }

  // ---------- render states ----------
  if (loading) {
    return (
      <section className="quiz-page container">
        <p className="muted">Loading quiz…</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="quiz-page container">
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

  if (!quiz) {
    return (
      <section className="quiz-page container">
        <h2>Quiz Not Found</h2>
        <Link to=".." className="btn btn-ghost">
          Back
        </Link>
      </section>
    );
  }

  // ---------- main UI ----------
  return (
    <section className="quiz-page container">
      <h2>{quiz.title}</h2>
      {quiz.description ? <p className="muted">{quiz.description}</p> : null}

      {!submitted ? (
        <>
          <p className="question-number">
            Question {currentIndex + 1} of {questions.length}
          </p>

          {currentQuestion ? (
            <div className="quiz-card">
              <p className="quiz-question">{currentQuestion.prompt}</p>

              <ul className="quiz-options">
                {currentQuestion.options.map((opt, idx) => (
                  <li
                    key={`${currentQuestion.id}-${idx}`}
                    onClick={() => handleSelect(idx)}
                    className={selectedIndex === idx ? "selected" : ""}
                    role="button"
                    tabIndex={0}
                  >
                    {opt}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="muted">No questions found for this quiz.</p>
          )}

          {submitError && <p className="muted">{submitError}</p>}

          <div className="quiz-nav">
            <Button
              label="Back"
              variant="secondary"
              onClick={handleBack}
              disabled={currentIndex === 0 || submitting}
            />

            {currentIndex === questions.length - 1 ? (
              <Button
                label={submitting ? "Submitting…" : "Submit Quiz"}
                variant="primary"
                onClick={handleSubmit}
                disabled={!allAnswered || submitting || questions.length === 0}
              />
            ) : (
              <Button
                label="Next"
                variant="primary"
                onClick={handleNext}
                disabled={selectedIndex === null || submitting}
              />
            )}
          </div>
        </>
      ) : (
        <div className="quiz-result-box">
          <h2>Quiz Complete!</h2>

          <p>
            You scored <strong>{result?.score ?? 0}</strong> out of{" "}
            <strong>{result?.total ?? questions.length}</strong>.
          </p>

          <h3 className="review-title">Review Incorrect Answers</h3>

          {result?.incorrect?.length ? (
            <ul className="review-list">
              {result.incorrect.map((item) => (
                <li key={item.questionId} className="review-item">
                  <p className="review-question">{item.prompt}</p>
                  <p className="review-your-answer">
                    Your answer: <strong>{item.yourAnswer}</strong>
                  </p>
                  <p className="review-correct">
                    Correct answer: <strong>{item.correctAnswer}</strong>
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="muted">Perfect score — nice!</p>
          )}

          <div className="quiz-nav">
            <Button label="Retake Quiz" variant="primary" onClick={handleRetake} />
          </div>

          <div style={{ marginTop: "1rem" }}>
            {/* More future-proof than "to=.." if routing changes later */}
            <Link to={`/lectures/${quiz.lectureId}/quizzes`}>
              <Button label="Back to Quizzes" variant="secondary" />
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
