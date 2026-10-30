import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user, profile, loading, error, isAdmin } = useAuth();
  const location = useLocation();

  if (loading) {
    return <p className="route-status" role="status"><span className="loading-spinner" aria-hidden="true" /> Checking your account…</p>;
  }

  if (error) {
    return <p className="route-error" role="alert">{error}</p>;
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!profile) {
    return <p className="route-error" role="alert">Your account profile is missing. Please contact an administrator.</p>;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/home" replace />;
  }

  return children;
}