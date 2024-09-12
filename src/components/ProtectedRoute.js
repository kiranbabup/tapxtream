import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../services/AuthProvider';

const ProtectedRoute = () => {
  const user = localStorage.getItem("user");

  if (!user) {
    // If there is no authenticated user, redirect to login page
    return <Navigate to="/" />;
  }

  return <Outlet />;  // Render nested routes here
};

export default ProtectedRoute;
