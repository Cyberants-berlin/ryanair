// def. e. React-Komponente namens ProtectedRoute, die ihre untergeordneten Elemente (children) nur dann anzeigt, wenn ein Benutzer angemeldet ist, andernfalls leitet sie zum Login-Bildschirm um

import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
