import { useEffect, useMemo, useState } from "react";
import { API_BASE_URL } from "../api/config";
import { useAuth } from "../context/AuthContext";
import "../styles/InstructorLectureManager.css";

const initialLectureForm = {
  title: "",
  orderIndex: "",
};

const initialVideoForm = {
  name: "",
  url: "",
  orderIndex: "",
};

const initialNoteForm = {
  name: "",
  noteUrl: "",
  keyUrl: "",
  orderIndex: "",
};

export default function InstructorLectureManager() {
  const { token } = useAuth();

  const [lectures, setLectures] = useState([]);
  const [selectedLectureId, setSelectedLectureId] = useState("");
  const [selectedLectureDetail, setSelectedLectureDetail] = useState(null);

  const [lectureForm, setLectureForm] = useState(initialLectureForm);
  const [editingLectureId, setEditingLectureId] = useState("");

  const [videoForm, setVideoForm] = useState(initialVideoForm);
  const [editingVideoId, setEditingVideoId] = useState("");

  const [noteForm, setNoteForm] = useState(initialNoteForm);
  const [editingNoteId, setEditingNoteId] = useState("");

  const [loadingLectures, setLoadingLectures] = useState(true);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadLectures();
  }, []);

  useEffect(() => {
    if (selectedLectureId) {
      loadLectureDetail(selectedLectureId);
    } else {
      setSelectedLectureDetail(null);
      resetVideoForm();
      resetNoteForm();
    }
  }, [selectedLectureId]);

  async function loadLectures() {
    try {
      setLoadingLectures(true);
      setError("");

      const res = await fetch(`${API_BASE_URL}/api/lectures`);
      if (!res.ok) {
        throw new Error(`Failed to load lectures (${res.status})`);
      }

      const data = await res.json();
      setLectures(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Failed to load lectures.");
    } finally {
      setLoadingLectures(false);
    }
  }

  async function loadLectureDetail(lectureId) {
    try {
      setLoadingDetail(true);
      setError("");

      const res = await fetch(`${API_BASE_URL}/api/lectures/${lectureId}`);
      if (!res.ok) {
        throw new Error(`Failed to load lecture detail (${res.status})`);
      }

      const data = await res.json();
      setSelectedLectureDetail(data);
    } catch (err) {
      setError(err.message || "Failed to load lecture detail.");
    } finally {
      setLoadingDetail(false);
    }
  }

  const sortedLectures = useMemo(() => {
    return [...lectures].sort((a, b) => a.id - b.id);
  }, [lectures]);

  function clearMessages() {
    setMessage("");
    setError("");
  }

  function resetLectureForm() {
    setLectureForm(initialLectureForm);
    setEditingLectureId("");
  }

  function resetVideoForm() {
    setVideoForm(initialVideoForm);
    setEditingVideoId("");
  }

  function resetNoteForm() {
    setNoteForm(initialNoteForm);
    setEditingNoteId("");
  }

  function handleLectureFormChange(e) {
    const { name, value } = e.target;
    setLectureForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleVideoFormChange(e) {
    const { name, value } = e.target;
    setVideoForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleNoteFormChange(e) {
    const { name, value } = e.target;
    setNoteForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleCreateLecture(e) {
    e.preventDefault();
    clearMessages();

    try {
      setSubmitting(true);

      const res = await fetch(`${API_BASE_URL}/api/lectures`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: lectureForm.title,
          orderIndex: lectureForm.orderIndex ? Number(lectureForm.orderIndex) : null,
        }),
      });

      const data = await safeReadJson(res);

      if (!res.ok) {
        throw new Error(
          typeof data === "string" ? data : data?.message || "Failed to create lecture"
        );
      }

      await loadLectures();
      setMessage(`Lecture created successfully: ${data.title}`);
      resetLectureForm();
    } catch (err) {
      setError(err.message || "Failed to create lecture.");
    } finally {
      setSubmitting(false);
    }
  }

  function startEditLecture(lecture) {
    clearMessages();
    setEditingLectureId(String(lecture.id));
    setLectureForm({
      title: lecture.title ?? "",
      orderIndex: lecture.orderIndex ?? "",
    });
  }

  async function handleUpdateLecture(e) {
    e.preventDefault();
    if (!editingLectureId) return;
    clearMessages();

    try {
      setSubmitting(true);

      const res = await fetch(`${API_BASE_URL}/api/lectures/${editingLectureId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: lectureForm.title,
          orderIndex: lectureForm.orderIndex ? Number(lectureForm.orderIndex) : null,
        }),
      });

      const data = await safeReadJson(res);

      if (!res.ok) {
        throw new Error(
          typeof data === "string" ? data : data?.message || "Failed to update lecture"
        );
      }

      await loadLectures();
      if (selectedLectureId === editingLectureId) {
        await loadLectureDetail(editingLectureId);
      }
      setMessage(`Lecture updated successfully: ${data.title}`);
      resetLectureForm();
    } catch (err) {
      setError(err.message || "Failed to update lecture.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDeleteLecture(lectureId) {
    const confirmed = window.confirm("Delete this lecture?");
    if (!confirmed) return;

    clearMessages();

    try {
      setSubmitting(true);

      const res = await fetch(`${API_BASE_URL}/api/lectures/${lectureId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok && res.status !== 204) {
        const data = await safeReadJson(res);
        throw new Error(
          typeof data === "string" ? data : data?.message || "Failed to delete lecture"
        );
      }

      await loadLectures();

      if (String(selectedLectureId) === String(lectureId)) {
        setSelectedLectureId("");
        setSelectedLectureDetail(null);
      }

      if (String(editingLectureId) === String(lectureId)) {
        resetLectureForm();
      }

      setMessage("Lecture deleted successfully.");
    } catch (err) {
      setError(err.message || "Failed to delete lecture.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleCreateVideo(e) {
    e.preventDefault();
    if (!selectedLectureId) {
      setError("Please select a lecture first.");
      return;
    }

    clearMessages();

    try {
      setSubmitting(true);

      const res = await fetch(`${API_BASE_URL}/api/videos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          lectureId: Number(selectedLectureId),
          name: videoForm.name,
          url: videoForm.url,
          orderIndex: videoForm.orderIndex ? Number(videoForm.orderIndex) : null,
        }),
      });

      const data = await safeReadJson(res);

      if (!res.ok) {
        throw new Error(
          typeof data === "string" ? data : data?.message || "Failed to create video"
        );
      }

      await loadLectureDetail(selectedLectureId);
      setMessage(`Video created successfully: ${data.name}`);
      resetVideoForm();
    } catch (err) {
      setError(err.message || "Failed to create video.");
    } finally {
      setSubmitting(false);
    }
  }

  function startEditVideo(video) {
    clearMessages();
    setEditingVideoId(String(video.id));
    setVideoForm({
      name: video.name ?? "",
      url: video.url ?? "",
      orderIndex: video.orderIndex ?? "",
    });
  }

  async function handleUpdateVideo(e) {
    e.preventDefault();
    if (!editingVideoId) return;
    clearMessages();

    try {
      setSubmitting(true);

      const res = await fetch(`${API_BASE_URL}/api/videos/${editingVideoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: videoForm.name,
          url: videoForm.url,
          orderIndex: videoForm.orderIndex ? Number(videoForm.orderIndex) : null,
        }),
      });

      const data = await safeReadJson(res);

      if (!res.ok) {
        throw new Error(
          typeof data === "string" ? data : data?.message || "Failed to update video"
        );
      }

      await loadLectureDetail(selectedLectureId);
      setMessage(`Video updated successfully: ${data.name}`);
      resetVideoForm();
    } catch (err) {
      setError(err.message || "Failed to update video.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDeleteVideo(videoId) {
    const confirmed = window.confirm("Delete this video?");
    if (!confirmed) return;

    clearMessages();

    try {
      setSubmitting(true);

      const res = await fetch(`${API_BASE_URL}/api/videos/${videoId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok && res.status !== 204) {
        const data = await safeReadJson(res);
        throw new Error(
          typeof data === "string" ? data : data?.message || "Failed to delete video"
        );
      }

      await loadLectureDetail(selectedLectureId);

      if (String(editingVideoId) === String(videoId)) {
        resetVideoForm();
      }

      setMessage("Video deleted successfully.");
    } catch (err) {
      setError(err.message || "Failed to delete video.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleCreateNote(e) {
    e.preventDefault();
    if (!selectedLectureId) {
      setError("Please select a lecture first.");
      return;
    }

    clearMessages();

    try {
      setSubmitting(true);

      const res = await fetch(`${API_BASE_URL}/api/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          lectureId: Number(selectedLectureId),
          name: noteForm.name,
          noteUrl: noteForm.noteUrl,
          keyUrl: noteForm.keyUrl,
          orderIndex: noteForm.orderIndex ? Number(noteForm.orderIndex) : null,
        }),
      });

      const data = await safeReadJson(res);

      if (!res.ok) {
        throw new Error(
          typeof data === "string" ? data : data?.message || "Failed to create note"
        );
      }

      await loadLectureDetail(selectedLectureId);
      setMessage(`Note created successfully: ${data.name}`);
      resetNoteForm();
    } catch (err) {
      setError(err.message || "Failed to create note.");
    } finally {
      setSubmitting(false);
    }
  }

  function startEditNote(note) {
    clearMessages();
    setEditingNoteId(String(note.id));
    setNoteForm({
      name: note.name ?? "",
      noteUrl: note.noteUrl ?? "",
      keyUrl: note.keyUrl ?? "",
      orderIndex: note.orderIndex ?? "",
    });
  }

  async function handleUpdateNote(e) {
    e.preventDefault();
    if (!editingNoteId) return;
    clearMessages();

    try {
      setSubmitting(true);

      const res = await fetch(`${API_BASE_URL}/api/notes/${editingNoteId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: noteForm.name,
          noteUrl: noteForm.noteUrl,
          keyUrl: noteForm.keyUrl,
          orderIndex: noteForm.orderIndex ? Number(noteForm.orderIndex) : null,
        }),
      });

      const data = await safeReadJson(res);

      if (!res.ok) {
        throw new Error(
          typeof data === "string" ? data : data?.message || "Failed to update note"
        );
      }

      await loadLectureDetail(selectedLectureId);
      setMessage(`Note updated successfully: ${data.name}`);
      resetNoteForm();
    } catch (err) {
      setError(err.message || "Failed to update note.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDeleteNote(noteId) {
    const confirmed = window.confirm("Delete this note?");
    if (!confirmed) return;

    clearMessages();

    try {
      setSubmitting(true);

      const res = await fetch(`${API_BASE_URL}/api/notes/${noteId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok && res.status !== 204) {
        const data = await safeReadJson(res);
        throw new Error(
          typeof data === "string" ? data : data?.message || "Failed to delete note"
        );
      }

      await loadLectureDetail(selectedLectureId);

      if (String(editingNoteId) === String(noteId)) {
        resetNoteForm();
      }

      setMessage("Note deleted successfully.");
    } catch (err) {
      setError(err.message || "Failed to delete note.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="ilm-page container">
      <h2>Lecture Management</h2>
      <p className="ilm-subtitle">
        Create lectures and manage their videos and notes.
      </p>

      {message && <p className="ilm-message success">{message}</p>}
      {error && <p className="ilm-message error">{error}</p>}

      <div className="ilm-layout">
        <div className="ilm-panel">
          <div className="ilm-panel-header">
            <h3>Lectures</h3>
            <button type="button" onClick={resetLectureForm}>
              New Lecture
            </button>
          </div>

          {loadingLectures ? (
            <p className="muted">Loading lectures...</p>
          ) : sortedLectures.length === 0 ? (
            <p className="muted">No lectures available yet.</p>
          ) : (
            <ul className="ilm-list">
              {sortedLectures.map((lecture) => (
                <li
                  key={lecture.id}
                  className={`ilm-list-item ${
                    String(selectedLectureId) === String(lecture.id) ? "active" : ""
                  }`}
                >
                  <div
                    className="ilm-list-main"
                    onClick={() => setSelectedLectureId(String(lecture.id))}
                  >
                    <strong>{lecture.title}</strong>
                    <span>ID: {lecture.id}</span>
                  </div>

                  <div className="ilm-item-actions">
                    <button type="button" onClick={() => startEditLecture(lecture)}>
                      Edit
                    </button>
                    <button
                      type="button"
                      className="danger"
                      onClick={() => handleDeleteLecture(lecture.id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <form
            className="ilm-form"
            onSubmit={editingLectureId ? handleUpdateLecture : handleCreateLecture}
          >
            <h4>{editingLectureId ? "Edit Lecture" : "Create Lecture"}</h4>

            <div className="ilm-field">
              <label htmlFor="lectureTitle">Title</label>
              <input
                id="lectureTitle"
                type="text"
                name="title"
                value={lectureForm.title}
                onChange={handleLectureFormChange}
                required
              />
            </div>

            <div className="ilm-field">
              <label htmlFor="lectureOrderIndex">Order Index</label>
              <input
                id="lectureOrderIndex"
                type="number"
                name="orderIndex"
                value={lectureForm.orderIndex}
                onChange={handleLectureFormChange}
              />
            </div>

            <div className="ilm-form-actions">
              <button type="submit" disabled={submitting}>
                {editingLectureId ? "Update Lecture" : "Create Lecture"}
              </button>
              {editingLectureId && (
                <button type="button" onClick={resetLectureForm}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="ilm-panel">
          <div className="ilm-panel-header">
            <h3>Selected Lecture</h3>
          </div>

          {!selectedLectureId ? (
            <p className="muted">Select a lecture to manage its content.</p>
          ) : loadingDetail ? (
            <p className="muted">Loading lecture detail...</p>
          ) : !selectedLectureDetail ? (
            <p className="muted">Lecture detail unavailable.</p>
          ) : (
            <>
              <div className="ilm-selected-header">
                <h4>{selectedLectureDetail.title}</h4>
                <p>Lecture ID: {selectedLectureDetail.id}</p>
              </div>

              <div className="ilm-content-grid">
                <div className="ilm-subpanel">
                  <div className="ilm-panel-header">
                    <h4>Videos</h4>
                    <button type="button" onClick={resetVideoForm}>
                      New Video
                    </button>
                  </div>

                  {selectedLectureDetail.videos?.length ? (
                    <ul className="ilm-list">
                      {selectedLectureDetail.videos.map((video) => (
                        <li key={video.id} className="ilm-list-item">
                          <div className="ilm-list-main">
                            <strong>{video.name}</strong>
                            <span>{video.url}</span>
                          </div>

                          <div className="ilm-item-actions">
                            <button type="button" onClick={() => startEditVideo(video)}>
                              Edit
                            </button>
                            <button
                              type="button"
                              className="danger"
                              onClick={() => handleDeleteVideo(video.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="muted">No videos yet.</p>
                  )}

                  <form
                    className="ilm-form"
                    onSubmit={editingVideoId ? handleUpdateVideo : handleCreateVideo}
                  >
                    <h5>{editingVideoId ? "Edit Video" : "Add Video"}</h5>

                    <div className="ilm-field">
                      <label htmlFor="videoName">Name</label>
                      <input
                        id="videoName"
                        type="text"
                        name="name"
                        value={videoForm.name}
                        onChange={handleVideoFormChange}
                        required
                      />
                    </div>

                    <div className="ilm-field">
                      <label htmlFor="videoUrl">URL</label>
                      <input
                        id="videoUrl"
                        type="text"
                        name="url"
                        value={videoForm.url}
                        onChange={handleVideoFormChange}
                        required
                      />
                    </div>

                    <div className="ilm-field">
                      <label htmlFor="videoOrderIndex">Order Index</label>
                      <input
                        id="videoOrderIndex"
                        type="number"
                        name="orderIndex"
                        value={videoForm.orderIndex}
                        onChange={handleVideoFormChange}
                      />
                    </div>

                    <div className="ilm-form-actions">
                      <button type="submit" disabled={submitting}>
                        {editingVideoId ? "Update Video" : "Add Video"}
                      </button>
                      {editingVideoId && (
                        <button type="button" onClick={resetVideoForm}>
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </div>

                <div className="ilm-subpanel">
                  <div className="ilm-panel-header">
                    <h4>Notes</h4>
                    <button type="button" onClick={resetNoteForm}>
                      New Note
                    </button>
                  </div>

                  {selectedLectureDetail.notes?.length ? (
                    <ul className="ilm-list">
                      {selectedLectureDetail.notes.map((note) => (
                        <li key={note.id} className="ilm-list-item">
                          <div className="ilm-list-main">
                            <strong>{note.name}</strong>
                            <span>{note.noteUrl || "No note URL"}</span>
                            <span>{note.keyUrl || "No key URL"}</span>
                          </div>

                          <div className="ilm-item-actions">
                            <button type="button" onClick={() => startEditNote(note)}>
                              Edit
                            </button>
                            <button
                              type="button"
                              className="danger"
                              onClick={() => handleDeleteNote(note.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="muted">No notes yet.</p>
                  )}

                  <form
                    className="ilm-form"
                    onSubmit={editingNoteId ? handleUpdateNote : handleCreateNote}
                  >
                    <h5>{editingNoteId ? "Edit Note" : "Add Note"}</h5>

                    <div className="ilm-field">
                      <label htmlFor="noteName">Name</label>
                      <input
                        id="noteName"
                        type="text"
                        name="name"
                        value={noteForm.name}
                        onChange={handleNoteFormChange}
                        required
                      />
                    </div>

                    <div className="ilm-field">
                      <label htmlFor="noteUrl">Note URL</label>
                      <input
                        id="noteUrl"
                        type="text"
                        name="noteUrl"
                        value={noteForm.noteUrl}
                        onChange={handleNoteFormChange}
                      />
                    </div>

                    <div className="ilm-field">
                      <label htmlFor="keyUrl">Key URL</label>
                      <input
                        id="keyUrl"
                        type="text"
                        name="keyUrl"
                        value={noteForm.keyUrl}
                        onChange={handleNoteFormChange}
                      />
                    </div>

                    <div className="ilm-field">
                      <label htmlFor="noteOrderIndex">Order Index</label>
                      <input
                        id="noteOrderIndex"
                        type="number"
                        name="orderIndex"
                        value={noteForm.orderIndex}
                        onChange={handleNoteFormChange}
                      />
                    </div>

                    <div className="ilm-form-actions">
                      <button type="submit" disabled={submitting}>
                        {editingNoteId ? "Update Note" : "Add Note"}
                      </button>
                      {editingNoteId && (
                        <button type="button" onClick={resetNoteForm}>
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </>
          )}
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