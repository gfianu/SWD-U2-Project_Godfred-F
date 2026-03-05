import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Button from "../components/Button";
import "../styles/LectureNotes.css";

export default function LectureNotes() {
  const { lecture } = useOutletContext();

  const title = lecture?.title || "Lecture";
  const lectureNotes = lecture?.notes ?? [];

  useEffect(() => {
    if (lecture?.id) {
      localStorage.setItem(`activity_${lecture.id}`, "Viewed Notes");
    }
  }, [lecture?.id]);

  return (
    <section className="lecture-notes">
      <h2>Notes — {title}</h2>

      {lectureNotes.length === 0 ? (
        <p className="muted">No notes available for this topic yet.</p>
      ) : (
        <ul className="notes-list">
          {lectureNotes.map((note) => (
            <li key={note.id} className="note-item">
              <h3>{note.name}</h3>

              <div className="note-links">
                {note.noteUrl ? (
                  <a
                    href={note.noteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    referrerPolicy="no-referrer"
                  >
                    <Button label="View Notes" variant="primary" />
                  </a>
                ) : (
                  <span className="muted">Notes not uploaded yet</span>
                )}

                {note.keyUrl ? (
                  <a
                    href={note.keyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    referrerPolicy="no-referrer"
                  >
                    <Button label="View Key" variant="secondary" />
                  </a>
                ) : (
                  <span className="muted">(No key available)</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}


