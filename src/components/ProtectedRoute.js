import { Navigate } from 'react-router-dom';
import { useAuth } from '../services/AuthProvider';

const ProtectedRoute = ({ children }) => {
 const user = localStorage.getItem("user");

  if (!user) {
    // If there is no authenticated user, redirect to login page
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;