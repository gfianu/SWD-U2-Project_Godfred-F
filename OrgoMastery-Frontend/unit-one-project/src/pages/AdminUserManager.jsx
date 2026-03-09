import { useEffect, useState } from "react";
import { API_BASE_URL } from "../api/config";
import { useAuth } from "../context/AuthContext";
import "../styles/AdminUserManager.css";

export default function AdminUserManager() {
  const { token } = useAuth();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${API_BASE_URL}/api/admin/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) throw new Error("Unauthorized");
      if (res.status === 403) throw new Error("Admin access required");
      if (!res.ok) throw new Error(`Failed to load users (${res.status})`);

      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Failed to load users.");
    } finally {
      setLoading(false);
    }
  }

  async function updateRole(userId, role) {
    try {
      setSavingId(userId);
      setError("");
      setMessage("");

      const res = await fetch(`${API_BASE_URL}/api/admin/users/${userId}/role`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role }),
      });

      const data = await safeReadJson(res);

      if (!res.ok) {
        throw new Error(
          typeof data === "string" ? data : data?.message || "Failed to update role"
        );
      }

      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? data : u))
      );
      setMessage(`Updated ${data.username} to ${data.role}.`);
    } catch (err) {
      setError(err.message || "Failed to update role.");
    } finally {
      setSavingId(null);
    }
  }

  return (
    <section className="aum-page container">
      <h2>Admin User Management</h2>
      <p className="aum-subtitle">
        Promote students to instructors or admins, and manage roles safely.
      </p>

      {message && <p className="aum-message success">{message}</p>}
      {error && <p className="aum-message error">{error}</p>}

      {loading ? (
        <p className="muted">Loading users...</p>
      ) : (
        <div className="aum-table-wrap">
          <table className="aum-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Current Role</th>
                <th>Change Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <div className="aum-actions">
                      <button
                        type="button"
                        onClick={() => updateRole(user.id, "STUDENT")}
                        disabled={savingId === user.id || user.role === "STUDENT"}
                      >
                        Make Student
                      </button>
                      <button
                        type="button"
                        onClick={() => updateRole(user.id, "INSTRUCTOR")}
                        disabled={savingId === user.id || user.role === "INSTRUCTOR"}
                      >
                        Make Instructor
                      </button>
                      <button
                        type="button"
                        onClick={() => updateRole(user.id, "ADMIN")}
                        disabled={savingId === user.id || user.role === "ADMIN"}
                      >
                        Make Admin
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
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