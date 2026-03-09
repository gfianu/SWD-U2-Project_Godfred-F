import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({
  children,
  requireInstructor = false,
  requireAdmin = false,
}) {
  const { isAuthenticated, isInstructor, user, loading } = useAuth();

  if (loading) return <p className="muted">Checking authentication...</p>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (requireAdmin && user?.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  if (requireInstructor && !isInstructor && user?.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return children;
}