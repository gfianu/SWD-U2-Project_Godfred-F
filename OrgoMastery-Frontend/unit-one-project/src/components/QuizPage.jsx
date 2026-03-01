import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/QuizPage.css";
import quizzesData from "../data/quizzesData";
import Button from "./Button";

export default function QuizPage() {
  const { quizId } = useParams();
  const quiz = quizzesData.find((q) => q.id === Number(quizId));

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);

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

  const currentQuestion = quiz.questions[currentIndex];

  function handleSelect(opt) {
    setSelected(opt);
  }

  function handleNext() {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = selected;
    setAnswers(newAnswers);

    setSelected(null);
    setCurrentIndex((prev) => prev + 1);
  }

  function handleBack() {
    if (currentIndex === 0) return;

    setSelected(answers[currentIndex - 1] || null);
    setCurrentIndex((prev) => prev - 1);
  }

  function handleSubmit() {
    const finalAnswers = [...answers];
    finalAnswers[currentIndex] = selected;
    setAnswers(finalAnswers);

    setSubmitted(true);

    // Save quiz score + last activity
    localStorage.setItem(
      `quizScore_${quiz.title}`,
      `${
        finalAnswers.filter((ans, idx) => ans === quiz.questions[idx].correct)
          .length
      }/${quiz.questions.length}`
    );

    localStorage.setItem(
      `activity_${quiz.title}`,
      `Completed Quiz (${
        finalAnswers.filter((ans, idx) => ans === quiz.questions[idx].correct)
          .length
      } correct)`
    );
  }

  const score = answers.filter(
    (ans, idx) => ans === quiz.questions[idx].correct
  ).length;

  return (
    <section className="quiz-page container">
      <h2>{quiz.title}</h2>

      {!submitted ? (
        <>
          <p className="question-number">
            Question {currentIndex + 1} of {quiz.questions.length}
          </p>

          <div className="quiz-card">
            <p className="quiz-question">{currentQuestion.question}</p>

            <ul className="quiz-options">
              {currentQuestion.options.map((opt) => (
                <li
                  key={opt}
                  onClick={() => handleSelect(opt)}
                  className={selected === opt ? "selected" : ""}
                >
                  {opt}
                </li>
              ))}
            </ul>
          </div>

          <div className="quiz-nav">
            <Button
              label="Back"
              variant="secondary"
              onClick={handleBack}
              disabled={currentIndex === 0}
            />

            {currentIndex === quiz.questions.length - 1 ? (
              <Button
                label="Submit Quiz"
                variant="primary"
                onClick={handleSubmit}
                disabled={!selected}
              />
            ) : (
              <Button
                label="Next"
                variant="primary"
                onClick={handleNext}
                disabled={!selected}
              />
            )}
          </div>
        </>
      ) : (
        <div className="quiz-result-box">
          <h2>Quiz Complete!</h2>
          <p>
            You scored <strong>{score}</strong> out of{" "}
            <strong>{quiz.questions.length}</strong>.
          </p>

          <h3 className="review-title">Review Incorrect Answers</h3>

          <ul className="review-list">
            {quiz.questions.map((q, idx) => {
              const userAnswer = answers[idx];
              const isCorrect = userAnswer === q.correct;

              if (isCorrect) return null;

              return (
                <li key={idx} className="review-item">
                  <p className="review-question">{q.question}</p>
                  <p className="review-your-answer">
                    Your answer: <strong>{userAnswer || "No answer"}</strong>
                  </p>
                  <p className="review-correct">
                    Correct answer: <strong>{q.correct}</strong>
                  </p>
                </li>
              );
            })}
          </ul>

          <div className="quiz-nav">
            <Button
              label="Retake Quiz"
              variant="primary"
              onClick={() => window.location.reload()}
            />
          </div>
        </div>
      )}
    </section>
  );
}
