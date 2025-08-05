import { ReactNode } from "react";
import React from "react";
import { useAuth } from "@/contexts/auth";
import { Navigate } from "react-router-dom";
import ROUTES from "@/enums/routes";

type PublicRouteProps = {
  children: ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if(isLoading) {
    return null;
  }

  return !isAuthenticated ? children : <Navigate to={ROUTES.HOME} replace />;
}

export default PublicRoute;