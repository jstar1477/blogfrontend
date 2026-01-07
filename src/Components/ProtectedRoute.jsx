import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute({ isLogin, role, allowdRole }) {
  if (isLogin === false) return <Navigate to="/login" replace />; // Not logged in
  if (!role) return null; // Wait until role is loaded (prevents race on Vercel)
  if (role !== allowdRole) return <Navigate to={role === "ADMIN" ? "/admin" : "/author"} replace />;

  return <Outlet />;
}

export default ProtectedRoute;
