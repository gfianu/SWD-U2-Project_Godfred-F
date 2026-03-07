import { useEffect, useState } from "react";
import Button from "../components/Button";
import "../styles/comments.css";
import { API_BASE_URL } from "../api/config";
import { useAuth } from "../context/AuthContext";

export default function Comments({ videoId }) {
  const { token, user, isAuthenticated, isInstructor } = useAuth();

  const [comments, setComments] = useState([]);
  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let ignore = false;

    async function loadComments() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`${API_BASE_URL}/api/comments/video/${videoId}`);
        if (!res.ok) {
          throw new Error(`Failed to load comments (${res.status})`);
        }

        const data = await res.json();
        if (!ignore) {
          setComments(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || "Failed to load comments.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadComments();
    return () => {
      ignore = true;
    };
  }, [videoId]);

  async function addComment() {
    if (!isAuthenticated) {
      setError("Please log in to post a comment.");
      return;
    }

    if (!input.trim()) return;

    try {
      setPosting(true);
      setError("");
      setMessage("");

      const res = await fetch(`${API_BASE_URL}/api/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          videoId,
          text: input.trim(),
        }),
      });

      const data = await safeReadJson(res);

      if (!res.ok) {
        throw new Error(
          typeof data === "string" ? data : data?.message || "Failed to post comment"
        );
      }

      setComments((prev) => [...prev, data]);
      setInput("");
      setMessage("Comment posted successfully.");
    } catch (err) {
      setError(err.message || "Failed to post comment.");
    } finally {
      setPosting(false);
    }
  }

  async function deleteComment(commentId) {
    if (!isAuthenticated) return;

    const confirmed = window.confirm("Delete this comment?");
    if (!confirmed) return;

    try {
      setDeletingId(commentId);
      setError("");
      setMessage("");

      const res = await fetch(`${API_BASE_URL}/api/comments/${commentId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok && res.status !== 204) {
        const data = await safeReadJson(res);
        throw new Error(
          typeof data === "string" ? data : data?.message || "Failed to delete comment"
        );
      }

      setComments((prev) => prev.filter((c) => c.id !== commentId));
      setMessage("Comment deleted.");
    } catch (err) {
      setError(err.message || "Failed to delete comment.");
    } finally {
      setDeletingId(null);
    }
  }

  function canDelete(comment) {
    if (!user) return false;
    return isInstructor || user.id === comment.userId;
  }

  return (
    <div className="comments-container">
      <h3>Comments</h3>

      {/* Comment input */}
      <div className="comment-input">
        <textarea
          placeholder={
            isAuthenticated
              ? "Add a comment..."
              : "Log in to join the discussion..."
          }
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={!isAuthenticated || posting}
        />

        <Button
          label={posting ? "Posting..." : "Post Comment"}
          onClick={addComment}
          variant="primary"
          disabled={!isAuthenticated || posting || !input.trim()}
        />
      </div>

      {!isAuthenticated && (
        <p className="muted">You must be logged in to post a comment.</p>
      )}

      {message && <p className="muted">{message}</p>}
      {error && <p className="muted">{error}</p>}

      {/* Comments List */}
      <div className="comments-scroll-area">
        {loading ? (
          <p className="muted">Loading comments...</p>
        ) : comments.length === 0 ? (
          <p className="muted">No comments yet. Start the discussion.</p>
        ) : (
          <ul className="comments-list">
            {comments.map((c) => (
              <li key={c.id} className="comment-item">
                <div className="comment-meta">
                  <strong>{c.username}</strong>
                  {c.role ? <span className="comment-role"> ({c.role})</span> : null}
                  {c.createdAt ? (
                    <span className="comment-date">
                      {" "}
                      • {new Date(c.createdAt).toLocaleString()}
                    </span>
                  ) : null}
                </div>

                <p className="comment-text">{c.text}</p>

                {canDelete(c) && (
                  <div className="comment-actions">
                    <button
                      className="delete-btn"
                      onClick={() => deleteComment(c.id)}
                      disabled={deletingId === c.id}
                    >
                      {deletingId === c.id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

async function safeReadJson(res) {
  const contentType = res.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return res.json();
  }
  return res.text();
}
