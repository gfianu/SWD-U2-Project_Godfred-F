import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, requireInstructor = false }) {
  const { isAuthenticated, isInstructor, loading } = useAuth();

  if (loading) return <p className="muted">Checking authentication...</p>;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (requireInstructor && !isInstructor) {
    return <Navigate to="/" replace />;
  }

  return children;
}