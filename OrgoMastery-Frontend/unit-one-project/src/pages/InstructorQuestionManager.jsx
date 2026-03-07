import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../api/config";
import "../styles/InstructorQuestionManager.css";

const initialForm = {
  quizId: "",
  prompt: "",
  choiceA: "",
  choiceB: "",
  choiceC: "",
  choiceD: "",
  correctChoice: "A",
  orderIndex: "",
};

export default function InstructorQuestionManager() {
  const { token } = useAuth();

  const [lectures, setLectures] = useState([]);
  const [selectedLectureId, setSelectedLectureId] = useState("");
  const [selectedQuizId, setSelectedQuizId] = useState("");

  const [questions, setQuestions] = useState([]);
  const [questionId, setQuestionId] = useState("");
  const [formData, setFormData] = useState(initialForm);

  const [loadingLectures, setLoadingLectures] = useState(true);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // -----------------------------
  // load lectures + nested quizzes
  // -----------------------------
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
        if (!ignore) setError(err.message || "Failed to load lectures.");
      } finally {
        if (!ignore) setLoadingLectures(false);
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

  // -----------------------------
  // load questions for selected quiz
  // -----------------------------
  useEffect(() => {
    let ignore = false;

    async function loadQuestionsForQuiz() {
      if (!selectedQuizId) {
        setQuestions([]);
        return;
      }

      try {
        setLoadingQuestions(true);
        setError("");
        setQuestions([]);

        const quizRes = await fetch(`${API_BASE_URL}/api/quizzes/${selectedQuizId}`);
        if (!quizRes.ok) {
          throw new Error(`Failed to load quiz (${quizRes.status})`);
        }

        const quizData = await quizRes.json();

        // load full admin question records one-by-one using existing endpoint
        const fullQuestions = await Promise.all(
          (quizData.questions || []).map(async (q) => {
            const res = await fetch(`${API_BASE_URL}/api/questions/${q.id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            if (!res.ok) {
              throw new Error(`Failed to load question ${q.id} (${res.status})`);
            }

            return res.json();
          })
        );

        fullQuestions.sort((a, b) => {
          const orderA = a.orderIndex ?? Number.MAX_SAFE_INTEGER;
          const orderB = b.orderIndex ?? Number.MAX_SAFE_INTEGER;
          return orderA - orderB;
        });

        if (!ignore) {
          setQuestions(fullQuestions);
        }
      } catch (err) {
        if (!ignore) setError(err.message || "Failed to load questions.");
      } finally {
        if (!ignore) setLoadingQuestions(false);
      }
    }

    loadQuestionsForQuiz();
    return () => {
      ignore = true;
    };
  }, [selectedQuizId, token]);

  function handleLectureChange(e) {
    const lectureId = e.target.value;
    setSelectedLectureId(lectureId);
    setSelectedQuizId("");
    setQuestions([]);
    resetFormOnly();
    setMessage("");
    setError("");
  }

  function handleQuizChange(e) {
    const quizId = e.target.value;
    setSelectedQuizId(quizId);
    setQuestionId("");
    setFormData((prev) => ({
      ...prev,
      quizId,
    }));
    setMessage("");
    setError("");
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function resetFormOnly() {
    setQuestionId("");
    setFormData({
      ...initialForm,
      quizId: selectedQuizId || "",
    });
  }

  function clearAll() {
    setQuestionId("");
    setFormData(initialForm);
    setMessage("");
    setError("");
  }

  function loadQuestionIntoForm(question) {
    setQuestionId(String(question.id));
    setFormData({
      quizId: String(question.quizId ?? selectedQuizId ?? ""),
      prompt: question.prompt ?? "",
      choiceA: question.choiceA ?? "",
      choiceB: question.choiceB ?? "",
      choiceC: question.choiceC ?? "",
      choiceD: question.choiceD ?? "",
      correctChoice: question.correctChoice ?? "A",
      orderIndex: question.orderIndex ?? "",
    });
    setMessage(`Loaded question ${question.id}.`);
    setError("");
  }

  async function handleCreate(e) {
    e.preventDefault();

    if (!selectedQuizId && !formData.quizId) {
      setError("Please select a lecture and quiz first.");
      setMessage("");
      return;
    }

    setMessage("");
    setError("");

    try {
      setSubmitting(true);

      const payload = {
        quizId: Number(formData.quizId || selectedQuizId),
        prompt: formData.prompt,
        choiceA: formData.choiceA,
        choiceB: formData.choiceB,
        choiceC: formData.choiceC,
        choiceD: formData.choiceD,
        correctChoice: formData.correctChoice,
        orderIndex: formData.orderIndex ? Number(formData.orderIndex) : null,
      };

      const res = await fetch(`${API_BASE_URL}/api/questions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await safeReadJson(res);

      if (!res.ok) {
        throw new Error(
          typeof data === "string" ? data : data?.message || "Failed to create question"
        );
      }

      setMessage(`Question created successfully (ID: ${data.id}).`);
      setQuestionId(String(data.id));
      setFormData({
        quizId: String(data.quizId ?? ""),
        prompt: data.prompt ?? "",
        choiceA: data.choiceA ?? "",
        choiceB: data.choiceB ?? "",
        choiceC: data.choiceC ?? "",
        choiceD: data.choiceD ?? "",
        correctChoice: data.correctChoice ?? "A",
        orderIndex: data.orderIndex ?? "",
      });

      // refresh list
      if (selectedQuizId) {
        setQuestions((prev) =>
          [...prev, data].sort((a, b) => {
            const orderA = a.orderIndex ?? Number.MAX_SAFE_INTEGER;
            const orderB = b.orderIndex ?? Number.MAX_SAFE_INTEGER;
            return orderA - orderB;
          })
        );
      }
    } catch (err) {
      setError(err.message || "Failed to create question.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();

    if (!questionId.trim()) {
      setError("Load a question before updating.");
      setMessage("");
      return;
    }

    setMessage("");
    setError("");

    try {
      setSubmitting(true);

      const payload = {
        prompt: formData.prompt,
        choiceA: formData.choiceA,
        choiceB: formData.choiceB,
        choiceC: formData.choiceC,
        choiceD: formData.choiceD,
        correctChoice: formData.correctChoice,
        orderIndex: formData.orderIndex ? Number(formData.orderIndex) : null,
      };

      const res = await fetch(`${API_BASE_URL}/api/questions/${questionId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await safeReadJson(res);

      if (!res.ok) {
        throw new Error(
          typeof data === "string" ? data : data?.message || "Failed to update question"
        );
      }

      setMessage(`Question ${data.id} updated successfully.`);

      setQuestions((prev) =>
        prev
          .map((q) => (String(q.id) === String(data.id) ? data : q))
          .sort((a, b) => {
            const orderA = a.orderIndex ?? Number.MAX_SAFE_INTEGER;
            const orderB = b.orderIndex ?? Number.MAX_SAFE_INTEGER;
            return orderA - orderB;
          })
      );
    } catch (err) {
      setError(err.message || "Failed to update question.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(questionToDeleteId = questionId) {
    if (!String(questionToDeleteId).trim()) {
      setError("Select a question before deleting.");
      setMessage("");
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete question ${questionToDeleteId}?`
    );
    if (!confirmed) return;

    setMessage("");
    setError("");

    try {
      setSubmitting(true);

      const res = await fetch(`${API_BASE_URL}/api/questions/${questionToDeleteId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok && res.status !== 204) {
        const data = await safeReadJson(res);
        throw new Error(
          typeof data === "string" ? data : data?.message || "Failed to delete question"
        );
      }

      setQuestions((prev) =>
        prev.filter((q) => String(q.id) !== String(questionToDeleteId))
      );

      if (String(questionId) === String(questionToDeleteId)) {
        resetFormOnly();
      }

      setMessage(`Question ${questionToDeleteId} deleted successfully.`);
    } catch (err) {
      setError(err.message || "Failed to delete question.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="iqm-page container">
      <h2>Question Management</h2>
      <p className="iqm-subtitle">
        Select a lecture and quiz, then create, edit, or delete questions.
      </p>

      <div className="iqm-controls">
        <div className="iqm-field">
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

        <div className="iqm-field">
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

      {message && <p className="iqm-message success">{message}</p>}
      {error && <p className="iqm-message error">{error}</p>}

      <div className="iqm-layout">
        <div className="iqm-panel">
          <div className="iqm-panel-header">
            <h3>Questions in Selected Quiz</h3>
          </div>

          {!selectedQuizId ? (
            <p className="muted">Select a quiz to view its questions.</p>
          ) : loadingQuestions ? (
            <p className="muted">Loading questions...</p>
          ) : questions.length === 0 ? (
            <p className="muted">No questions found for this quiz yet.</p>
          ) : (
            <ul className="iqm-question-list">
              {questions.map((question) => (
                <li
                  key={question.id}
                  className={`iqm-question-item ${
                    String(question.id) === String(questionId) ? "active" : ""
                  }`}
                >
                  <div className="iqm-question-content">
                    <strong>Q{question.orderIndex ?? "?"}</strong>
                    <span>{question.prompt}</span>
                  </div>

                  <div className="iqm-question-actions">
                    <button
                      type="button"
                      onClick={() => loadQuestionIntoForm(question)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="danger"
                      onClick={() => handleDelete(question.id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="iqm-panel">
          <div className="iqm-panel-header">
            <h3>{questionId ? `Edit Question #${questionId}` : "Create New Question"}</h3>
            <button type="button" onClick={clearAll}>
              Clear
            </button>
          </div>

          <form
            className="iqm-form"
            onSubmit={questionId ? handleUpdate : handleCreate}
          >
            <div className="iqm-field">
              <label htmlFor="quizId">Quiz ID</label>
              <input
                id="quizId"
                type="number"
                name="quizId"
                value={formData.quizId}
                onChange={handleChange}
                required
                disabled={!!questionId || !!selectedQuizId}
              />
              {(questionId || selectedQuizId) && (
                <small className="iqm-help">
                  Quiz ID is locked while editing or when a quiz is selected above.
                </small>
              )}
            </div>

            <div className="iqm-field">
              <label htmlFor="prompt">Question Prompt</label>
              <textarea
                id="prompt"
                name="prompt"
                rows="3"
                value={formData.prompt}
                onChange={handleChange}
                required
              />
            </div>

            <div className="iqm-field">
              <label htmlFor="choiceA">Choice A</label>
              <input
                id="choiceA"
                type="text"
                name="choiceA"
                value={formData.choiceA}
                onChange={handleChange}
                required
              />
            </div>

            <div className="iqm-field">
              <label htmlFor="choiceB">Choice B</label>
              <input
                id="choiceB"
                type="text"
                name="choiceB"
                value={formData.choiceB}
                onChange={handleChange}
                required
              />
            </div>

            <div className="iqm-field">
              <label htmlFor="choiceC">Choice C</label>
              <input
                id="choiceC"
                type="text"
                name="choiceC"
                value={formData.choiceC}
                onChange={handleChange}
                required
              />
            </div>

            <div className="iqm-field">
              <label htmlFor="choiceD">Choice D</label>
              <input
                id="choiceD"
                type="text"
                name="choiceD"
                value={formData.choiceD}
                onChange={handleChange}
                required
              />
            </div>

            <div className="iqm-row">
              <div className="iqm-field">
                <label htmlFor="correctChoice">Correct Choice</label>
                <select
                  id="correctChoice"
                  name="correctChoice"
                  value={formData.correctChoice}
                  onChange={handleChange}
                  required
                >
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </select>
              </div>

              <div className="iqm-field">
                <label htmlFor="orderIndex">Order Index</label>
                <input
                  id="orderIndex"
                  type="number"
                  name="orderIndex"
                  value={formData.orderIndex}
                  onChange={handleChange}
                  placeholder="Optional"
                />
              </div>
            </div>

            <div className="iqm-form-actions">
              <button type="submit" disabled={submitting}>
                {submitting
                  ? questionId
                    ? "Updating..."
                    : "Creating..."
                  : questionId
                  ? "Update Question"
                  : "Create Question"}
              </button>

              {questionId && (
                <button
                  type="button"
                  onClick={() => {
                    setQuestionId("");
                    setMessage("");
                    setError("");
                  }}
                  disabled={submitting}
                >
                  Switch to Create Mode
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

async function safeReadJson(res) {
  const contentType = res.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return res.json();
  }
  return res.text();
}