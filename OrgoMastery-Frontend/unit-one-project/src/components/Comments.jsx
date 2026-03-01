import { useState, useEffect } from "react";
import Button from "../components/Button";
import "../styles/comments.css";

export default function Comments({ lectureTitle, videoId }) {
  const storageKey = `comments_${lectureTitle}_${videoId}`;

  const [comments, setComments] = useState([]);
  const [input, setInput] = useState("");

  // Load stored comments
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) setComments(JSON.parse(saved));
  }, [storageKey]);

  // Save to localStorage
  const saveComments = (updated) => {
    setComments(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };

  const addComment = () => {
    if (!input.trim()) return;

    const newComment = {
      id: Date.now(),
      text: input.trim(),
      replies: [],
    };

    saveComments([...comments, newComment]);
    setInput("");
  };

  const addReply = (commentId, replyText) => {
    if (!replyText.trim()) return;

    const updated = comments.map((c) =>
      c.id === commentId
        ? {
            ...c,
            replies: [...c.replies, { id: Date.now(), text: replyText.trim() }],
          }
        : c
    );

    saveComments(updated);
  };

  const deleteComment = (commentId) => {
    saveComments(comments.filter((c) => c.id !== commentId));
  };

  const deleteReply = (commentId, replyId) => {
    const updated = comments.map((c) =>
      c.id === commentId
        ? { ...c, replies: c.replies.filter((r) => r.id !== replyId) }
        : c
    );

    saveComments(updated);
  };

  return (
    <div className="comments-container">
      <h3>Comments</h3>

      {/* Comment input */}
      <div className="comment-input">
        <textarea
          placeholder="Add a comment..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></textarea>

        <Button label="Post Comment" onClick={addComment} variant="primary" />
      </div>

      {/* Comments List */}
      <div className="comments-scroll-area">
        <ul className="comments-list">
          {comments.map((c) => (
            <li key={c.id} className="comment-item">
              <p className="comment-text">{c.text}</p>

              <div className="comment-actions">
                <ReplyBox onReply={(text) => addReply(c.id, text)} />
                <button
                  className="delete-btn"
                  onClick={() => deleteComment(c.id)}
                >
                  Delete
                </button>
              </div>

              {/* Replies */}
              {c.replies.length > 0 && (
                <ul className="reply-list">
                  {c.replies.map((r) => (
                    <li key={r.id} className="reply-item">
                      <p className="reply-text">{r.text}</p>
                      <button
                        className="delete-btn"
                        onClick={() => deleteReply(c.id, r.id)}
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ---------- Reply Box Component ---------- */
function ReplyBox({ onReply }) {
  const [reply, setReply] = useState("");
  const [open, setOpen] = useState(false);

  const submitReply = () => {
    if (!reply.trim()) return;
    onReply(reply);
    setReply("");
    setOpen(false);
  };

  return (
    <div className="reply-box">
      {!open ? (
        // KEEP Reply button subtle
        <button className="reply-btn" onClick={() => setOpen(true)}>
          Reply
        </button>
      ) : (
        <div className="reply-input">
          <input
            type="text"
            value={reply}
            placeholder="Write a reply..."
            onChange={(e) => setReply(e.target.value)}
          />

          {/* Use reusable Button for Send */}
          <Button label="Send" onClick={submitReply} variant="secondary" />
        </div>
      )}
    </div>
  );
}
